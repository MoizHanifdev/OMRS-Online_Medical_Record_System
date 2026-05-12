const otplib = require('otplib');
const qrcode = require('qrcode');
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const authenticator = otplib.authenticator || (otplib as any);

authenticator.options = { window: 1 };

export function generateSecret() {
  return authenticator.generateSecret();
}

export function generateOtpUrl(email: string, secret: string) {
  return authenticator.keyuri(email, 'OMRS', secret);
}

export async function generateQrCode(otpUrl: string): Promise<string> {
  return qrcode.toDataURL(otpUrl);
}

export async function verifyTotp(user: any, code: string): Promise<boolean> {
  if (!user.twoFactorSecret) return false;
  try {
    // Attempt to verify against the stored secret
    // Depending on how encryptedFieldsPlugin works, twoFactorSecret might be an object
    // with { iv, tag, data } if not decrypted, but schema.methods.getDecrypted / getter should handle it.
    let secret = user.twoFactorSecret;
    if (typeof secret === 'object' && secret.data) {
      // In case we are accessing the raw document
      // We should use user.getDecrypted('twoFactorSecret') if it exists
      if (typeof user.getDecrypted === 'function') {
        secret = user.getDecrypted('twoFactorSecret');
      }
    }
    return authenticator.verify({ token: code, secret });
  } catch (err) {
    return false;
  }
}

export async function generateBackupCodes(n: number = 10) {
  const codes = [];
  const hashedCodes = [];
  for (let i = 0; i < n; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 chars
    codes.push(code);
    hashedCodes.push(await bcrypt.hash(code, 10));
  }
  return { plainCodes: codes, hashedCodes };
}
