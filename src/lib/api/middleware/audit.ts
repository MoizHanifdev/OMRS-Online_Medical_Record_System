import { NextRequest, NextResponse } from 'next/server';

export interface AuditContext {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
}

// In Next.js App Router, we can't easily use AsyncLocalStorage without experimental features or custom setup
// For simplicity, we can pass it down through the pipeline, or use `req.headers`.
// A robust way in App Router is injecting it into the request context.
// But Mongoose hooks don't have access to the request easily.
// Let's use AsyncLocalStorage for Mongoose hooks.
import { AsyncLocalStorage } from 'async_hooks';

export const auditStorage = new AsyncLocalStorage<AuditContext>();

export function getAuditContext(): AuditContext | undefined {
  return auditStorage.getStore();
}

export async function withAuditContext(
  req: NextRequest,
  handler: () => Promise<NextResponse> | NextResponse
): Promise<NextResponse> {
  const ipAddress = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const requestId = req.headers.get('x-request-id') || crypto.randomUUID();

  // Stub user context for now (will be populated by auth middleware later)
  const ctx: AuditContext = {
    ipAddress,
    userAgent,
    requestId,
    // userId: ...,
  };

  return auditStorage.run(ctx, async () => {
    return await handler();
  });
}
