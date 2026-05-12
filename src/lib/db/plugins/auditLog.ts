import { type Schema } from 'mongoose';
import { getAuditContext } from '@/lib/api/middleware/audit';

interface AuditPluginOptions {
  entityType: string;
  trackFields?: string[];      // only track changes to these fields (omit = all)
  ignoreFields?: string[];     // never track these fields
  trackReads?: boolean;        // log read access (for PHI)
}

export function auditPlugin(schema: Schema, options: AuditPluginOptions) {
  const { entityType, ignoreFields = ['updatedAt', '__v'], trackReads = false } = options;

  schema.pre('save', async function () {
    const ctx = getAuditContext();
    const action = this.isNew ? 'CREATE' : 'UPDATE';
    const changes = this.isNew ? null : this.modifiedPaths().reduce((acc: any, path) => {
      if (!ignoreFields.includes(path)) {
        acc[path] = { before: this.get(path, null, { getters: false }), after: this.get(path) };
      }
      return acc;
    }, {});

    // Defer actual log write until post-save to ensure success
    (this as any).__auditAction = action;
    (this as any).__auditChanges = changes;
  });

  schema.post('save', async function () {
    const ctx = getAuditContext();
    const action = (this as any).__auditAction;
    const changes = (this as any).__auditChanges;
    if (!action || !ctx) return;

    const { AuditLog } = await import('@/lib/models/AuditLog');
    await AuditLog.create({
      action,
      entityType,
      entityId: this._id?.toString(),
      userId: ctx.userId,
      userEmail: ctx.userEmail,
      userRole: ctx.userRole,
      changes,
      ipAddress: ctx.ipAddress,
      userAgent: ctx.userAgent,
      requestId: ctx.requestId,
    }).catch((e) => console.error('Audit log write failed', e));
  });

  schema.post('findOneAndDelete', async function (doc: any) {
    const ctx = getAuditContext();
    if (!doc || !ctx) return;
    const { AuditLog } = await import('@/lib/models/AuditLog');
    await AuditLog.create({
      action: 'DELETE',
      entityType,
      entityId: doc._id?.toString(),
      userId: ctx.userId,
      userEmail: ctx.userEmail,
      userRole: ctx.userRole,
      ipAddress: ctx.ipAddress,
      userAgent: ctx.userAgent,
      requestId: ctx.requestId,
    }).catch(() => {});
  });

  if (trackReads) {
    schema.post('findOne', async function (doc: any) {
      const ctx = getAuditContext();
      if (!doc || !ctx) return;
      const { AuditLog } = await import('@/lib/models/AuditLog');
      await AuditLog.create({
        action: 'READ',
        entityType,
        entityId: doc._id?.toString(),
        userId: ctx.userId,
        userRole: ctx.userRole,
        ipAddress: ctx.ipAddress,
        requestId: ctx.requestId,
      }).catch(() => {});
    });
  }
}
