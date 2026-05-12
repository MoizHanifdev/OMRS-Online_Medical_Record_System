import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.coerce.boolean().optional().default(false),
  twoFactorCode: z.string().optional(),
  captchaToken: z.string().optional(),
});

export const authConfig: NextAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'fallback_development_secret_token_for_omrs_app_demo',
  session: { strategy: 'jwt', maxAge: 60 * 15 }, // 15 min
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
    verifyRequest: '/verify-email',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' },
        twoFactorCode: { label: '2FA Code', type: 'text' },
        captchaToken: { label: 'Captcha', type: 'hidden' },
      },
      async authorize(credentials, req: any) {
        const { connectDB } = await import('@/lib/db/mongoose');
        const { User } = await import('@/lib/models/User');
        const { recordLoginAttempt, isAccountLocked } = await import('./lockout');

        await connectDB();
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) throw new Error('INVALID_CREDENTIALS');

        const { email, password, twoFactorCode } = parsed.data;
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password +twoFactorSecret');
        if (!user) throw new Error('INVALID_CREDENTIALS');

        if (await isAccountLocked(user)) throw new Error('ACCOUNT_LOCKED');

        const valid = await user.comparePassword(password);
        if (!valid) {
          await recordLoginAttempt(user, false, req);
          throw new Error('INVALID_CREDENTIALS');
        }

        if (!user.isActive) throw new Error('ACCOUNT_DISABLED');

        if (user.twoFactorEnabled) {
          if (!twoFactorCode) throw new Error('2FA_REQUIRED');
          const { verifyTotp } = await import('./totp');
          const ok = await verifyTotp(user, twoFactorCode);
          if (!ok) {
            await recordLoginAttempt(user, false, req);
            throw new Error('INVALID_2FA');
          }
        }

        await recordLoginAttempt(user, true, req);
        user.lastLoginAt = new Date();
        user.lastLoginIp = req?.headers?.get('x-forwarded-for') ?? null;
        await user.save();

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
          avatarUrl: user.avatarUrl,
          isEmailVerified: user.isEmailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
        token.avatarUrl = (user as any).avatarUrl;
        token.isEmailVerified = (user as any).isEmailVerified;
        token.iat = Math.floor(Date.now() / 1000);
        token.stepUpAt = Math.floor(Date.now() / 1000);
      }
      if (trigger === 'update' && session) {
        if (session.stepUp) token.stepUpAt = Math.floor(Date.now() / 1000);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as any;
      session.user.avatarUrl = token.avatarUrl as string | undefined;
      session.user.isEmailVerified = token.isEmailVerified as boolean;
      session.stepUpAt = token.stepUpAt as number | undefined;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
