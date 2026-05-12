import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { User } from '@/lib/models/User';
import { Session } from '@/lib/models/Session';
import { parseDevice } from '@/auth/device';

export const GET = createApiPipeline(
  async (req, { user }) => {
    const dbUser = await User.findById(user.id).select('+twoFactorEnabled');
    if (!dbUser) throw new Error('User not found');

    const sessionsCount = await Session.countDocuments({ userId: dbUser._id });

    return {
      user: dbUser.toPublicJSON(),
      twoFactorEnabled: dbUser.twoFactorEnabled,
      activeSessions: sessionsCount,
    };
  },
  {
    middlewares: [authMiddleware()],
  }
);
