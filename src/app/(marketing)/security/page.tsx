import { generateMeta } from '@/lib/seo/metadata';
import { SecurityCompliance } from './_sections/SecurityCompliance';

export const metadata = generateMeta({
  title: 'Security & Compliance',
  description: 'Healthcare-grade security by default. OMRS meets HIPAA, SOC 2, and GDPR standards.',
  path: '/security',
});

export default function SecurityPage() {
  return (
    <div className="pt-24 pb-12">
      <SecurityCompliance />
      
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold mb-8">Data Architecture</h3>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            OMRS utilizes a zero-trust architecture. Data is encrypted at rest using AES-256-GCM and in transit via TLS 1.3.
          </p>
          <p>
            Every action taken within the system is logged in a cryptographically secure, append-only audit trail that cannot be altered, even by system administrators.
          </p>
          <h3>Incident Response</h3>
          <p>
            Our dedicated security team monitors the platform 24/7. In the event of a suspected breach, automated systems instantly lock down affected tenants while our team investigates. We guarantee compliance with HIPAA breach notification rules.
          </p>
        </div>
      </section>
    </div>
  );
}
