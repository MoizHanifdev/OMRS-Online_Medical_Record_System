import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface ILabResultHistory extends Document {
  patientId: Schema.Types.ObjectId;
  testCode: string;
  testName: string;
  result?: string;
  numericResult?: number;
  unit?: string;
  flag?: string;
  performedAt: Date;
  labOrderId: Schema.Types.ObjectId;
}

const LabResultHistorySchema = new Schema<ILabResultHistory>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    testCode: { type: String, required: true, index: true },
    testName: { type: String, required: true },
    result: String,
    numericResult: Number,
    unit: String,
    flag: String,
    performedAt: { type: Date, required: true, index: true },
    labOrderId: { type: Schema.Types.ObjectId, ref: 'LabOrder', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

LabResultHistorySchema.index({ patientId: 1, testCode: 1, performedAt: -1 });

export const LabResultHistory = (models.LabResultHistory || model<ILabResultHistory>('LabResultHistory', LabResultHistorySchema)) as Model<ILabResultHistory>;
