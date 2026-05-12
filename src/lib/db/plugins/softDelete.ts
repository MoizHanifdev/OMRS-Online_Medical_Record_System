import { type Schema, type Query } from 'mongoose';

export interface SoftDeleteFields {
  deletedAt?: Date | null;
  deletedBy?: string | null;
}

export function softDeletePlugin(schema: Schema) {
  schema.add({
    deletedAt: { type: Date, default: null, index: true },
    deletedBy: { type: String, default: null },
  });

  // Auto-exclude soft-deleted unless explicitly requested
  const excludeDeleted = function (this: Query<any, any>) {
    const opts = this.getOptions() as any;
    if (!opts.includeDeleted) {
      const cond = this.getQuery();
      if (cond.deletedAt === undefined) {
        this.where({ deletedAt: null });
      }
    }
  };

  schema.pre('find', excludeDeleted);
  schema.pre('findOne', excludeDeleted);
  schema.pre('countDocuments', excludeDeleted);
  schema.pre('findOneAndUpdate', excludeDeleted);
  schema.pre('updateMany', excludeDeleted);

  // Instance method
  schema.methods.softDelete = async function (userId?: string) {
    this.deletedAt = new Date();
    this.deletedBy = userId ?? null;
    return this.save();
  };

  schema.methods.restore = async function () {
    this.deletedAt = null;
    this.deletedBy = null;
    return this.save();
  };
}
