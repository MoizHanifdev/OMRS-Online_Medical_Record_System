import { createApiPipeline } from '@/lib/api/pipeline';
import { User } from '@/lib/models/User';
import { Session } from '@/lib/models/Session';
import { PasswordResetToken } from '@/lib/models/PasswordResetToken';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/client';
import { PasswordChangedEmail } from '@/lib/email/templates/PasswordChangedEmail';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { parseDevice } from '@/auth/device';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { token, newPassword } = body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const resetDoc = await PasswordResetToken.findOne({ token: hashedToken });
    
    if (!resetDoc || resetDoc.usedAt || resetDoc.expiresAt < new Date()) {
      throw new Error('Invalid or expired token');
    }

    const user = await User.findById(resetDoc.userId);
    if (!user) throw new Error('User not found');

    user.password = newPassword; // Pre-save hook handles hashing
    await user.save();

    resetDoc.usedAt = new Date();
    await resetDoc.save();

    // Revoke all existing sessions
    await Session.deleteMany({ userId: user._id });

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const device = parseDevice(req).browser;

    await sendEmail({
      to: user.email,
      subject: 'Your password has been changed',
      react: PasswordChangedEmail({ ip, device, date: new Date().toLocaleString() }),
    });

    return { success: true };
  },
  {
    bodySchema: resetPasswordSchema,
    rateLimitId: 'reset-password',
  }
);
