import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import { counterPlugin } from '../db/plugins/counter';
import paginate from 'mongoose-paginate-v2';

export interface IPrescriptionItem {
  drugName: string;
  genericName?: string;
  dosage: string;
  frequency: string;
  route: string;
  duration: string;
  quantity?: number;
  instructions?: string;
  refills: number;
}

export interface IPrescription extends Document {
  rxNumber?: string;
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  issuedAt: Date;
  items: IPrescriptionItem[];
  diagnosis?: string;
  notes?: string;
  status: 'ACTIVE' | 'FULFILLED' | 'CANCELLED' | 'EXPIRED';
  validUntil: Date;
  digitalSignatureUrl?: string;
  printCount: number;
  fulfilledAt?: Date;
  pharmacyNotes?: string;
}

const PrescriptionItemSchema = new Schema<IPrescriptionItem>(
  {
    drugName: { type: String, required: true },
    genericName: String,
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    route: { type: String, required: true },
    duration: { type: String, required: true },
    quantity: Number,
    instructions: String,
    refills: { type: Number, default: 0 },
  },
  { _id: true }
);

const PrescriptionSchema = new Schema<IPrescription>(
  {
    rxNumber: { type: String, unique: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    issuedAt: { type: Date, default: Date.now },
    items: { type: [PrescriptionItemSchema], required: true },
    diagnosis: String,
    notes: String,
    status: { type: String, enum: ['ACTIVE', 'FULFILLED', 'CANCELLED', 'EXPIRED'], default: 'ACTIVE' },
    validUntil: { type: Date },
    digitalSignatureUrl: String,
    printCount: { type: Number, default: 0 },
    fulfilledAt: Date,
    pharmacyNotes: String,
  },
  { timestamps: true }
);

PrescriptionSchema.pre('save', function (next) {
  if (!this.items || this.items.length === 0) {
    return next(new Error('Prescription must have at least one item'));
  }
  if (!this.validUntil) {
    const validUntil = new Date(this.issuedAt || Date.now());
    validUntil.setDate(validUntil.getDate() + 30);
    this.validUntil = validUntil;
  }
  next();
});

// We skip post-save hooks creating Medications automatically here to avoid side-effects without service layer, 
// but user requested "post-save: when status changes to ACTIVE, create Medication entries for each item".
PrescriptionSchema.post('save', async function (doc) {
  if (doc.status === 'ACTIVE') {
    const { Medication } = await import('./Medication');
    for (const item of doc.items) {
      await Medication.findOneAndUpdate(
        { prescriptionId: doc._id, drugName: item.drugName },
        {
          $setOnInsert: {
            patientId: doc.patientId,
            prescribedBy: doc.doctorId,
            drugName: item.drugName,
            genericName: item.genericName,
            dosage: item.dosage,
            frequency: item.frequency as any,
            route: item.route as any,
            startDate: doc.issuedAt,
            duration: item.duration,
            indication: doc.diagnosis,
            instructions: item.instructions,
            refillsAllowed: item.refills,
            refillsRemaining: item.refills,
            status: 'ACTIVE'
          }
        },
        { upsert: true }
      );
    }
  }
});

PrescriptionSchema.plugin(toJSONPlugin);
PrescriptionSchema.plugin(softDeletePlugin);
PrescriptionSchema.plugin(auditPlugin, { entityType: 'Prescription' });
PrescriptionSchema.plugin(counterPlugin, { field: 'rxNumber', prefix: 'RX' });
PrescriptionSchema.plugin(paginate);

export const Prescription = (models.Prescription || model<IPrescription>('Prescription', PrescriptionSchema)) as Model<IPrescription>;
