import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    const dbState = mongoose.connection.readyState;
    const states: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    return NextResponse.json({
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: {
          state: states[dbState] ?? 'unknown',
          host: mongoose.connection.host,
          name: mongoose.connection.name,
        },
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version ?? '1.0.0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'DB_CONNECTION_FAILED', message: 'Database unavailable' } },
      { status: 503 }
    );
  }
}
