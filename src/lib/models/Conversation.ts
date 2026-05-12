import { Schema, model, models, type Document, type Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IConversation extends Document {
  participants: Schema.Types.ObjectId[];
  type: 'DIRECT' | 'GROUP';
  lastMessageAt?: Date;
  lastMessagePreview?: string;
  unreadCounts?: Map<string, number>;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    type: { type: String, enum: ['DIRECT', 'GROUP'], required: true },
    lastMessageAt: Date,
    lastMessagePreview: String,
    unreadCounts: { type: Map, of: Number },
  },
  { timestamps: true }
);

ConversationSchema.index({ participants: 1 });

ConversationSchema.plugin(paginate);

export const Conversation = (models.Conversation || model<IConversation>('Conversation', ConversationSchema)) as Model<IConversation>;
