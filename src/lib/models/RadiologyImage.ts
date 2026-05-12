import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { auditPlugin } from '../db/plugins/auditLog';

export interface IRadiologyImage extends Document {
  radiologyOrderId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: 'JPEG' | 'PNG' | 'DICOM' | 'PDF';
  fileSize?: number;
  width?: number;
  height?: number;
  dicomMetadata?: any;
  caption?: string;
  annotations?: { type: string; coordinates: number[]; note?: string; createdBy?: Schema.Types.ObjectId; createdAt: Date }[];
  uploadedBy?: Schema.Types.ObjectId;
  uploadedAt: Date;
  viewCount: number;
}

const RadiologyImageSchema = new Schema<IRadiologyImage>(
  {
    radiologyOrderId: { type: Schema.Types.ObjectId, ref: 'RadiologyOrder', required: true, index: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    fileUrl: { type: String, required: true },
    thumbnailUrl: String,
    fileType: { type: String, enum: ['JPEG', 'PNG', 'DICOM', 'PDF'], required: true },
    fileSize: Number,
    width: Number,
    height: Number,
    dicomMetadata: Schema.Types.Mixed,
    caption: String,
    annotations: [{
      type: { type: String },
      coordinates: [Number],
      note: String,
      createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
    }],
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

RadiologyImageSchema.plugin(toJSONPlugin);
RadiologyImageSchema.plugin(auditPlugin, { entityType: 'RadiologyImage' });

export const RadiologyImage = (models.RadiologyImage || model<IRadiologyImage>('RadiologyImage', RadiologyImageSchema)) as Model<IRadiologyImage>;
