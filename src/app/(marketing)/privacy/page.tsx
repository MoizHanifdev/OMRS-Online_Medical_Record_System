import { generateMeta } from '@/lib/seo/metadata';

export const metadata = generateMeta({
  title: 'Privacy Policy',
  description: 'How we handle and protect your data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: May 2026</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At OMRS Health Inc., we take your privacy and the privacy of your patients extremely seriously. This Privacy Policy outlines how we collect, use, and protect data.
          </p>

          <h2>2. Protected Health Information (PHI)</h2>
          <p>
            As a provider of an Online Medical Record System, we act as a Business Associate under HIPAA. We only process PHI in accordance with the Business Associate Agreement (BAA) signed with our customers (Covered Entities).
          </p>
          <p>
            We do not sell, rent, or monetize PHI. Data is encrypted both in transit and at rest.
          </p>

          <h2>3. Information We Collect</h2>
          <ul>
            <li><strong>Account Data:</strong> Name, email, organization, and billing information.</li>
            <li><strong>Usage Data:</strong> How you interact with our platform, strictly for performance and security monitoring.</li>
            <li><strong>Support Data:</strong> Information you provide when contacting our support team.</li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain PHI according to the terms of our BAA and applicable laws. Account data is retained as long as your account is active.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our data practices, please contact our Data Protection Officer at privacy@omrs.health.
          </p>
        </div>
      </div>
    </div>
  );
}
