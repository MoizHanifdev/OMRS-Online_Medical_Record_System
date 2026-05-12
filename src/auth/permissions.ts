import type { Role } from '@/lib/constants/roles';

// Action codes (verb_resource format)
export const PERMISSIONS = {
  // Patient
  PATIENT_VIEW_ALL: 'patient:view:all',
  PATIENT_VIEW_OWN: 'patient:view:own',
  PATIENT_VIEW_ASSIGNED: 'patient:view:assigned',
  PATIENT_CREATE: 'patient:create',
  PATIENT_UPDATE: 'patient:update',
  PATIENT_DELETE: 'patient:delete',
  PATIENT_EXPORT: 'patient:export',

  // Problem List
  PROBLEM_VIEW: 'problem:view',
  PROBLEM_CREATE: 'problem:create',
  PROBLEM_UPDATE: 'problem:update',
  PROBLEM_DELETE: 'problem:delete',
  PROBLEM_RESOLVE: 'problem:resolve',

  // Allergy
  ALLERGY_VIEW: 'allergy:view',
  ALLERGY_CREATE: 'allergy:create',
  ALLERGY_UPDATE: 'allergy:update',
  ALLERGY_VERIFY: 'allergy:verify',

  // Medication
  MEDICATION_VIEW: 'medication:view',
  MEDICATION_CREATE: 'medication:create',           // doctor only
  MEDICATION_UPDATE: 'medication:update',
  MEDICATION_DISCONTINUE: 'medication:discontinue',

  // Prescription
  PRESCRIPTION_VIEW: 'prescription:view',
  PRESCRIPTION_CREATE: 'prescription:create',       // doctor only
  PRESCRIPTION_PRINT: 'prescription:print',

  // Vitals
  VITAL_VIEW: 'vital:view',
  VITAL_CREATE: 'vital:create',
  VITAL_UPDATE: 'vital:update',

  // Lab
  LAB_ORDER_VIEW: 'lab.order:view',
  LAB_ORDER_CREATE: 'lab.order:create',             // doctor only
  LAB_RESULT_ENTER: 'lab.result:enter',             // lab tech only
  LAB_RESULT_VIEW: 'lab.result:view',

  // Radiology
  RADIOLOGY_ORDER_VIEW: 'radiology.order:view',
  RADIOLOGY_ORDER_CREATE: 'radiology.order:create',
  RADIOLOGY_IMAGE_UPLOAD: 'radiology.image:upload',
  RADIOLOGY_REPORT_WRITE: 'radiology.report:write',

  // Clinical Notes
  NOTE_VIEW: 'note:view',
  NOTE_VIEW_OWN: 'note:view:own',
  NOTE_CREATE: 'note:create',
  NOTE_SIGN: 'note:sign',
  NOTE_AMEND: 'note:amend',
  NOTE_IMPORT_EXTERNAL: 'note:import',

  // Care Plans
  CARE_PLAN_VIEW: 'careplan:view',
  CARE_PLAN_CREATE: 'careplan:create',
  CARE_PLAN_UPDATE: 'careplan:update',

  // Guidelines
  GUIDELINE_VIEW: 'guideline:view',
  GUIDELINE_MANAGE: 'guideline:manage',             // admin

  // Patient Instructions
  INSTRUCTION_VIEW: 'instruction:view',
  INSTRUCTION_CREATE: 'instruction:create',
  INSTRUCTION_ACKNOWLEDGE: 'instruction:acknowledge', // patient

  // Appointments
  APPOINTMENT_VIEW: 'appointment:view',
  APPOINTMENT_CREATE: 'appointment:create',
  APPOINTMENT_UPDATE: 'appointment:update',
  APPOINTMENT_CANCEL: 'appointment:cancel',

  // Search & Analytics
  SEARCH_ADVANCED: 'search:advanced',
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',

  // Admin
  USER_MANAGE: 'user:manage',
  AUDIT_LOG_VIEW: 'audit:view',
  SYSTEM_SETTINGS: 'system:settings',
  IMPERSONATION: 'admin:impersonate',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Permission matrix per role
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    ...Object.values(PERMISSIONS),
  ],
  DOCTOR: [
    PERMISSIONS.PATIENT_VIEW_ALL, PERMISSIONS.PATIENT_CREATE, PERMISSIONS.PATIENT_UPDATE, PERMISSIONS.PATIENT_EXPORT,
    PERMISSIONS.PROBLEM_VIEW, PERMISSIONS.PROBLEM_CREATE, PERMISSIONS.PROBLEM_UPDATE, PERMISSIONS.PROBLEM_RESOLVE,
    PERMISSIONS.ALLERGY_VIEW, PERMISSIONS.ALLERGY_CREATE, PERMISSIONS.ALLERGY_UPDATE, PERMISSIONS.ALLERGY_VERIFY,
    PERMISSIONS.MEDICATION_VIEW, PERMISSIONS.MEDICATION_CREATE, PERMISSIONS.MEDICATION_UPDATE, PERMISSIONS.MEDICATION_DISCONTINUE,
    PERMISSIONS.PRESCRIPTION_VIEW, PERMISSIONS.PRESCRIPTION_CREATE, PERMISSIONS.PRESCRIPTION_PRINT,
    PERMISSIONS.VITAL_VIEW, PERMISSIONS.VITAL_CREATE,
    PERMISSIONS.LAB_ORDER_VIEW, PERMISSIONS.LAB_ORDER_CREATE, PERMISSIONS.LAB_RESULT_VIEW,
    PERMISSIONS.RADIOLOGY_ORDER_VIEW, PERMISSIONS.RADIOLOGY_ORDER_CREATE, PERMISSIONS.RADIOLOGY_REPORT_WRITE,
    PERMISSIONS.NOTE_VIEW, PERMISSIONS.NOTE_CREATE, PERMISSIONS.NOTE_SIGN, PERMISSIONS.NOTE_AMEND, PERMISSIONS.NOTE_IMPORT_EXTERNAL,
    PERMISSIONS.CARE_PLAN_VIEW, PERMISSIONS.CARE_PLAN_CREATE, PERMISSIONS.CARE_PLAN_UPDATE,
    PERMISSIONS.GUIDELINE_VIEW,
    PERMISSIONS.INSTRUCTION_VIEW, PERMISSIONS.INSTRUCTION_CREATE,
    PERMISSIONS.APPOINTMENT_VIEW, PERMISSIONS.APPOINTMENT_CREATE, PERMISSIONS.APPOINTMENT_UPDATE, PERMISSIONS.APPOINTMENT_CANCEL,
    PERMISSIONS.SEARCH_ADVANCED, PERMISSIONS.ANALYTICS_VIEW,
  ],
  NURSE: [
    PERMISSIONS.PATIENT_VIEW_ASSIGNED, PERMISSIONS.PATIENT_UPDATE,
    PERMISSIONS.PROBLEM_VIEW,
    PERMISSIONS.ALLERGY_VIEW, PERMISSIONS.ALLERGY_CREATE,
    PERMISSIONS.MEDICATION_VIEW,
    PERMISSIONS.VITAL_VIEW, PERMISSIONS.VITAL_CREATE, PERMISSIONS.VITAL_UPDATE,
    PERMISSIONS.LAB_ORDER_VIEW, PERMISSIONS.LAB_RESULT_VIEW,
    PERMISSIONS.NOTE_VIEW, PERMISSIONS.NOTE_CREATE,
    PERMISSIONS.CARE_PLAN_VIEW, PERMISSIONS.CARE_PLAN_UPDATE,
    PERMISSIONS.GUIDELINE_VIEW,
    PERMISSIONS.INSTRUCTION_VIEW, PERMISSIONS.INSTRUCTION_CREATE,
    PERMISSIONS.APPOINTMENT_VIEW,
  ],
  RECEPTIONIST: [
    PERMISSIONS.PATIENT_VIEW_ALL, PERMISSIONS.PATIENT_CREATE, PERMISSIONS.PATIENT_UPDATE,
    PERMISSIONS.APPOINTMENT_VIEW, PERMISSIONS.APPOINTMENT_CREATE, PERMISSIONS.APPOINTMENT_UPDATE, PERMISSIONS.APPOINTMENT_CANCEL,
  ],
  LAB_TECHNICIAN: [
    PERMISSIONS.PATIENT_VIEW_ASSIGNED,
    PERMISSIONS.LAB_ORDER_VIEW, PERMISSIONS.LAB_RESULT_ENTER, PERMISSIONS.LAB_RESULT_VIEW,
    PERMISSIONS.RADIOLOGY_ORDER_VIEW, PERMISSIONS.RADIOLOGY_IMAGE_UPLOAD,
  ],
  PATIENT: [
    PERMISSIONS.PATIENT_VIEW_OWN,
    PERMISSIONS.MEDICATION_VIEW,
    PERMISSIONS.PRESCRIPTION_VIEW,
    PERMISSIONS.VITAL_VIEW,
    PERMISSIONS.LAB_RESULT_VIEW,
    PERMISSIONS.NOTE_VIEW_OWN,
    PERMISSIONS.CARE_PLAN_VIEW,
    PERMISSIONS.INSTRUCTION_VIEW, PERMISSIONS.INSTRUCTION_ACKNOWLEDGE,
    PERMISSIONS.APPOINTMENT_VIEW, PERMISSIONS.APPOINTMENT_CREATE, PERMISSIONS.APPOINTMENT_CANCEL,
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

// Resource-level permission check
export interface PermissionContext {
  userId: string;
  role: Role;
  resource?: { ownerId?: string; assignedToIds?: string[]; patientUserId?: string };
}

export function canAccessResource(ctx: PermissionContext, permission: Permission): boolean {
  if (!hasPermission(ctx.role, permission)) return false;
  
  if (permission === PERMISSIONS.PATIENT_VIEW_OWN) {
    return ctx.resource?.patientUserId === ctx.userId;
  }
  if (permission === PERMISSIONS.PATIENT_VIEW_ASSIGNED) {
    return !!ctx.resource?.assignedToIds?.includes(ctx.userId);
  }
  if (permission === PERMISSIONS.NOTE_VIEW_OWN) {
    return ctx.resource?.patientUserId === ctx.userId || ctx.resource?.ownerId === ctx.userId;
  }
  return true;
}
