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
    
    // Always log for dev convenience
    console.log(`\n\n=============================================================`);
    console.log(`✉️ Password reset link for ${user.email}:`);
    console.log(`${resetUrl}`);
    console.log(`=============================================================\n\n`);

    const emailResult = await sendEmail({
      to: user.email,
      subject: 'Reset your OMRS password',
      react: PasswordResetEmail({ resetUrl }),
    });

    return { 
      success: true,
      emailSent: emailResult.success,
      warning: !emailResult.success ? 'Email delivery failed. Check terminal for the link.' : undefined
    };
  },
  {
    bodySchema: forgotPasswordSchema,
    rateLimitId: 'forgot-password',
  }
);
