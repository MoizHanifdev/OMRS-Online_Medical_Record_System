import { createApiPipeline } from '@/lib/api/pipeline';
import { generateAuthOptions } from '@/auth/webauthn';
import { User } from '@/lib/models/User';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { email } = body;
    let user;
    if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    const options = await generateAuthOptions(user);
    
    if (user) {
      user.metadata = { ...user.metadata, passkeyChallenge: options.challenge };
      await user.save();
    }
    // Alternatively store challenge in a generic cache/redis if user is unknown

    return options;
  }
);
