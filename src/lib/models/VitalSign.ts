import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { auditPlugin } from '../db/plugins/auditLog';

export interface IVitalSign extends Document {
  patientId: Schema.Types.ObjectId;
  recordedAt: Date;
  recordedBy: Schema.Types.ObjectId;
  vitals: {
    systolicBP?: number;
    diastolicBP?: number;
    heartRate?: number;
    respiratoryRate?: number;
    temperature?: { value: number; site: 'ORAL' | 'AXILLARY' | 'RECTAL' | 'TYMPANIC' | 'TEMPORAL' };
    oxygenSaturation?: number;
    weight?: number;
    height?: number;
    bmi?: number;
    bloodGlucose?: { value: number; fasting: boolean };
    painScore?: number;
    headCircumference?: number;
  };
  position?: 'SITTING' | 'STANDING' | 'LYING';
  notes?: string;
  abnormalFlags: string[];
}

const VitalSignSchema = new Schema<IVitalSign>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true },
    recordedAt: { type: Date, required: true },
    recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vitals: {
      systolicBP: { type: Number, min: 50, max: 250 },
      diastolicBP: { type: Number, min: 30, max: 150 },
      heartRate: { type: Number, min: 30, max: 250 },
      respiratoryRate: { type: Number, min: 5, max: 60 },
      temperature: {
        value: { type: Number, min: 30, max: 45 },
        site: { type: String, enum: ['ORAL', 'AXILLARY', 'RECTAL', 'TYMPANIC', 'TEMPORAL'] },
      },
      oxygenSaturation: { type: Number, min: 50, max: 100 },
      weight: { type: Number, min: 0.5, max: 500 },
      height: { type: Number, min: 30, max: 250 },
      bmi: { type: Number },
      bloodGlucose: { value: Number, fasting: Boolean },
      painScore: { type: Number, min: 0, max: 10 },
      headCircumference: { type: Number },
    },
    position: { type: String, enum: ['SITTING', 'STANDING', 'LYING'] },
    notes: String,
    abnormalFlags: [{ type: String }],
  },
  { 
    timeseries: { timeField: 'recordedAt', metaField: 'patientId', granularity: 'hours' },
    expireAfterSeconds: undefined // never expire
  }
);

VitalSignSchema.pre('save', function (next) {
  const flags: string[] = [];
  const v = this.vitals;

  if (v.height && v.weight) {
    v.bmi = parseFloat((v.weight / Math.pow(v.height / 100, 2)).toFixed(2));
  }

  if (v.systolicBP && (v.systolicBP < 90 || v.systolicBP > 140)) flags.push('BP_SYSTOLIC');
  if (v.diastolicBP && (v.diastolicBP < 60 || v.diastolicBP > 90)) flags.push('BP_DIASTOLIC');
  if (v.heartRate && (v.heartRate < 60 || v.heartRate > 100)) {
    flags.push(v.heartRate < 40 || v.heartRate > 150 ? 'CRITICAL_HR' : 'HR');
  }
  if (v.respiratoryRate && (v.respiratoryRate < 12 || v.respiratoryRate > 20)) flags.push('RR');
  if (v.oxygenSaturation && v.oxygenSaturation < 95) {
    flags.push(v.oxygenSaturation < 88 ? 'CRITICAL_SPO2' : 'SPO2');
  }
  if (v.temperature?.value && (v.temperature.value < 36.1 || v.temperature.value > 37.2)) flags.push('TEMP');

  this.abnormalFlags = flags;
  next();
});

VitalSignSchema.post('save', async function (doc) {
  if (doc.abnormalFlags.some(f => f.startsWith('CRITICAL_'))) {
    // publish notification event stub
    console.log(`CRITICAL VITAL SIGN DETECTED FOR PATIENT ${doc.patientId}`);
  }
});

VitalSignSchema.plugin(toJSONPlugin);
VitalSignSchema.plugin(auditPlugin, { entityType: 'VitalSign' });

export const VitalSign = (models.VitalSign || model<IVitalSign>('VitalSign', VitalSignSchema)) as Model<IVitalSign>;
