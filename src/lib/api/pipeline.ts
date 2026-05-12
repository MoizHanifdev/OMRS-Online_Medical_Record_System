import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db/mongoose';
import { validateBody, validateQuery } from './middleware/validation';
import { rateLimit } from './middleware/rateLimit';
import { withAuditContext } from './middleware/audit';
import { errorHandler } from './middleware/error';
import { ApiResponse } from '@/lib/utils/contracts';

type HandlerFunction<TBody = any, TQuery = any> = (
  req: NextRequest,
  context: { params: any; body: TBody; query: TQuery; user?: any; [key: string]: any }
) => Promise<NextResponse | any> | NextResponse | any;

interface PipelineOptions<TBody extends z.ZodTypeAny, TQuery extends z.ZodTypeAny> {
  requireAuth?: boolean;
  requiredRoles?: string[];
  bodySchema?: TBody;
  querySchema?: TQuery;
  rateLimitId?: string;
  middlewares?: Array<(handler: any) => any>;
  [key: string]: any;
}

export function createApiPipeline<
  TBody extends z.ZodTypeAny = z.ZodTypeAny,
  TQuery extends z.ZodTypeAny = z.ZodTypeAny
>(
  handler: HandlerFunction<z.infer<TBody>, z.infer<TQuery>>,
  options: PipelineOptions<TBody, TQuery> = {}
) {
  return async (req: NextRequest, context: { params: any }): Promise<NextResponse> => {
    return withAuditContext(req, async () => {
      try {
        await connectDB();

        // 1. Rate Limiting
        const rlResponse = await rateLimit(req, options.rateLimitId || 'default');
        if (rlResponse) return rlResponse;

        // 2. Auth & RBAC (stubbed for Module 3)
        if (options.requireAuth) {
          // Verify token, populate audit context userId and role
        }

        // 3. Validation
        let bodyData: z.infer<TBody> | undefined;
        if (options.bodySchema && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
          const { data, error } = await validateBody(req, options.bodySchema);
          if (error) return error;
          bodyData = data;
        }

        let queryData: z.infer<TQuery> | undefined;
        if (options.querySchema) {
          const { data, error } = validateQuery(req, options.querySchema);
          if (error) return error;
          queryData = data;
        }

        // 4. Execution
        const baseContext = {
          ...context,
          body: bodyData as any,
          query: queryData as any,
        };

        let executableHandler: any = handler;
        if (options.middlewares && Array.isArray(options.middlewares)) {
          // Apply middlewares from right to left so they execute left to right
          for (let i = options.middlewares.length - 1; i >= 0; i--) {
            const middleware = options.middlewares[i];
            if (middleware) {
              executableHandler = middleware(executableHandler);
            }
          }
        }

        const result = await executableHandler(req, baseContext);

        // If handler returned a NextResponse directly, return it
        if (result instanceof NextResponse) {
          return result;
        }

        // Otherwise wrap in standardized ApiResponse
        const apiResponse: ApiResponse<any> = {
          success: true,
          data: result,
          meta: {
            timestamp: new Date().toISOString(),
          },
        };

        return NextResponse.json(apiResponse);
      } catch (error) {
        return errorHandler(error);
      }
    });
  };
}
