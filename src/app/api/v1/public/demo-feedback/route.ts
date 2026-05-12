import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // This would typically save to an analytics DB like PostHog or an internal DB
    // Since it's a demo feedback, we just return success
    console.log('Demo telemetry received:', body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record feedback' }, { status: 500 });
  }
}
