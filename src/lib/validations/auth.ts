import { z } from 'zod';
import { validatePasswordPolicy } from '@/auth/password-policy';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
  twoFactorCode: z.string().optional(),
  captchaToken: z.string().optional(),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(10, 'Password must be at least 10 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().optional(),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']),
  captchaToken: z.string().optional(),
}).superRefine((data, ctx) => {
  const errors = validatePasswordPolicy(data.password, { email: data.email, name: `${data.firstName} ${data.lastName}` });
  errors.forEach((err) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: err,
      path: ['password'],
    });
  });
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  captchaToken: z.string().optional(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(10, 'Password must be at least 10 characters'),
}).superRefine((data, ctx) => {
  const errors = validatePasswordPolicy(data.newPassword, {});
  errors.forEach((err) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: err,
      path: ['newPassword'],
    });
  });
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(10, 'New password must be at least 10 characters'),
}).superRefine((data, ctx) => {
  const errors = validatePasswordPolicy(data.newPassword, {});
  errors.forEach((err) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: err,
      path: ['newPassword'],
    });
  });
});

export const adminInviteUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.enum(['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'LAB_TECHNICIAN']),
  phone: z.string().optional(),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
});
