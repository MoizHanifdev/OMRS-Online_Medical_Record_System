import { Schema, model, models, type Model } from 'mongoose';

const CounterSchema = new Schema(
  { _id: String, seq: { type: Number, default: 0 } },
  { collection: 'counters' }
);

export const Counter = (models.Counter || model('Counter', CounterSchema)) as Model<any>;
