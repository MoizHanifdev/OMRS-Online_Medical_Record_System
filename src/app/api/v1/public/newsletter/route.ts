import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { NewsletterSubscriber } from '@/lib/models/NewsletterSubscriber';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (body.b_name) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: body.email.toLowerCase() },
      { 
        $setOnInsert: { 
          source: body.source || 'FOOTER',
          metadata: {
            userAgent: req.headers.get('user-agent'),
            ipAddress: req.headers.get('x-forwarded-for'),
          }
        } 
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
