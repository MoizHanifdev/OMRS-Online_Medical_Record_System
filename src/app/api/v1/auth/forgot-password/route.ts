import { createApiPipeline } from '@/lib/api/pipeline';
import { User } from '@/lib/models/User';
import { PasswordResetToken } from '@/lib/models/PasswordResetToken';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/client';
import { PasswordResetEmail } from '@/lib/email/templates/PasswordResetEmail';
import { forgotPasswordSchema } from '@/lib/validations/auth';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { email } = body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Return success anyway to prevent enumeration
      return { success: true };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    await PasswordResetToken.create({
      userId: user._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hr
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: 'Reset your OMRS password',
      react: PasswordResetEmail({ resetUrl }),
    });

    return { success: true };
  },
  {
    bodySchema: forgotPasswordSchema,
    rateLimitId: 'forgot-password',
  }
);
