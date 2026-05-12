import { createApiPipeline } from '@/lib/api/pipeline';
import { signupSchema } from '@/lib/validations/auth';
import { User } from '@/lib/models/User';
import { PatientProfile } from '@/lib/models/PatientProfile';
import { EmailVerificationToken } from '@/lib/models/EmailVerificationToken';
import { isPasswordBreached } from '@/auth/passwords';
import { sendEmail } from '@/lib/email/client';
import { VerifyEmail } from '@/lib/email/templates/VerifyEmail';
import crypto from 'crypto';
import mongoose from 'mongoose';

export const POST = createApiPipeline(
  async (req, { body }) => {
    const { email, password, firstName, lastName, phone, dateOfBirth, gender, captchaToken } = body;

    // Optional CAPTCHA check here...

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const breached = await isPasswordBreached(password);
    if (breached) {
      throw new Error('This password has been exposed in a data breach. Please choose another.');
    }

    // Sequential saves (Transactions disabled for local standalone MongoDB compatibility)
    let newUser;
    try {
      newUser = new User({
        email,
        password,
        name: { first: firstName, last: lastName },
        phone,
        role: 'PATIENT',
        isActive: true,
      });
      await newUser.save();

      const patientProfile = new PatientProfile({
        userId: newUser._id,
        dateOfBirth: new Date(dateOfBirth),
        gender,
      });
      await patientProfile.save();
    } catch (err) {
      // Manual rollback if profile creation fails
      if (newUser && newUser._id) {
        await User.deleteOne({ _id: newUser._id }).catch(console.error);
      }
      throw err;
    }

    // Verification token
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    await EmailVerificationToken.create({
      userId: newUser._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    
    // In local development, if no Resend API key is provided, print the link to the terminal
    if (!process.env.RESEND_API_KEY) {
      console.log(`\n\n=============================================================`);
      console.log(`✉️ [DEV MODE] Email verification link for ${newUser.email}:`);
      console.log(`${verifyUrl}`);
      console.log(`=============================================================\n\n`);
    }

    await sendEmail({
      to: newUser.email,
      subject: 'Verify your email address',
      react: VerifyEmail({ verifyUrl }),
    });

    return {
      user: newUser.toPublicJSON(),
      requiresEmailVerification: true,
    };
  },
  {
    bodySchema: signupSchema,
    rateLimitId: 'signup',
  }
);
