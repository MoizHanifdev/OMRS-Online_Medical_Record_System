import { generateMeta } from '@/lib/seo/metadata';
import { PricingPreview } from './_sections/PricingPreview';
import { FAQPreview } from './_sections/FAQPreview';

export const metadata = generateMeta({
  title: 'Pricing',
  description: 'Simple, transparent pricing for healthcare teams of all sizes.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <div className="pt-24 pb-12">
      <PricingPreview />
      
      {/* Detailed comparison table would go here */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-4 px-4 font-semibold">Feature</th>
                <th className="py-4 px-4 font-semibold">Solo Practitioner</th>
                <th className="py-4 px-4 font-semibold text-primary">Clinic</th>
                <th className="py-4 px-4 font-semibold">Hospital</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {['Smart Clinical Search', 'Patient Portal', 'E-Prescribing', 'Audit Logging', 'Analytics Dashboards', 'Custom Branding'].map((f, i) => (
                <tr key={f} className="hover:bg-muted/10">
                  <td className="py-4 px-4 text-foreground">{f}</td>
                  <td className="py-4 px-4 text-muted-foreground">{i < 2 ? '✓' : '—'}</td>
                  <td className="py-4 px-4 text-primary">{i < 5 ? '✓' : '—'}</td>
                  <td className="py-4 px-4 text-foreground">✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FAQPreview />
    </div>
  );
}
