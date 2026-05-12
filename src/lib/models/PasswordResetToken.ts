import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface IPasswordResetToken extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
  usedAt?: Date;
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    usedAt: { type: Date },
  },
  { timestamps: true }
);

export const PasswordResetToken = (models.PasswordResetToken || model<IPasswordResetToken>('PasswordResetToken', PasswordResetTokenSchema)) as Model<IPasswordResetToken>;
