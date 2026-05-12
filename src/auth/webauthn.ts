import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import type { RegistrationResponseJSON, AuthenticationResponseJSON } from '@simplewebauthn/server';

const rpName = 'OMRS';
const rpID = process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname : 'localhost';
const origin = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:3000`;

export async function generateRegistrationOptionsFor(user: any) {
  return generateRegistrationOptions({
    rpName,
    rpID,
    userID: user._id.toString(),
    userName: user.email,
    userDisplayName: user.fullName,
    attestationType: 'none',
    excludeCredentials: [], // Pass existing passkeys here if any
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
  });
}

export async function verifyRegistration(user: any, response: RegistrationResponseJSON, expectedChallenge: string) {
  return verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });
}

export async function generateAuthOptions(user?: any) {
  return generateAuthenticationOptions({
    rpID,
    allowCredentials: [], // Pass existing passkeys if user known
    userVerification: 'preferred',
  });
}

export async function verifyAuthentication(user: any, response: AuthenticationResponseJSON, expectedChallenge: string, credentialPublicKey: Uint8Array, credentialCounter: number) {
  const opts: any = {
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    authenticator: {
      credentialID: response.id,
      credentialPublicKey,
      counter: credentialCounter,
    },
    credential: {
      id: response.id,
      publicKey: credentialPublicKey,
      counter: credentialCounter,
    },
  };
  return verifyAuthenticationResponse(opts);
}
