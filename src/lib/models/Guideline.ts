import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';

export interface IGuideline extends Document {
  title: string;
  category?: string;
  description?: string;
  content?: any;
  version: number;
  isActive: boolean;
  createdBy: Schema.Types.ObjectId;
  previousVersionId?: Schema.Types.ObjectId;
  tags?: string[];
  references?: string[];
  lastReviewedAt?: Date;
  nextReviewDate?: Date;
}

const GuidelineSchema = new Schema<IGuideline>(
  {
    title: { type: String, required: true },
    category: String,
    description: String,
    content: Schema.Types.Mixed,
    version: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    previousVersionId: { type: Schema.Types.ObjectId, ref: 'Guideline' },
    tags: [{ type: String }],
    references: [{ type: String }],
    lastReviewedAt: Date,
    nextReviewDate: Date,
  },
  { timestamps: true }
);

GuidelineSchema.plugin(toJSONPlugin);
GuidelineSchema.plugin(softDeletePlugin);
GuidelineSchema.plugin(auditPlugin, { entityType: 'Guideline' });

export const Guideline = (models.Guideline || model<IGuideline>('Guideline', GuidelineSchema)) as Model<IGuideline>;
