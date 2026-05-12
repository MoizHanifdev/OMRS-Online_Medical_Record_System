import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { Session } from '@/lib/models/Session';

export const DELETE = createApiPipeline(
  async (req, { user, params }) => {
    const { id } = params;
    
    // allow admins to revoke any session
    if (user.role === 'ADMIN') {
      await Session.findByIdAndDelete(id);
      return { success: true };
    }

    await Session.findOneAndDelete({ _id: id, userId: user.id });
    return { success: true };
  },
  {
    middlewares: [authMiddleware()],
  }
);
