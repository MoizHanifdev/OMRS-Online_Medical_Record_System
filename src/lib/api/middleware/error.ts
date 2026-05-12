import { NextResponse } from 'next/server';
import { BaseError } from '@/lib/utils/contracts';

export function errorHandler(error: unknown): NextResponse {
  console.error('[API Error]', error);

  if (error instanceof BaseError) {
    return NextResponse.json(
      { success: false, error: { code: error.code, message: error.message, details: error.details } },
      { status: error.statusCode }
    );
  }

  // Handle Mongoose validation errors
  if (typeof error === 'object' && error !== null && 'name' in error) {
    const err = error as any;
    if (err.name === 'ValidationError') {
      const details = Object.keys(err.errors || {}).reduce((acc: any, key) => {
        acc[key] = [err.errors[key].message];
        return acc;
      }, {});
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Database validation failed', details } },
        { status: 400 }
      );
    }
    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFLICT', message: 'Duplicate record exists' } },
        { status: 409 }
      );
    }
  }

  return NextResponse.json(
    { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' } },
    { status: 500 }
  );
}
