import { Resend } from 'resend';

const apiKey = (process.env.RESEND_API_KEY || '').trim();
const resend = new Resend(apiKey || 're_stubbed');

export async function sendEmail({ to, subject, react }: { to: string; subject: string; react: React.ReactNode }) {
  if (!apiKey) {
    console.log(`[Email Stub] Would send email to ${to} with subject "${subject}"`);
    return { id: 'stub-id' };
  }

  try {
    console.log(`[Email] Sending "${subject}" to ${to}...`);
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'OMRS <onboarding@resend.dev>',
      to,
      subject,
      react,
    });

    if (error) {
      console.error('[Resend Error]', error);
      
      // Provide a helpful hint for the testing restriction error
      if ((error as any).statusCode === 403) {
        console.log('\n💡 TIP: While using onboarding@resend.dev, you can only send emails to YOUR Resend account email (e.g. moizhanif.dev@gmail.com).');
        console.log('To send to any email, you must verify a domain in the Resend dashboard and update your EMAIL_FROM.\n');
      }

      return { id: 'error', error: error.message };
    }

    console.log(`[Email] Successfully sent to ${to}, id:`, data?.id);
    return data;
  } catch (err) {
    console.error('[Email] Unexpected error sending email:', err);
    // Don't throw — email failure should not block signup/verification flows
    return { id: 'error', error: String(err) };
  }
}
