import { Schema, model, models, type Document, type Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL' | 'LAB_RESULT_CRITICAL' | 'APPOINTMENT_REMINDER' | 'APPOINTMENT_CONFIRMED' | 'APPOINTMENT_CANCELLED' | 'PRESCRIPTION_NEW' | 'NOTE_SIGNED' | 'CARE_PLAN_GOAL_DUE' | 'MESSAGE_RECEIVED' | 'SYSTEM';
  category: 'CLINICAL' | 'ADMINISTRATIVE' | 'SYSTEM';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  title: string;
  message: string;
  link?: string;
  relatedEntityType?: string;
  relatedEntityId?: Schema.Types.ObjectId;
  isRead: boolean;
  readAt?: Date;
  expiresAt?: Date;
  deliveryChannels?: {
    inApp?: { delivered?: boolean; deliveredAt?: Date };
    email?: { delivered?: boolean; deliveredAt?: Date; opened?: boolean };
    sms?: { delivered?: boolean; deliveredAt?: Date };
  };
  actions?: { label: string; action: string; url?: string }[];
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, required: true },
    category: { type: String, enum: ['CLINICAL', 'ADMINISTRATIVE', 'SYSTEM'], required: true },
    priority: { type: String, enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: String,
    relatedEntityType: String,
    relatedEntityId: Schema.Types.ObjectId,
    isRead: { type: Boolean, default: false, index: true },
    readAt: Date,
    expiresAt: { type: Date, index: { expires: 0 } },
    deliveryChannels: Schema.Types.Mixed,
    actions: [{ label: String, action: String, url: String }],
  },
  { timestamps: true }
);

NotificationSchema.plugin(paginate);

export const Notification = (models.Notification || model<INotification>('Notification', NotificationSchema)) as Model<INotification>;
