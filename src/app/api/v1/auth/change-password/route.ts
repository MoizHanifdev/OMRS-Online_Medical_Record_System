import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { requireStepUp } from '@/lib/api/middleware/rbac';
import { User } from '@/lib/models/User';
import { Session } from '@/lib/models/Session';
import { changePasswordSchema } from '@/lib/validations/auth';
import { sendEmail } from '@/lib/email/client';
import { PasswordChangedEmail } from '@/lib/email/templates/PasswordChangedEmail';
import { parseDevice } from '@/auth/device';

export const POST = createApiPipeline(
  async (req, { user, body }) => {
    const { currentPassword, newPassword } = body;

    const dbUser = await User.findById(user.id).select('+password');
    if (!dbUser) throw new Error('User not found');

    const valid = await dbUser.comparePassword(currentPassword);
    if (!valid) throw new Error('Incorrect current password');

    dbUser.password = newPassword;
    await dbUser.save();

    // Invalidate other sessions, but we're stateless JWT so we just invalidate refresh tokens
    // Except current one - if we had session ID in JWT. 
    await Session.deleteMany({ userId: dbUser._id });

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const device = parseDevice(req).browser;

    await sendEmail({
      to: dbUser.email,
      subject: 'Your password has been changed',
      react: PasswordChangedEmail({ ip, device, date: new Date().toLocaleString() }),
    });

    return { success: true };
  },
  {
    middlewares: [authMiddleware(), requireStepUp({ maxAgeSeconds: 300 })],
    bodySchema: changePasswordSchema,
  }
);
