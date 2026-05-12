import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_stubbed');

export async function sendEmail({ to, subject, react }: { to: string; subject: string; react: React.ReactNode }) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email Stub] Would send email to ${to} with subject "${subject}"`);
    return { id: 'stub-id' };
  }

  return resend.emails.send({
    from: process.env.EMAIL_FROM || 'OMRS <noreply@omrs.local>',
    to,
    subject,
    react,
  });
}
