import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { User } from '@/lib/models/User';

export const GET = createApiPipeline(
  async (req, { user }) => {
    const dbUser = await User.findById(user.id);
    if (!dbUser) throw new Error('User not found');

    const passkeys = dbUser.metadata?.passkeys || [];
    return passkeys;
  },
  { middlewares: [authMiddleware()] }
);
