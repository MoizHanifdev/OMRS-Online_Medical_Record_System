import { type Schema } from 'mongoose';

interface ToJSONOptions {
  hideFields?: string[];
  virtuals?: boolean;
}

export function toJSONPlugin(schema: Schema, options: ToJSONOptions = {}) {
  const hideFields = [
    '__v',
    'password',
    'passwordResetToken',
    'emailVerificationToken',
    'twoFactorSecret',
    ...(options.hideFields ?? []),
  ];

  const transform = (_doc: any, ret: any) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    hideFields.forEach((f) => delete ret[f]);
    return ret;
  };

  schema.set('toJSON', {
    virtuals: options.virtuals ?? true,
    versionKey: false,
    transform,
  });

  schema.set('toObject', {
    virtuals: options.virtuals ?? true,
    versionKey: false,
    transform,
  });
}
