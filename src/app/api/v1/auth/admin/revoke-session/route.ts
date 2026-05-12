import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { requireRoles } from '@/lib/api/middleware/rbac';
import { Session } from '@/lib/models/Session';
import { z } from 'zod';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { sessionId, reason } = body;
    
    await Session.findByIdAndDelete(sessionId);

    // TODO: potentially send email to user about the revocation reason

    return { success: true };
  },
  {
    middlewares: [authMiddleware(), requireRoles('ADMIN')],
    bodySchema: z.object({ sessionId: z.string(), reason: z.string().optional() }),
  }
);
