import { Schema, model, models, type Document, type Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { toJSONPlugin } from '../db/plugins/toJSON';
import { softDeletePlugin } from '../db/plugins/softDelete';
import { auditPlugin } from '../db/plugins/auditLog';
import { encryptedFieldsPlugin } from '../db/plugins/encryptedFields';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: { first: string; last: string };
  phone?: string;
  avatarUrl?: string;
  role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'LAB_TECHNICIAN' | 'PATIENT';
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerifiedAt?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  failedLoginAttempts: number;
  lockedUntil?: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: any;
  passwordChangedAt?: Date;
  mustChangePassword?: boolean;
  preferences?: any;
  createdBy?: Schema.Types.ObjectId;
  metadata?: any;
  
  fullName: string;
  displayName: string;
  isLocked: boolean;

  comparePassword(plain: string): Promise<boolean>;
  incrementFailedAttempts(): Promise<void>;
  resetFailedAttempts(): Promise<void>;
  generateAccessToken(): string;
  toPublicJSON(): any;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    phone: { type: String },
    avatarUrl: { type: String },
    role: {
      type: String,
      enum: ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'LAB_TECHNICIAN', 'PATIENT'],
      required: true,
      index: true,
    },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerifiedAt: { type: Date },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
    failedLoginAttempts: { type: Number, default: 0, max: 10 },
    lockedUntil: { type: Date, sparse: true },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: Schema.Types.Mixed, select: false },
    passwordChangedAt: { type: Date },
    mustChangePassword: { type: Boolean, default: false },
    preferences: {
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      language: { type: String, enum: ['en', 'ur'], default: 'en' },
      timezone: { type: String, default: 'Asia/Karachi' },
      dateFormat: { type: String, default: 'DD/MM/YYYY' },
      notificationPrefs: { type: Schema.Types.Mixed },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true, collation: { locale: 'en', strength: 2 } }
);

UserSchema.index({ role: 1, isActive: 1 });

UserSchema.virtual('fullName').get(function () {
  return `${this.name.first} ${this.name.last}`;
});

UserSchema.virtual('displayName').get(function () {
  if (this.role === 'DOCTOR') return `Dr. ${this.fullName}`;
  return this.fullName;
});

UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockedUntil && this.lockedUntil > new Date());
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password as string, 12);
    this.passwordChangedAt = new Date();
  }
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

UserSchema.methods.comparePassword = async function (plain: string) {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

UserSchema.methods.incrementFailedAttempts = async function () {
  if (this.isLocked) return;
  this.failedLoginAttempts += 1;
  if (this.failedLoginAttempts >= 5) {
    this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  }
  await this.save();
};

UserSchema.methods.resetFailedAttempts = async function () {
  this.failedLoginAttempts = 0;
  this.lockedUntil = undefined;
  await this.save();
};

UserSchema.methods.generateAccessToken = function () {
  return 'jwt-stub';
};

UserSchema.methods.toPublicJSON = function () {
  const obj = this.toJSON();
  return {
    id: obj.id,
    name: obj.name,
    fullName: obj.fullName,
    displayName: obj.displayName,
    avatarUrl: obj.avatarUrl,
    role: obj.role,
  };
};

UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email }).collation({ locale: 'en', strength: 2 });
};

UserSchema.statics.createWithDefaults = function (data: any) {
  return this.create(data);
};

UserSchema.plugin(toJSONPlugin);
UserSchema.plugin(softDeletePlugin);
UserSchema.plugin(auditPlugin, { entityType: 'User' });
UserSchema.plugin(encryptedFieldsPlugin, { fields: ['twoFactorSecret'] });

export const User = (models.User || model<IUser>('User', UserSchema)) as Model<IUser>;
