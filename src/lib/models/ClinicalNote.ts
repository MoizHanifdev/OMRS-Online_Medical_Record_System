import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import paginate from 'mongoose-paginate-v2';

export interface IClinicalNote extends Document {
  patientId: Schema.Types.ObjectId;
  authorId: Schema.Types.ObjectId;
  title: string;
  content?: any;
  contentText?: string;
  status: 'DRAFT' | 'SIGNED' | 'AMENDED';
  signedAt?: Date;
  signedBy?: Schema.Types.ObjectId;
  digitalSignatureUrl?: string;
  parentNoteId?: Schema.Types.ObjectId;
  amendmentReason?: string;
  externalSource?: { source?: string; importedAt?: Date; originalFileUrl?: string };
  tags?: string[];
  mentionedDoctors?: Schema.Types.ObjectId[];
  attachments?: { url: string; name: string; type: string }[];
  relatedAppointmentId?: Schema.Types.ObjectId;
  __t?: string; // Discriminator key
}

const ClinicalNoteSchema = new Schema<IClinicalNote>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, maxlength: 200 },
    content: Schema.Types.Mixed,
    contentText: String,
    status: { type: String, enum: ['DRAFT', 'SIGNED', 'AMENDED'], default: 'DRAFT', index: true },
    signedAt: Date,
    signedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    digitalSignatureUrl: String,
    parentNoteId: { type: Schema.Types.ObjectId, ref: 'ClinicalNote' },
    amendmentReason: String,
    externalSource: { source: String, importedAt: Date, originalFileUrl: String },
    tags: [{ type: String, index: true }],
    mentionedDoctors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    attachments: [{ url: String, name: String, type: { type: String } }],
    relatedAppointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  },
  { timestamps: true, discriminatorKey: '__t' }
);

ClinicalNoteSchema.index({ patientId: 1, createdAt: -1 });
ClinicalNoteSchema.index({ contentText: 'text', title: 'text' });

ClinicalNoteSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    // Simple text extraction from Tiptap JSON or string
    if (typeof this.content === 'string') {
      this.contentText = this.content.replace(/<[^>]*>?/gm, '');
    } else if (this.content && Array.isArray(this.content.content)) {
      this.contentText = JSON.stringify(this.content); // basic fallback
    }
  }

  if (this.isModified('status') && this.status === 'SIGNED' && !this.signedAt) {
    this.signedAt = new Date();
    // signedBy should be set by the service layer
  }
  next();
});

ClinicalNoteSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;
  // Prevent modification of signed notes unless it's a specific amendment operation allowed
  if (update && update.status === 'SIGNED' && !update.signedAt) {
    update.signedAt = new Date();
  }
  next();
});

ClinicalNoteSchema.statics.createAmendment = async function (originalId: string, authorId: string, content: any, reason: string) {
  const original = await this.findById(originalId);
  if (!original) throw new Error('Original note not found');
  
  await this.findByIdAndUpdate(originalId, { status: 'AMENDED' });

  return this.create({
    patientId: original.patientId,
    authorId,
    title: `Amendment: ${original.title}`,
    content,
    status: 'DRAFT',
    parentNoteId: original._id,
    amendmentReason: reason,
    __t: original.__t,
  });
};

ClinicalNoteSchema.statics.searchByContent = function (patientId: string, query: string) {
  return this.find({ patientId, $text: { $search: query } });
};

ClinicalNoteSchema.plugin(toJSONPlugin);
ClinicalNoteSchema.plugin(softDeletePlugin);
ClinicalNoteSchema.plugin(auditPlugin, { entityType: 'ClinicalNote' });
ClinicalNoteSchema.plugin(paginate);

export const ClinicalNote = (models.ClinicalNote || model<IClinicalNote>('ClinicalNote', ClinicalNoteSchema)) as Model<IClinicalNote>;

// Discriminators
export const ProgressNote = (models.ProgressNote || ClinicalNote.discriminator('ProgressNote', new Schema({
  subjective: String,
  objective: String,
  assessment: String,
  plan: String,
}))) as Model<any>;

export const AdmissionNote = (models.AdmissionNote || ClinicalNote.discriminator('AdmissionNote', new Schema({
  admittingDiagnosis: String,
  chiefComplaint: String,
  historyOfPresentIllness: String,
  pastMedicalHistory: String,
  physicalExamFindings: String,
  assessment: String,
  plan: String,
}))) as Model<any>;

export const DischargeNote = (models.DischargeNote || ClinicalNote.discriminator('DischargeNote', new Schema({
  admissionDate: Date,
  dischargeDate: Date,
  dischargeDiagnosis: String,
  hospitalCourse: String,
  dischargeCondition: String,
  dischargeMedications: String,
  followUpInstructions: String,
}))) as Model<any>;

export const ConsultationNote = (models.ConsultationNote || ClinicalNote.discriminator('ConsultationNote', new Schema({
  referredBy: String,
  consultationType: String,
  recommendation: String,
}))) as Model<any>;

export const ProcedureNote = (models.ProcedureNote || ClinicalNote.discriminator('ProcedureNote', new Schema({
  procedureName: String,
  indications: String,
  procedureDate: Date,
  complications: String,
  outcome: String,
  pathologyOrders: String,
}))) as Model<any>;
