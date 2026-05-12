import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLE_PERMISSIONS, type Permission } from '@/auth/permissions';

const { auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'fallback_development_secret_token_for_omrs_app_demo',
  providers: [],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
        token.avatarUrl = (user as any).avatarUrl;
        token.isEmailVerified = (user as any).isEmailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.avatarUrl = token.avatarUrl as string | undefined;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
      }
      return session;
    },
  },
});

const PUBLIC_PATHS = new Set([
  '/', '/about', '/features', '/contact', '/privacy', '/terms',
  '/login', '/signup', '/forgot-password', '/reset-password', '/verify-email', '/setup-account',
]);

const ROUTE_GUARDS: { pattern: RegExp; roles?: string[]; permissions?: Permission[] }[] = [
  { pattern: /^\/admin/, roles: ['ADMIN'] },
  { pattern: /^\/patients/, permissions: ['patient:view:all', 'patient:view:assigned', 'patient:view:own'] as Permission[] },
  { pattern: /^\/prescriptions\/new/, permissions: ['prescription:create'] as Permission[] },
  { pattern: /^\/lab/, roles: ['DOCTOR', 'LAB_TECHNICIAN', 'NURSE', 'ADMIN'] },
  { pattern: /^\/analytics/, permissions: ['analytics:view'] as Permission[] },
];

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const role = req.auth?.user?.role;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api/auth') || pathname.startsWith('/api/v1/auth')) return NextResponse.next();

  const isPublic = PUBLIC_PATHS.has(pathname) || pathname.startsWith('/api/v1/health');

  if (!isLoggedIn && !isPublic) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && ['/login', '/signup'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Staff that haven't set up 2FA → force them to /setup-2fa
  if (isLoggedIn && req.auth?.user?.role !== 'PATIENT' && !req.auth?.user?.twoFactorEnabled && pathname !== '/setup-2fa') {
    return NextResponse.redirect(new URL('/setup-2fa', req.url));
  }

  for (const guard of ROUTE_GUARDS) {
    if (guard.pattern.test(pathname)) {
      if (guard.roles && !guard.roles.includes(role)) {
        return NextResponse.redirect(new URL('/403', req.url));
      }
      if (guard.permissions && !guard.permissions.some((p: Permission) => (ROLE_PERMISSIONS as any)[role]?.includes(p))) {
        return NextResponse.redirect(new URL('/403', req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
