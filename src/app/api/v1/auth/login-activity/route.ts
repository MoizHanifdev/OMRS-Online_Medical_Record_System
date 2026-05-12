import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { AuditLog } from '@/lib/models/AuditLog';

export const GET = createApiPipeline(
  async (req, { user }) => {
    const logs = await AuditLog.find({
      userId: user.id,
      action: { $in: ['LOGIN', 'LOGIN_FAILED'] },
    }).sort({ createdAt: -1 }).limit(50);
    
    return logs;
  },
  {
    middlewares: [authMiddleware()],
  }
);
