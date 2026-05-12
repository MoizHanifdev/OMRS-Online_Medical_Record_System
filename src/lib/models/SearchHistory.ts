import { Schema, model, models, type Document, type Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface ISearchHistory extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  query: any;
  isStarred: boolean;
  useCount: number;
  lastUsedAt?: Date;
}

const SearchHistorySchema = new Schema<ISearchHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    query: { type: Schema.Types.Mixed, required: true },
    isStarred: { type: Boolean, default: false },
    useCount: { type: Number, default: 0 },
    lastUsedAt: Date,
  },
  { timestamps: true }
);

SearchHistorySchema.plugin(paginate);

export const SearchHistory = (models.SearchHistory || model<ISearchHistory>('SearchHistory', SearchHistorySchema)) as Model<ISearchHistory>;
