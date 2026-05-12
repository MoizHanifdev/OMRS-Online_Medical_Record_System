import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import paginate from 'mongoose-paginate-v2';

export interface IMedication extends Document {
  patientId: Schema.Types.ObjectId;
  drugName: string;
  genericName?: string;
  brandName?: string;
  drugClass?: string;
  dosage: string;
  frequency: 'OD' | 'BD' | 'TID' | 'QID' | 'PRN' | 'Q4H' | 'Q6H' | 'Q8H' | 'Q12H' | 'STAT' | 'CUSTOM';
  customFrequency?: string;
  route?: 'PO' | 'IV' | 'IM' | 'SC' | 'TOPICAL' | 'INHALED' | 'SUBLINGUAL' | 'RECTAL' | 'OPHTHALMIC' | 'OTIC' | 'NASAL' | 'VAGINAL' | 'OTHER';
  startDate: Date;
  endDate?: Date;
  duration?: string;
  status: 'ACTIVE' | 'DISCONTINUED' | 'COMPLETED' | 'HOLD' | 'SCHEDULED';
  discontinuedReason?: string;
  prescribedBy?: Schema.Types.ObjectId;
  prescriptionId?: Schema.Types.ObjectId;
  indication?: string;
  instructions?: string;
  refillsAllowed: number;
  refillsRemaining?: number;
}

const MedicationSchema = new Schema<IMedication>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    drugName: { type: String, required: true },
    genericName: String,
    brandName: String,
    drugClass: String,
    dosage: { type: String, required: true },
    frequency: { type: String, enum: ['OD', 'BD', 'TID', 'QID', 'PRN', 'Q4H', 'Q6H', 'Q8H', 'Q12H', 'STAT', 'CUSTOM'], required: true },
    customFrequency: String,
    route: { type: String, enum: ['PO', 'IV', 'IM', 'SC', 'TOPICAL', 'INHALED', 'SUBLINGUAL', 'RECTAL', 'OPHTHALMIC', 'OTIC', 'NASAL', 'VAGINAL', 'OTHER'] },
    startDate: { type: Date, required: true },
    endDate: Date,
    duration: String,
    status: { type: String, enum: ['ACTIVE', 'DISCONTINUED', 'COMPLETED', 'HOLD', 'SCHEDULED'], default: 'ACTIVE', index: true },
    discontinuedReason: String,
    prescribedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    prescriptionId: { type: Schema.Types.ObjectId, ref: 'Prescription' },
    indication: String,
    instructions: { type: String, maxlength: 1000 },
    refillsAllowed: { type: Number, default: 0 },
    refillsRemaining: Number,
  },
  { timestamps: true }
);

MedicationSchema.pre('save', function (next) {
  if (this.status === 'DISCONTINUED' && !this.discontinuedReason) {
    return next(new Error('discontinuedReason required when status is DISCONTINUED'));
  }
  if (this.status !== 'ACTIVE' && !this.endDate && this.status !== 'SCHEDULED') {
    return next(new Error('endDate required when status is not ACTIVE'));
  }
  next();
});

MedicationSchema.plugin(toJSONPlugin);
MedicationSchema.plugin(softDeletePlugin);
MedicationSchema.plugin(auditPlugin, { entityType: 'Medication' });
MedicationSchema.plugin(paginate);

export const Medication = (models.Medication || model<IMedication>('Medication', MedicationSchema)) as Model<IMedication>;
