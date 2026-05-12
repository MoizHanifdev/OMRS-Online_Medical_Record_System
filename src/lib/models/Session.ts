import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface ISession extends Document {
  userId: Schema.Types.ObjectId;
  refreshToken: string;
  deviceInfo?: { userAgent?: string; ip?: string; browser?: string; os?: string; deviceType?: string };
  expiresAt: Date;
  revokedAt?: Date;
  lastUsedAt?: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    refreshToken: { type: String, required: true, unique: true, index: true },
    deviceInfo: { userAgent: String, ip: String, browser: String, os: String, deviceType: String },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    revokedAt: { type: Date },
    lastUsedAt: { type: Date },
  },
  { timestamps: true }
);

export const Session = (models.Session || model<ISession>('Session', SessionSchema)) as Model<ISession>;
