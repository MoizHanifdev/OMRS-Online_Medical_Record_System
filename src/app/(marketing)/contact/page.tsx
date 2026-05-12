import { generateMeta } from '@/lib/seo/metadata';
import { ContactForm } from './ContactForm';

export const metadata = generateMeta({
  title: 'Contact Us',
  description: 'Get in touch with the OMRS team for sales, support, or partnerships.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-6">Let&apos;s talk</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Whether you&apos;re looking to migrate a 500-bed hospital or just starting your own private practice, we&apos;re here to help you modernize your workflow.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">hello@omrs.health</p>
                  <p className="text-muted-foreground">support@omrs.health</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office</h3>
                  <p className="text-muted-foreground">123 Healthcare Ave, Tech District<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border shadow-xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
