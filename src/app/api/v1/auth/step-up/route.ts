import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { User } from '@/lib/models/User';

export const POST = createApiPipeline(
  async (req, { user, body }) => {
    const { password } = body;
    
    const dbUser = await User.findById(user.id).select('+password');
    if (!dbUser) throw new Error('User not found');

    // If 2FA enabled, we could also allow 2FA code here. But let's stick to password.
    const valid = await dbUser.comparePassword(password);
    if (!valid) throw new Error('Invalid password');

    // In a real app we'd update a JWT token cookie or session record
    // Since we're using NextAuth, we might need a custom approach or trigger session update on client
    // For now we just return success.
    return { success: true };
  },
  {
    middlewares: [authMiddleware()],
  }
);
