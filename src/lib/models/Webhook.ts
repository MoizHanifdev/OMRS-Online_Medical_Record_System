import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface IWebhook extends Document {
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  createdBy: Schema.Types.ObjectId;
  lastFiredAt?: Date;
  failureCount: number;
}

const WebhookSchema = new Schema<IWebhook>(
  {
    url: { type: String, required: true },
    secret: { type: String, required: true },
    events: [{ type: String, required: true }],
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastFiredAt: Date,
    failureCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Webhook = (models.Webhook || model<IWebhook>('Webhook', WebhookSchema)) as Model<IWebhook>;
