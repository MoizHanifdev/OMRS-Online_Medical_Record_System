import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { ContactSubmission } from '@/lib/models/ContactSubmission';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Verify Honeypot
    if (body.b_name) {
      return NextResponse.json({ success: true }, { status: 200 }); // fake success for spam
    }

    // Verify Turnstile here if needed

    const submission = await ContactSubmission.create({
      name: body.name,
      email: body.email,
      organization: body.organization,
      role: body.role,
      topic: body.topic,
      message: body.message,
      ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
      userAgent: req.headers.get('user-agent'),
      status: 'NEW'
    });

    // In a real app, send email notification here

    return NextResponse.json({ success: true, id: submission._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
