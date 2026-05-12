import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { requireStepUp } from '@/lib/api/middleware/rbac';
import { Session } from '@/lib/models/Session';

export const POST = createApiPipeline(
  async (req, { user }) => {
    await Session.deleteMany({ userId: user.id });
    return { success: true };
  },
  {
    middlewares: [authMiddleware(), requireStepUp({ maxAgeSeconds: 300 })],
  }
);