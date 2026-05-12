import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

export async function validateBody<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T
): Promise<{ data?: z.infer<T>; error?: NextResponse }> {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return {
        error: NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid request data',
              details: result.error.flatten().fieldErrors,
            },
          },
          { status: 400 }
        ),
      };
    }
    return { data: result.data };
  } catch (error) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
        { status: 400 }
      ),
    };
  }
}

export function validateQuery<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T
): { data?: z.infer<T>; error?: NextResponse } {
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  
  const result = schema.safeParse(searchParams);
  if (!result.success) {
    return {
      error: NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid query parameters',
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      ),
    };
  }
  return { data: result.data };
}
