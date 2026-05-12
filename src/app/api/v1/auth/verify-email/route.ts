import { createApiPipeline } from '@/lib/api/pipeline';
import { z } from 'zod';
import { User } from '@/lib/models/User';
import { EmailVerificationToken } from '@/lib/models/EmailVerificationToken';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/client';
import { WelcomeEmail } from '@/lib/email/templates/WelcomeEmail';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { token } = body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const verification = await EmailVerificationToken.findOne({ token: hashedToken });
    if (!verification || verification.usedAt) {
      throw new Error('Invalid or expired verification token');
    }

    if (verification.expiresAt < new Date()) {
      throw new Error('Verification token has expired');
    }

    const user = await User.findById(verification.userId);
    if (!user) throw new Error('User not found');

    verification.usedAt = new Date();
    await verification.save();

    user.isEmailVerified = true;
    user.emailVerifiedAt = new Date();
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Welcome to OMRS',
      react: WelcomeEmail({ firstName: user.name.first }),
    });

    return user.toPublicJSON();
  },
  {
    bodySchema: z.object({ token: z.string() }),
    rateLimitId: 'verify-email',
  }
);
