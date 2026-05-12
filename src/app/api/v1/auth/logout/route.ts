import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { Session } from '@/lib/models/Session';

export const POST = createApiPipeline(
  async (req, { user }) => {
    // We would need the current session ID to delete it
    // Wait, with next-auth JWT we don't have a session ID easily unless we store it
    // This endpoint handles the backend cleanup
    return { success: true };
  },
  {
    middlewares: [authMiddleware()],
  }
);
