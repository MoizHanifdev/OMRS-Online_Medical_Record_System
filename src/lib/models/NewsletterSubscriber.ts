import mongoose from 'mongoose';

export interface INewsletterSubscriber extends mongoose.Document {
  email: string;
  subscribedAt: Date;
  confirmedAt?: Date;
  unsubscribedAt?: Date;
  source: 'FOOTER' | 'POPUP' | 'BLOG_POST' | 'LANDING';
  confirmToken?: string;
  unsubscribeToken?: string;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    country?: string;
  };
}

const NewsletterSubscriberSchema = new mongoose.Schema<INewsletterSubscriber>({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
  confirmedAt: { type: Date },
  unsubscribedAt: { type: Date },
  source: { type: String, enum: ['FOOTER', 'POPUP', 'BLOG_POST', 'LANDING'], required: true },
  confirmToken: { type: String },
  unsubscribeToken: { type: String },
  metadata: {
    userAgent: String,
    ipAddress: String,
    country: String,
  }
});

export const NewsletterSubscriber = (mongoose.models.NewsletterSubscriber || mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema)) as mongoose.Model<INewsletterSubscriber>;
