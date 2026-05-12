import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import paginate from 'mongoose-paginate-v2';

export interface IProblem extends Document {
  patientId: Schema.Types.ObjectId;
  icd10Code?: string;
  icd10Description?: string;
  customDescription?: string;
  status: 'ACTIVE' | 'RESOLVED' | 'CHRONIC' | 'IN_REMISSION' | 'RECURRENT';
  severity?: 'MILD' | 'MODERATE' | 'SEVERE' | 'CRITICAL';
  onsetDate: Date;
  resolvedDate?: Date;
  notes?: string;
  relatedProblems: Schema.Types.ObjectId[];
  recordedBy: Schema.Types.ObjectId;
  recordedAt: Date;
  lastUpdatedBy?: Schema.Types.ObjectId;
  attachments?: { url: string; name: string; type: string; uploadedAt: Date }[];

  displayName: string;
  durationDays: number;
}

const ProblemSchema = new Schema<IProblem>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    icd10Code: { type: String, match: /^[A-Z][0-9]{2}(\.[0-9A-Z]{1,4})?$/ },
    icd10Description: { type: String },
    customDescription: { type: String, maxlength: 500 },
    status: { type: String, enum: ['ACTIVE', 'RESOLVED', 'CHRONIC', 'IN_REMISSION', 'RECURRENT'], default: 'ACTIVE', index: true },
    severity: { type: String, enum: ['MILD', 'MODERATE', 'SEVERE', 'CRITICAL'] },
    onsetDate: { type: Date, required: true },
    resolvedDate: { type: Date },
    notes: { type: String, maxlength: 2000 },
    relatedProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recordedAt: { type: Date, default: Date.now },
    lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    attachments: [{ url: String, name: String, type: { type: String }, uploadedAt: Date }],
  },
  { timestamps: true }
);

ProblemSchema.index({ patientId: 1, status: 1 });
ProblemSchema.index({ patientId: 1, onsetDate: -1 });
ProblemSchema.index({ customDescription: 'text', icd10Description: 'text' });

ProblemSchema.virtual('displayName').get(function () {
  return this.icd10Description ?? this.customDescription;
});

ProblemSchema.virtual('durationDays').get(function () {
  const end = this.resolvedDate ?? new Date();
  return Math.floor((end.getTime() - this.onsetDate.getTime()) / (1000 * 60 * 60 * 24));
});

ProblemSchema.pre('save', function (next) {
  if (this.onsetDate > new Date()) {
    return next(new Error('Onset date cannot be in the future'));
  }
  if (this.status === 'RESOLVED' && !this.resolvedDate) {
    return next(new Error('Resolved date is required when status is RESOLVED'));
  }
  next();
});

ProblemSchema.plugin(toJSONPlugin);
ProblemSchema.plugin(softDeletePlugin);
ProblemSchema.plugin(auditPlugin, { entityType: 'Problem' });
ProblemSchema.plugin(paginate);

export const Problem = (models.Problem || model<IProblem>('Problem', ProblemSchema)) as Model<IProblem>;
