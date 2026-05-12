import { Schema, model, models, type Document, type Model } from 'mongoose';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import paginate from 'mongoose-paginate-v2';

export interface ICarePlanGoal {
  text: string;
  targetDate?: Date;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'MET' | 'NOT_MET' | 'DEFERRED';
  measurableCriteria?: string;
  achievedAt?: Date;
  achievedBy?: Schema.Types.ObjectId;
  notes?: string;
}

export interface ICarePlanIntervention {
  text: string;
  frequency?: string;
  responsibleRole?: 'DOCTOR' | 'NURSE' | 'PATIENT' | 'FAMILY' | 'CAREGIVER';
  responsibleUserId?: Schema.Types.ObjectId;
  logs: { performedAt: Date; performedBy: Schema.Types.ObjectId; notes?: string; completed: boolean }[];
  status: 'ACTIVE' | 'COMPLETED' | 'DISCONTINUED';
}

export interface ICarePlan extends Document {
  patientId: Schema.Types.ObjectId;
  title: string;
  description?: string;
  category?: string;
  createdBy: Schema.Types.ObjectId;
  assignedTeam: Schema.Types.ObjectId[];
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'DISCONTINUED';
  startDate?: Date;
  endDate?: Date;
  goals: ICarePlanGoal[];
  interventions: ICarePlanIntervention[];
  derivedFromGuideline?: Schema.Types.ObjectId;
  
  progressPercent: number;
}

const CarePlanGoalSchema = new Schema<ICarePlanGoal>({
  text: { type: String, required: true },
  targetDate: Date,
  status: { type: String, enum: ['NOT_STARTED', 'IN_PROGRESS', 'MET', 'NOT_MET', 'DEFERRED'], default: 'NOT_STARTED' },
  measurableCriteria: String,
  achievedAt: Date,
  achievedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: String,
}, { _id: true, timestamps: true });

const CarePlanInterventionSchema = new Schema<ICarePlanIntervention>({
  text: { type: String, required: true },
  frequency: String,
  responsibleRole: { type: String, enum: ['DOCTOR', 'NURSE', 'PATIENT', 'FAMILY', 'CAREGIVER'] },
  responsibleUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  logs: [{
    performedAt: Date,
    performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: String,
    completed: Boolean,
  }],
  status: { type: String, enum: ['ACTIVE', 'COMPLETED', 'DISCONTINUED'], default: 'ACTIVE' },
}, { _id: true, timestamps: true });

const CarePlanSchema = new Schema<ICarePlan>({
  patientId: { type: Schema.Types.ObjectId, ref: 'PatientProfile', required: true, index: true },
  title: { type: String, required: true },
  description: String,
  category: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTeam: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['DRAFT', 'ACTIVE', 'COMPLETED', 'DISCONTINUED'], default: 'DRAFT' },
  startDate: Date,
  endDate: Date,
  goals: [CarePlanGoalSchema],
  interventions: [CarePlanInterventionSchema],
  derivedFromGuideline: { type: Schema.Types.ObjectId, ref: 'Guideline' },
}, { timestamps: true });

CarePlanSchema.virtual('progressPercent').get(function () {
  if (!this.goals || this.goals.length === 0) return 0;
  const metCount = this.goals.filter((g) => g.status === 'MET').length;
  return Math.round((metCount / this.goals.length) * 100);
});

CarePlanSchema.plugin(toJSONPlugin);
CarePlanSchema.plugin(softDeletePlugin);
CarePlanSchema.plugin(auditPlugin, { entityType: 'CarePlan' });
CarePlanSchema.plugin(paginate);

export const CarePlan = (models.CarePlan || model<ICarePlan>('CarePlan', CarePlanSchema)) as Model<ICarePlan>;
