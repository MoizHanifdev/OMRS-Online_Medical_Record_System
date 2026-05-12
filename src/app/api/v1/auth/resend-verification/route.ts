import { createApiPipeline } from '@/lib/api/pipeline';
import { User } from '@/lib/models/User';
import { EmailVerificationToken } from '@/lib/models/EmailVerificationToken';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/client';
import { VerifyEmail } from '@/lib/email/templates/VerifyEmail';
import { authMiddleware } from '@/lib/api/middleware/auth';

export const POST = createApiPipeline(
  async (req, { user }) => {
    const dbUser = await User.findById(user.id);
    if (!dbUser || dbUser.isEmailVerified) {
      return { success: true }; // Silent success
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    await EmailVerificationToken.create({
      userId: dbUser._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    await sendEmail({
      to: dbUser.email,
      subject: 'Verify your email address',
      react: VerifyEmail({ verifyUrl }),
    });

    return { success: true };
  },
  {
    middlewares: [authMiddleware()],
    rateLimitId: 'resend-verification',
  }
);
