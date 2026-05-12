export const ROLES = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  RECEPTIONIST: 'RECEPTIONIST',
  LAB_TECHNICIAN: 'LAB_TECHNICIAN',
  PATIENT: 'PATIENT',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
