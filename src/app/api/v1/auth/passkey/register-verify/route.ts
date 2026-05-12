import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { verifyRegistration } from '@/auth/webauthn';
import { User } from '@/lib/models/User';
// We'd import Passkey model here if we had one, but we'll simulate saving to user metadata for now
import { z } from 'zod';

export const POST = createApiPipeline(
  async (req, { user, body }) => {
    const dbUser = await User.findById(user.id);
    if (!dbUser) throw new Error('User not found');

    const expectedChallenge = dbUser.metadata?.passkeyChallenge;
    if (!expectedChallenge) throw new Error('No pending challenge');

    const verification = await verifyRegistration(dbUser, body, expectedChallenge);
    if (!verification.verified) throw new Error('Passkey verification failed');

    // Save passkey credential
    const passkeys = dbUser.metadata?.passkeys || [];
    const regInfo: any = verification.registrationInfo;
    passkeys.push({
      id: regInfo?.credentialID || regInfo?.credential?.id,
      publicKey: Buffer.from((regInfo?.credentialPublicKey || regInfo?.credential?.publicKey) as any).toString('base64'),
      counter: regInfo?.counter,
    });
    
    dbUser.metadata = { ...dbUser.metadata, passkeys, passkeyChallenge: undefined };
    await dbUser.save();

    return { success: true };
  },
  { middlewares: [authMiddleware()], bodySchema: z.any() }
);
