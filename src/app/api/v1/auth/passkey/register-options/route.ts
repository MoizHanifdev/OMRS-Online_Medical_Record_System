import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { generateRegistrationOptionsFor } from '@/auth/webauthn';
import { User } from '@/lib/models/User';

export const POST = createApiPipeline(
  async (req, { user }) => {
    const dbUser = await User.findById(user.id);
    if (!dbUser) throw new Error('User not found');

    const options = await generateRegistrationOptionsFor(dbUser);
    
    // In a real app we need to save options.challenge in the session/DB to verify later
    dbUser.metadata = { ...dbUser.metadata, passkeyChallenge: options.challenge };
    await dbUser.save();

    return options;
  },
  { middlewares: [authMiddleware()] }
);
