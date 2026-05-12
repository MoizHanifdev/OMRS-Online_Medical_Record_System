import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import { encryptedFieldsPlugin } from '../db/plugins/encryptedFields';
import { counterPlugin } from '../db/plugins/counter';
import paginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface IPatientProfile extends Document {
  userId: Schema.Types.ObjectId;
  mrn?: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-' | 'UNKNOWN';
  maritalStatus?: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | 'OTHER';
  occupation?: string;
  nationalId?: string | any;
  address?: {
    street?: string; city?: string; state?: string; country?: string; postalCode?: string;
    coordinates?: { type: string; coordinates: number[] };
  };
  emergencyContact?: { name: string; relationship?: string; phone: string; email?: string; address?: string };
  insurance?: { provider?: string; policyNumber?: string | any; groupNumber?: string; coverageType?: string; policyHolder?: string; validUntil?: Date };
  physicalAttributes?: { height?: number; weight?: number; bmi?: number };
  preferredLanguage?: string;
  consentForms?: { type: string; signedAt?: Date; fileUrl?: string }[];
  tags?: string[];
  notes?: string;
  registeredBy?: Schema.Types.ObjectId;
  lastVisitAt?: Date;
  nextAppointmentAt?: Date;
  
  age: number;
  ageInMonths: number;
  fullProfile?: any;
}

const PatientProfileSchema = new Schema<IPatientProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    mrn: { type: String, unique: true, index: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'], required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'UNKNOWN'] },
    maritalStatus: { type: String, enum: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER'] },
    occupation: { type: String },
    nationalId: { type: Schema.Types.Mixed },
    address: {
      street: String, city: String, state: String, country: String, postalCode: String,
      coordinates: {
        type: { type: String, enum: ['Point'] },
        coordinates: { type: [Number] },
      },
    },
    emergencyContact: {
      name: { type: String },
      relationship: String,
      phone: { type: String },
      email: String,
      address: String,
    },
    insurance: {
      provider: String,
      policyNumber: Schema.Types.Mixed,
      groupNumber: String,
      coverageType: String,
      policyHolder: String,
      validUntil: Date,
    },
    physicalAttributes: { height: Number, weight: Number, bmi: Number },
    preferredLanguage: { type: String, default: 'English' },
    consentForms: [{ type: String, signedAt: Date, fileUrl: String }],
    tags: [{ type: String, index: true }],
    notes: { type: String },
    registeredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastVisitAt: { type: Date, index: -1 },
    nextAppointmentAt: { type: Date },
  },
  { timestamps: true }
);

// 2dsphere index removed — not needed during onboarding, causes failures when coordinates are empty

PatientProfileSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return 0;
  const diff = Date.now() - this.dateOfBirth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

PatientProfileSchema.virtual('ageInMonths').get(function () {
  if (!this.dateOfBirth) return 0;
  const now = new Date();
  return (now.getFullYear() - this.dateOfBirth.getFullYear()) * 12 + now.getMonth() - this.dateOfBirth.getMonth();
});

PatientProfileSchema.virtual('fullProfile', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

PatientProfileSchema.pre('save', function (next) {
  if (this.physicalAttributes?.height && this.physicalAttributes?.weight) {
    const heightInMeters = this.physicalAttributes.height / 100;
    this.physicalAttributes.bmi = parseFloat((this.physicalAttributes.weight / (heightInMeters * heightInMeters)).toFixed(2));
  }
  if (this.dateOfBirth > new Date()) {
    return next(new Error('Date of birth cannot be in the future'));
  }
  next();
});

PatientProfileSchema.plugin(toJSONPlugin);
PatientProfileSchema.plugin(softDeletePlugin);
PatientProfileSchema.plugin(auditPlugin, { entityType: 'Patient', trackReads: true });
PatientProfileSchema.plugin(encryptedFieldsPlugin, { fields: ['nationalId', 'insurance.policyNumber'] });
PatientProfileSchema.plugin(counterPlugin, { field: 'mrn', prefix: 'OMRS', padding: 6, resetYearly: true });
PatientProfileSchema.plugin(paginate);
PatientProfileSchema.plugin(aggregatePaginate);

export const PatientProfile = (models.PatientProfile || model<IPatientProfile>('PatientProfile', PatientProfileSchema)) as Model<IPatientProfile>;
