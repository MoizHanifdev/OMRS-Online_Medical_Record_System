import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface IApiKey extends Document {
  name: string;
  key: string;
  scopes: string[];
  createdBy: Schema.Types.ObjectId;
  lastUsedAt?: Date;
  expiresAt?: Date;
  isActive: boolean;
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    name: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    scopes: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastUsedAt: Date,
    expiresAt: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ApiKey = (models.ApiKey || model<IApiKey>('ApiKey', ApiKeySchema)) as Model<IApiKey>;
