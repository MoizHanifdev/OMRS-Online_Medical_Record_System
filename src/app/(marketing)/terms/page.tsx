import { generateMeta } from '@/lib/seo/metadata';

export const metadata = generateMeta({
  title: 'Terms of Service',
  description: 'Terms and conditions for using OMRS.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: May 2026</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the OMRS platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
          </p>

          <h2>2. Enterprise Customers</h2>
          <p>
            If you are using OMRS on behalf of a healthcare organization, you represent that you have the authority to bind that organization to these terms. Use of the platform for processing patient data also requires a signed Business Associate Agreement (BAA).
          </p>

          <h2>3. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the platform for any illegal purpose</li>
            <li>Attempt to bypass or compromise our security measures</li>
            <li>Upload malicious code or files</li>
            <li>Share access credentials with unauthorized users</li>
          </ul>

          <h2>4. Service Availability</h2>
          <p>
            We strive to maintain 99.99% uptime. However, we do not guarantee that the service will be uninterrupted or error-free. Scheduled maintenance will be announced in advance.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            OMRS provides a platform for medical record management, but it is not a substitute for professional medical judgment. Clinicians are solely responsible for the medical care provided to patients.
          </p>
        </div>
      </div>
    </div>
  );
}
