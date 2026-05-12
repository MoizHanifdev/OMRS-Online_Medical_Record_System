import { type Schema } from 'mongoose';
import { Counter } from '@/lib/models/Counter';

export function counterPlugin(schema: Schema, opts: { field: string; prefix?: string; padding?: number; resetYearly?: boolean }) {
  schema.pre('save', async function () {
    if (this.isNew && !this.get(opts.field)) {
      const year = new Date().getFullYear();
      const counterKey = opts.resetYearly ? `${opts.prefix}-${year}` : opts.prefix!;
      const counter = await Counter.findOneAndUpdate(
        { _id: counterKey },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      const num = String(counter!.seq).padStart(opts.padding ?? 6, '0');
      const id = opts.resetYearly ? `${opts.prefix}-${year}-${num}` : `${opts.prefix}-${num}`;
      this.set(opts.field, id);
    }
  });
}
