import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface IAuditLog extends Document {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'PASSWORD_CHANGE' | 'PASSWORD_RESET' | 'PERMISSION_DENIED' | 'EXPORT' | 'PRINT' | 'VIEW_PHI';
  entityType?: string;
  entityId?: string;
  changes?: any;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: String },
    userEmail: { type: String },
    userRole: { type: String },
    action: {
      type: String,
      enum: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'LOGIN_FAILED', 'PASSWORD_CHANGE', 'PASSWORD_RESET', 'PERMISSION_DENIED', 'EXPORT', 'PRINT', 'VIEW_PHI'],
      required: true,
    },
    entityType: { type: String },
    entityId: { type: String },
    changes: { type: Schema.Types.Mixed },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    requestId: { type: String },
    severity: { type: String, enum: ['INFO', 'WARNING', 'CRITICAL'], default: 'INFO' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AuditLogSchema.index({ createdAt: -1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 * 7 }); // 7 years TTL
AuditLogSchema.index({ userId: 1, createdAt: -1 });
AuditLogSchema.index({ entityType: 1, entityId: 1, createdAt: -1 });
AuditLogSchema.index({ action: 1 });

export const AuditLog = (models.AuditLog || model<IAuditLog>('AuditLog', AuditLogSchema)) as Model<IAuditLog>;
