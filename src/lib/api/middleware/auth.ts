import { auth } from '@/auth/config';
import { BaseError } from '@/lib/utils/contracts';
import { auditStorage } from './audit';

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
  }
}

export function authMiddleware(options: { required?: boolean } = { required: true }) {
  return (handler: any) => async (req: any, ctx: any) => {
    const session = await auth();
    if (!session?.user) {
      if (options.required) throw new UnauthorizedError();
    } else {
      ctx.user = session.user;
      ctx.stepUpAt = session.stepUpAt;
      
      const auditCtx = auditStorage.getStore();
      if (auditCtx) {
        auditCtx.userId = session.user.id;
        auditCtx.userEmail = session.user.email;
        auditCtx.userRole = session.user.role;
      }
    }
    return handler(req, ctx);
  };
}
