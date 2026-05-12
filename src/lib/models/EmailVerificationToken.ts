import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface IEmailVerificationToken extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
  usedAt?: Date;
}

const EmailVerificationTokenSchema = new Schema<IEmailVerificationToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    usedAt: { type: Date },
  },
  { timestamps: true }
);

export const EmailVerificationToken = (models.EmailVerificationToken || model<IEmailVerificationToken>('EmailVerificationToken', EmailVerificationTokenSchema)) as Model<IEmailVerificationToken>;
