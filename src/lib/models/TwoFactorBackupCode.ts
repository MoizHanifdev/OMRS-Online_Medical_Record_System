import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface ITwoFactorBackupCode extends Document {
  userId: Schema.Types.ObjectId;
  codeHash: string;
  usedAt?: Date;
}

const TwoFactorBackupCodeSchema = new Schema<ITwoFactorBackupCode>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    codeHash: { type: String, required: true },
    usedAt: { type: Date },
  },
  { timestamps: true }
);

export const TwoFactorBackupCode = (models.TwoFactorBackupCode || model<ITwoFactorBackupCode>('TwoFactorBackupCode', TwoFactorBackupCodeSchema)) as Model<ITwoFactorBackupCode>;
