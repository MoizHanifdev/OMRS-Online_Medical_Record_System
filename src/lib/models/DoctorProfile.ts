import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';

export interface IDoctorProfile extends Document {
  userId: Schema.Types.ObjectId;
  licenseNumber: string;
  licenseIssuingAuthority?: string;
  licenseExpiryDate?: Date;
  specialization?: 'Cardiology' | 'Neurology' | 'Pediatrics' | 'Orthopedics' | 'General Medicine' | 'Dermatology' | 'Psychiatry' | 'Radiology' | 'Pathology' | 'Surgery' | 'Gynecology' | 'Ophthalmology' | 'ENT' | 'Pulmonology' | 'Endocrinology' | 'Nephrology' | 'Oncology' | 'Other';
  subSpecialization?: string;
  qualifications: { degree?: string; institution?: string; year?: number }[];
  yearsOfExperience: number;
  department?: string;
  consultationFee: number;
  bio?: string;
  languages: string[];
  clinicAddress?: { street?: string; city?: string; state?: string; country?: string; postalCode?: string };
  workingHours: { day: string; startTime?: string; endTime?: string; isAvailable: boolean }[];
  appointmentSlotDuration: number;
  acceptingNewPatients: boolean;
  digitalSignatureUrl?: string;
  
  user?: any;
}

const DoctorProfileSchema = new Schema<IDoctorProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    licenseNumber: { type: String, required: true, unique: true },
    licenseIssuingAuthority: { type: String },
    licenseExpiryDate: { type: Date },
    specialization: { type: String, enum: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Medicine', 'Dermatology', 'Psychiatry', 'Radiology', 'Pathology', 'Surgery', 'Gynecology', 'Ophthalmology', 'ENT', 'Pulmonology', 'Endocrinology', 'Nephrology', 'Oncology', 'Other'] },
    subSpecialization: { type: String },
    qualifications: [{ degree: String, institution: String, year: Number }],
    yearsOfExperience: { type: Number, min: 0, max: 70 },
    department: { type: String },
    consultationFee: { type: Number, min: 0, default: 0 },
    bio: { type: String, maxlength: 2000 },
    languages: [{ type: String }],
    clinicAddress: { street: String, city: String, state: String, country: String, postalCode: String },
    workingHours: [{ day: String, startTime: String, endTime: String, isAvailable: Boolean }],
    appointmentSlotDuration: { type: Number, default: 30 },
    acceptingNewPatients: { type: Boolean, default: true },
    digitalSignatureUrl: { type: String },
  },
  { timestamps: true }
);

DoctorProfileSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

DoctorProfileSchema.plugin(toJSONPlugin);
DoctorProfileSchema.plugin(softDeletePlugin);
DoctorProfileSchema.plugin(auditPlugin, { entityType: 'DoctorProfile' });

export const DoctorProfile = (models.DoctorProfile || model<IDoctorProfile>('DoctorProfile', DoctorProfileSchema)) as Model<IDoctorProfile>;
