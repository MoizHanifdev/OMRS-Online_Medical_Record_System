import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';

export interface ISurgicalHistory extends Document {
  patientId: Schema.Types.ObjectId;
  procedureName: string;
  cptCode?: string;
  procedureDate?: Date;
  surgeon?: string;
  hospital?: string;
  anesthesiaType?: string;
  complications?: string;
  outcome?: string;
  notes?: string;
  attachments?: { url: string; name: string }[];
}

const SurgicalHistorySchema = new Schema<ISurgicalHistory>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    procedureName: { type: String, required: true },
    cptCode: String,
    procedureDate: Date,
    surgeon: String,
    hospital: String,
    anesthesiaType: String,
    complications: String,
    outcome: String,
    notes: String,
    attachments: [{ url: String, name: String }],
  },
  { timestamps: true }
);

SurgicalHistorySchema.plugin(toJSONPlugin);
SurgicalHistorySchema.plugin(softDeletePlugin);
SurgicalHistorySchema.plugin(auditPlugin, { entityType: 'SurgicalHistory' });

export const SurgicalHistory = (models.SurgicalHistory || model<ISurgicalHistory>('SurgicalHistory', SurgicalHistorySchema)) as Model<ISurgicalHistory>;
