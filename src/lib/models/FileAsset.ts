import { Schema, model, models, type Document, type Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IFileAsset extends Document {
  uploaderId: Schema.Types.ObjectId;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  provider: string;
  bucket?: string;
  key: string;
  relatedEntityType?: string;
  relatedEntityId?: Schema.Types.ObjectId;
  tags?: string[];
  isPublic: boolean;
  expiresAt?: Date;
}

const FileAssetSchema = new Schema<IFileAsset>(
  {
    uploaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    originalName: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: String,
    provider: { type: String, required: true },
    bucket: String,
    key: { type: String, required: true },
    relatedEntityType: String,
    relatedEntityId: Schema.Types.ObjectId,
    tags: [{ type: String }],
    isPublic: { type: Boolean, default: false },
    expiresAt: Date,
  },
  { timestamps: true }
);

FileAssetSchema.plugin(paginate);

export const FileAsset = (models.FileAsset || model<IFileAsset>('FileAsset', FileAssetSchema)) as Model<IFileAsset>;
