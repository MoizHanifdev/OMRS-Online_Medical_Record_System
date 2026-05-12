import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import { counterPlugin } from '../db/plugins/counter';

export interface IRadiologyOrder extends Document {
  orderNumber?: string;
  patientId: Schema.Types.ObjectId;
  orderedBy: Schema.Types.ObjectId;
  orderedAt: Date;
  modality: 'XRAY' | 'CT' | 'MRI' | 'ULTRASOUND' | 'MAMMOGRAM' | 'PET' | 'FLUOROSCOPY' | 'NUCLEAR_MEDICINE' | 'BONE_DENSITOMETRY' | 'OTHER';
  bodyPart: string;
  view?: string;
  contrast?: { used: boolean; agent?: string };
  clinicalIndication: string;
  priority: 'ROUTINE' | 'URGENT' | 'STAT';
  status: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'REPORTED' | 'CANCELLED';
  scheduledFor?: Date;
  performedAt?: Date;
  performedBy?: Schema.Types.ObjectId;
  findings?: string;
  impression?: string;
  recommendation?: string;
  reportedBy?: Schema.Types.ObjectId;
  reportedAt?: Date;
  signedOff: boolean;
  
  images?: any[];
}

const RadiologyOrderSchema = new Schema<IRadiologyOrder>(
  {
    orderNumber: { type: String, unique: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    orderedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderedAt: { type: Date, default: Date.now },
    modality: { type: String, enum: ['XRAY', 'CT', 'MRI', 'ULTRASOUND', 'MAMMOGRAM', 'PET', 'FLUOROSCOPY', 'NUCLEAR_MEDICINE', 'BONE_DENSITOMETRY', 'OTHER'], required: true },
    bodyPart: { type: String, required: true },
    view: String,
    contrast: { used: { type: Boolean, default: false }, agent: String },
    clinicalIndication: { type: String, required: true },
    priority: { type: String, enum: ['ROUTINE', 'URGENT', 'STAT'], default: 'ROUTINE' },
    status: { type: String, enum: ['PENDING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'REPORTED', 'CANCELLED'], default: 'PENDING' },
    scheduledFor: Date,
    performedAt: Date,
    performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    findings: String,
    impression: String,
    recommendation: String,
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reportedAt: Date,
    signedOff: { type: Boolean, default: false },
  },
  { timestamps: true }
);

RadiologyOrderSchema.virtual('images', {
  ref: 'RadiologyImage',
  localField: '_id',
  foreignField: 'radiologyOrderId',
});

RadiologyOrderSchema.plugin(toJSONPlugin);
RadiologyOrderSchema.plugin(softDeletePlugin);
RadiologyOrderSchema.plugin(auditPlugin, { entityType: 'RadiologyOrder' });
RadiologyOrderSchema.plugin(counterPlugin, { field: 'orderNumber', prefix: 'RAD' });

export const RadiologyOrder = (models.RadiologyOrder || model<IRadiologyOrder>('RadiologyOrder', RadiologyOrderSchema)) as Model<IRadiologyOrder>;
