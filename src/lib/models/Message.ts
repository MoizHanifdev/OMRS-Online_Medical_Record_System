import { Schema, model, models, type Document, type Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IMessage extends Document {
  conversationId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  content: string;
  attachments?: { url: string; name: string; type: string }[];
  readBy?: Schema.Types.ObjectId[];
  editedAt?: Date;
  deletedAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    attachments: [{ url: String, name: String, type: { type: String } }],
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    editedAt: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);

MessageSchema.plugin(paginate);

export const Message = (models.Message || model<IMessage>('Message', MessageSchema)) as Model<IMessage>;
