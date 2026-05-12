import { hasAnyPermission, type Permission } from '@/auth/permissions';
import type { Role } from '@/lib/constants/roles';
import { BaseError } from '@/lib/utils/contracts';

export class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden') {
    super('FORBIDDEN', message, 403);
  }
}

export function requireRoles(...roles: Role[]) {
  return (handler: any) => async (req: any, ctx: any) => {
    if (!ctx.user) throw new ForbiddenError('Authentication required');
    if (!roles.includes(ctx.user.role)) throw new ForbiddenError();
    return handler(req, ctx);
  };
}

export function requirePermissions(...permissions: Permission[]) {
  return (handler: any) => async (req: any, ctx: any) => {
    if (!ctx.user) throw new ForbiddenError('Authentication required');
    if (!hasAnyPermission(ctx.user.role, permissions)) throw new ForbiddenError();
    return handler(req, ctx);
  };
}

export function requireStepUp({ maxAgeSeconds }: { maxAgeSeconds: number }) {
  return (handler: any) => async (req: any, ctx: any) => {
    const now = Math.floor(Date.now() / 1000);
    if (!ctx.stepUpAt || now - ctx.stepUpAt > maxAgeSeconds) {
      throw new ForbiddenError('Step-up authentication required');
    }
    return handler(req, ctx);
  };
}
