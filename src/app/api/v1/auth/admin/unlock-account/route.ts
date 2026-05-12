import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { requireRoles } from '@/lib/api/middleware/rbac';
import { User } from '@/lib/models/User';
import { z } from 'zod';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { userId } = body;
    const dbUser = await User.findById(userId);
    if (!dbUser) throw new Error('User not found');

    dbUser.lockedUntil = undefined;
    dbUser.failedLoginAttempts = 0;
    await dbUser.save();

    return { success: true };
  },
  {
    middlewares: [authMiddleware(), requireRoles('ADMIN')],
    bodySchema: z.object({ userId: z.string() }),
  }
);
