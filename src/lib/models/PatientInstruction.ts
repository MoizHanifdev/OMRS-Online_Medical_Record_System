import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';

export interface IPatientInstruction extends Document {
  patientId: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  type: 'PRE_PROCEDURE' | 'POST_PROCEDURE' | 'POST_DISCHARGE' | 'MEDICATION' | 'LIFESTYLE' | 'FOLLOW_UP';
  title: string;
  content: string;
  relatedTo?: { entityType: string; entityId: Schema.Types.ObjectId };
  acknowledgedAt?: Date;
  acknowledgedBy?: Schema.Types.ObjectId;
  language?: string;
  printedAt?: Date;
}

const PatientInstructionSchema = new Schema<IPatientInstruction>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['PRE_PROCEDURE', 'POST_PROCEDURE', 'POST_DISCHARGE', 'MEDICATION', 'LIFESTYLE', 'FOLLOW_UP'], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    relatedTo: {
      entityType: String,
      entityId: Schema.Types.ObjectId,
    },
    acknowledgedAt: Date,
    acknowledgedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    language: { type: String, default: 'en' },
    printedAt: Date,
  },
  { timestamps: true }
);

PatientInstructionSchema.plugin(toJSONPlugin);
PatientInstructionSchema.plugin(softDeletePlugin);
PatientInstructionSchema.plugin(auditPlugin, { entityType: 'PatientInstruction' });

export const PatientInstruction = (models.PatientInstruction || model<IPatientInstruction>('PatientInstruction', PatientInstructionSchema)) as Model<IPatientInstruction>;
