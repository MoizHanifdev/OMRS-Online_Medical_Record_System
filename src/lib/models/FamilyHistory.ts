import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';

export interface IFamilyHistory extends Document {
  patientId: Schema.Types.ObjectId;
  relation: 'MOTHER' | 'FATHER' | 'SIBLING' | 'GRANDPARENT_MATERNAL' | 'GRANDPARENT_PATERNAL' | 'CHILD' | 'AUNT' | 'UNCLE' | 'COUSIN' | 'OTHER';
  condition: string;
  icd10Code?: string;
  ageOfOnset?: number;
  deceased: boolean;
  causeOfDeath?: string;
  ageAtDeath?: number;
  notes?: string;
}

const FamilyHistorySchema = new Schema<IFamilyHistory>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    relation: { type: String, enum: ['MOTHER', 'FATHER', 'SIBLING', 'GRANDPARENT_MATERNAL', 'GRANDPARENT_PATERNAL', 'CHILD', 'AUNT', 'UNCLE', 'COUSIN', 'OTHER'], required: true },
    condition: { type: String, required: true },
    icd10Code: String,
    ageOfOnset: Number,
    deceased: { type: Boolean, default: false },
    causeOfDeath: String,
    ageAtDeath: Number,
    notes: String,
  },
  { timestamps: true }
);

FamilyHistorySchema.plugin(toJSONPlugin);
FamilyHistorySchema.plugin(softDeletePlugin);
FamilyHistorySchema.plugin(auditPlugin, { entityType: 'FamilyHistory' });

export const FamilyHistory = (models.FamilyHistory || model<IFamilyHistory>('FamilyHistory', FamilyHistorySchema)) as Model<IFamilyHistory>;
