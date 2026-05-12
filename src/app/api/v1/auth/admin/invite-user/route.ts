import { createApiPipeline } from '@/lib/api/pipeline';
import { authMiddleware } from '@/lib/api/middleware/auth';
import { requireRoles } from '@/lib/api/middleware/rbac';
import { adminInviteUserSchema } from '@/lib/validations/auth';
import { User } from '@/lib/models/User';
import { DoctorProfile } from '@/lib/models/DoctorProfile';
import { PasswordResetToken } from '@/lib/models/PasswordResetToken';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/client';
import { StaffInvitationEmail } from '@/lib/email/templates/StaffInvitationEmail';
import mongoose from 'mongoose';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { email, firstName, lastName, role, phone, specialization, licenseNumber } = body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const session = await mongoose.startSession();
    let newUser;
    try {
      session.startTransaction();

      newUser = new User({
        email,
        password: crypto.randomBytes(32).toString('hex'), // Dummy password
        name: { first: firstName, last: lastName },
        role,
        phone,
        isActive: true,
        mustChangePassword: true,
      });
      await newUser.save({ session });

      if (role === 'DOCTOR') {
        const docProfile = new DoctorProfile({
          userId: newUser._id,
          specialization: specialization || 'General Practice',
          licenseNumber,
          department: 'General',
        });
        await docProfile.save({ session });
      }

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    await PasswordResetToken.create({
      userId: newUser._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hrs
    });

    const setupUrl = `${process.env.NEXT_PUBLIC_APP_URL}/setup-account?token=${token}`;
    await sendEmail({
      to: newUser.email,
      subject: "You're invited to join OMRS",
      react: StaffInvitationEmail({ name: newUser.name.first, role, setupUrl }),
    });

    return newUser.toPublicJSON();
  },
  {
    middlewares: [authMiddleware(), requireRoles('ADMIN')],
    bodySchema: adminInviteUserSchema,
  }
);
