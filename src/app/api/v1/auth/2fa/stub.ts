import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { User } from '@/lib/models/User';
import { generateSecret, generateOtpUrl, generateQrCode, verifyTotp, generateBackupCodes } from '@/auth/totp';
import { sendEmail } from '@/lib/email/client';
import { TwoFAEnabledEmail } from '@/lib/email/templates/TwoFAEnabledEmail';

export const setupPOST = createApiPipeline(
  async (req, { user, body }) => {
    const { password } = body;
    const dbUser = await User.findById(user.id).select('+password');
    if (!dbUser) throw new Error('User not found');
    
    const valid = await dbUser.comparePassword(password);
    if (!valid) throw new Error('Invalid password');

    const secret = generateSecret();
    dbUser.twoFactorSecret = secret; // Will be encrypted by plugin before save
    await dbUser.save();

    const otpUrl = generateOtpUrl(dbUser.email, secret);
    const qrCodeDataUrl = await generateQrCode(otpUrl);

    return { secret, qrCodeDataUrl, manualEntryKey: secret };
  },
  { middlewares: [authMiddleware()] }
);

export const verifyPOST = createApiPipeline(
  async (req, { user, body }) => {
    const { code } = body;
    const dbUser = await User.findById(user.id).select('+twoFactorSecret');
    if (!dbUser) throw new Error('User not found');

    const ok = await verifyTotp(dbUser, code);
    if (!ok) throw new Error('Invalid code');

    dbUser.twoFactorEnabled = true;
    const { plainCodes, hashedCodes } = await generateBackupCodes(10);
    // You would store hashedCodes in dbUser.backupCodes here if you added it to schema
    // Assuming we added it to metadata for now:
    dbUser.metadata = { ...dbUser.metadata, backupCodes: hashedCodes };
    await dbUser.save();

    await sendEmail({
      to: dbUser.email,
      subject: 'Two-factor authentication enabled',
      react: TwoFAEnabledEmail(),
    });

    return { backupCodes: plainCodes };
  },
  { middlewares: [authMiddleware()] }
);
