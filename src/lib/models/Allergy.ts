import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';

export interface IAllergy extends Document {
  patientId: Schema.Types.ObjectId;
  allergen: string;
  allergenType?: 'DRUG' | 'FOOD' | 'ENVIRONMENTAL' | 'INSECT' | 'LATEX' | 'OTHER';
  reaction: string[];
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'LIFE_THREATENING';
  onsetDate?: Date;
  notes?: string;
  recordedBy?: Schema.Types.ObjectId;
  verified: boolean;
  verifiedBy?: Schema.Types.ObjectId;
  verifiedAt?: Date;
}

const AllergySchema = new Schema<IAllergy>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    allergen: { type: String, required: true },
    allergenType: { type: String, enum: ['DRUG', 'FOOD', 'ENVIRONMENTAL', 'INSECT', 'LATEX', 'OTHER'] },
    reaction: [{ type: String }],
    severity: { type: String, enum: ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING'], required: true },
    onsetDate: { type: Date },
    notes: { type: String },
    recordedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

AllergySchema.statics.hasLifeThreateningAllergy = async function (patientId: string) {
  const count = await this.countDocuments({ patientId, severity: 'LIFE_THREATENING' });
  return count > 0;
};

AllergySchema.statics.checkDrugAllergy = async function (patientId: string, drugName: string) {
  return this.find({ patientId, allergenType: 'DRUG', allergen: new RegExp(drugName, 'i') });
};

AllergySchema.plugin(toJSONPlugin);
AllergySchema.plugin(softDeletePlugin);
AllergySchema.plugin(auditPlugin, { entityType: 'Allergy' });

export const Allergy = (models.Allergy || model<IAllergy>('Allergy', AllergySchema)) as Model<IAllergy>;
