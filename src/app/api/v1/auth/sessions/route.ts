import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { Session } from '@/lib/models/Session';

export const GET = createApiPipeline(
  async (req, { user }) => {
    const sessions = await Session.find({ userId: user.id }).sort({ lastUsedAt: -1 });
    return sessions;
  },
  {
    middlewares: [authMiddleware()],
  }
);
