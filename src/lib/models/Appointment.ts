import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import { counterPlugin } from '../db/plugins/counter';
import paginate from 'mongoose-paginate-v2';

export interface IAppointment extends Document {
  appointmentNumber?: string;
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  scheduledAt: Date;
  duration: number;
  status: 'SCHEDULED' | 'CONFIRMED' | 'CHECKED_IN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED';
  type: 'IN_PERSON' | 'TELEMEDICINE' | 'HOME_VISIT';
  reason?: string;
  notes?: string;
  videoLink?: string;
  checkedInAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  cancelledBy?: Schema.Types.ObjectId;
  noShowMarkedAt?: Date;
  bookedBy?: Schema.Types.ObjectId;
  remindersSent?: { type: 'EMAIL' | 'SMS' | 'PUSH'; sentAt: Date; status: string }[];
  linkedClinicalNoteId?: Schema.Types.ObjectId;
  linkedPrescriptionIds?: Schema.Types.ObjectId[];
  paymentStatus?: 'PENDING' | 'PAID' | 'WAIVED' | 'REFUNDED';
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    appointmentNumber: { type: String, unique: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scheduledAt: { type: Date, required: true },
    duration: { type: Number, default: 30 },
    status: { type: String, enum: ['SCHEDULED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'], default: 'SCHEDULED', index: true },
    type: { type: String, enum: ['IN_PERSON', 'TELEMEDICINE', 'HOME_VISIT'], default: 'IN_PERSON' },
    reason: String,
    notes: String,
    videoLink: String,
    checkedInAt: Date,
    startedAt: Date,
    completedAt: Date,
    cancelledAt: Date,
    cancellationReason: String,
    cancelledBy: { type: Schema.Types.ObjectId, ref: 'User' },
    noShowMarkedAt: Date,
    bookedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    remindersSent: [{ type: { type: String, enum: ['EMAIL', 'SMS', 'PUSH'] }, sentAt: Date, status: String }],
    linkedClinicalNoteId: { type: Schema.Types.ObjectId, ref: 'ClinicalNote' },
    linkedPrescriptionIds: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }],
    paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'WAIVED', 'REFUNDED'], default: 'PENDING' },
  },
  { timestamps: true }
);

AppointmentSchema.index({ doctorId: 1, scheduledAt: 1 });
AppointmentSchema.index({ patientId: 1, scheduledAt: -1 });

AppointmentSchema.statics.findConflicts = async function (doctorId: string, scheduledAt: Date, duration: number, excludeId?: string) {
  const endAt = new Date(scheduledAt.getTime() + duration * 60000);
  const query: any = {
    doctorId,
    status: { $nin: ['CANCELLED', 'NO_SHOW', 'RESCHEDULED'] },
    $or: [
      { scheduledAt: { $lt: endAt, $gte: scheduledAt } },
      // Check if existing appointments overlap
    ],
  };
  if (excludeId) query._id = { $ne: excludeId };
  return this.find(query);
};

AppointmentSchema.statics.getAvailableSlots = async function (doctorId: string, date: Date) {
  // Stub implementation
  return [];
};

AppointmentSchema.plugin(toJSONPlugin);
AppointmentSchema.plugin(softDeletePlugin);
AppointmentSchema.plugin(auditPlugin, { entityType: 'Appointment' });
AppointmentSchema.plugin(counterPlugin, { field: 'appointmentNumber', prefix: 'APT' });
AppointmentSchema.plugin(paginate);

export const Appointment = (models.Appointment || model<IAppointment>('Appointment', AppointmentSchema)) as Model<IAppointment>;
