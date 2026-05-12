import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Note: Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv();
  }
} catch (e) {
  console.warn('Failed to initialize Redis for rate limiting:', e);
}

const fallBackRateLimit = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(req: NextRequest, identifier: string = 'global'): Promise<NextResponse | null> {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown-ip';
  const limitKey = `ratelimit:${identifier}:${ip}`;

  if (redis) {
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
    });
    const { success, limit, remaining, reset } = await ratelimit.limit(limitKey);
    if (!success) {
      return NextResponse.json({ error: 'Too Many Requests' }, { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      });
    }
  } else {
    // In-memory fallback for local dev without Redis
    const now = Date.now();
    let record = fallBackRateLimit.get(limitKey);
    if (!record || record.resetAt < now) {
      record = { count: 1, resetAt: now + 60000 };
    } else {
      record.count++;
    }
    fallBackRateLimit.set(limitKey, record);

    if (record.count > 100) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }
  }

  return null;
}
