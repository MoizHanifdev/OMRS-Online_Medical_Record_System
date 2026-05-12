import mongoose from 'mongoose';

export interface IContactSubmission extends mongoose.Document {
  name: string;
  email: string;
  organization?: string;
  role: string;
  topic: string;
  message: string;
  attachmentUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  status: 'NEW' | 'RESPONDED' | 'SPAM' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new mongoose.Schema<IContactSubmission>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String },
  role: { type: String, required: true },
  topic: { type: String, required: true },
  message: { type: String, required: true },
  attachmentUrl: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  referrer: { type: String },
  status: { type: String, enum: ['NEW', 'RESPONDED', 'SPAM', 'ARCHIVED'], default: 'NEW' },
}, { timestamps: true });

export const ContactSubmission = (mongoose.models.ContactSubmission || mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema)) as mongoose.Model<IContactSubmission>;
