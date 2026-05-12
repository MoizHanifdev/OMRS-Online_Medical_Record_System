import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import { counterPlugin } from '../db/plugins/counter';
import paginate from 'mongoose-paginate-v2';

export interface ILabTest {
  testName: string;
  testCode: string;
  category?: string;
  result?: string;
  numericResult?: number;
  unit?: string;
  referenceRange?: { low?: number; high?: number; text?: string };
  flag: 'NORMAL' | 'HIGH' | 'LOW' | 'CRITICAL_HIGH' | 'CRITICAL_LOW' | 'ABNORMAL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  performedAt?: Date;
  performedBy?: Schema.Types.ObjectId;
  notes?: string;
  attachments?: { url: string; name: string; type: string }[];
}

export interface ILabOrder extends Document {
  orderNumber?: string;
  patientId: Schema.Types.ObjectId;
  orderedBy: Schema.Types.ObjectId;
  orderedAt: Date;
  priority: 'ROUTINE' | 'URGENT' | 'STAT';
  status: 'PENDING' | 'IN_PROGRESS' | 'PARTIALLY_COMPLETED' | 'COMPLETED' | 'CANCELLED';
  clinicalIndication?: string;
  fasting?: boolean;
  specimenType?: 'BLOOD' | 'URINE' | 'STOOL' | 'SPUTUM' | 'CSF' | 'TISSUE' | 'SWAB' | 'OTHER';
  tests: ILabTest[];
  completedAt?: Date;
  verifiedBy?: Schema.Types.ObjectId;
  verifiedAt?: Date;
  attachments?: { url: string; name: string; type: string }[];
}

const LabTestSchema = new Schema<ILabTest>(
  {
    testName: { type: String, required: true },
    testCode: { type: String, required: true },
    category: String,
    result: String,
    numericResult: Number,
    unit: String,
    referenceRange: { low: Number, high: Number, text: String },
    flag: { type: String, enum: ['NORMAL', 'HIGH', 'LOW', 'CRITICAL_HIGH', 'CRITICAL_LOW', 'ABNORMAL'], default: 'NORMAL' },
    status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
    performedAt: Date,
    performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: String,
    attachments: [{ url: String, name: String, type: { type: String } }],
  },
  { _id: true }
);

const LabOrderSchema = new Schema<ILabOrder>(
  {
    orderNumber: { type: String, unique: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    orderedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderedAt: { type: Date, default: Date.now },
    priority: { type: String, enum: ['ROUTINE', 'URGENT', 'STAT'], default: 'ROUTINE', index: true },
    status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'PARTIALLY_COMPLETED', 'COMPLETED', 'CANCELLED'], default: 'PENDING', index: true },
    clinicalIndication: String,
    fasting: Boolean,
    specimenType: { type: String, enum: ['BLOOD', 'URINE', 'STOOL', 'SPUTUM', 'CSF', 'TISSUE', 'SWAB', 'OTHER'] },
    tests: { type: [LabTestSchema], required: true },
    completedAt: Date,
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: Date,
    attachments: [{ url: String, name: String, type: { type: String } }],
  },
  { timestamps: true }
);

LabOrderSchema.pre('save', function (next) {
  if (this.tests && this.tests.length > 0) {
    let completedCount = 0;
    let pendingCount = 0;

    this.tests.forEach((test) => {
      // Auto compute flag
      if (test.numericResult !== undefined && test.referenceRange) {
        if (test.referenceRange.high !== undefined && test.numericResult > test.referenceRange.high) {
          test.flag = test.numericResult > test.referenceRange.high * 1.5 ? 'CRITICAL_HIGH' : 'HIGH';
        } else if (test.referenceRange.low !== undefined && test.numericResult < test.referenceRange.low) {
          test.flag = test.numericResult < test.referenceRange.low * 0.5 ? 'CRITICAL_LOW' : 'LOW';
        } else {
          test.flag = 'NORMAL';
        }
      }

      if (test.status === 'COMPLETED') completedCount++;
      else if (test.status === 'PENDING') pendingCount++;
    });

    if (completedCount === this.tests.length) {
      this.status = 'COMPLETED';
      if (!this.completedAt) this.completedAt = new Date();
    } else if (pendingCount === this.tests.length) {
      this.status = 'PENDING';
    } else {
      this.status = 'PARTIALLY_COMPLETED';
    }
  }
  next();
});

LabOrderSchema.post('save', async function (doc) {
  const hasCritical = doc.tests.some((t) => t.flag === 'CRITICAL_HIGH' || t.flag === 'CRITICAL_LOW');
  if (hasCritical) {
    console.log(`CRITICAL LAB RESULT DETECTED FOR ORDER ${doc.orderNumber}`);
  }

  // Update LabResultHistory
  const { LabResultHistory } = await import('./LabResultHistory');
  for (const test of doc.tests) {
    if (test.status === 'COMPLETED' && test.numericResult !== undefined) {
      await LabResultHistory.findOneAndUpdate(
        { labOrderId: doc._id, testCode: test.testCode },
        {
          $setOnInsert: {
            patientId: doc.patientId,
            testName: test.testName,
            result: test.result,
            numericResult: test.numericResult,
            unit: test.unit,
            flag: test.flag,
            performedAt: test.performedAt || new Date(),
          }
        },
        { upsert: true }
      );
    }
  }
});

LabOrderSchema.plugin(toJSONPlugin);
LabOrderSchema.plugin(softDeletePlugin);
LabOrderSchema.plugin(auditPlugin, { entityType: 'LabOrder' });
LabOrderSchema.plugin(counterPlugin, { field: 'orderNumber', prefix: 'LAB' });
LabOrderSchema.plugin(paginate);

export const LabOrder = (models.LabOrder || model<ILabOrder>('LabOrder', LabOrderSchema)) as Model<ILabOrder>;
