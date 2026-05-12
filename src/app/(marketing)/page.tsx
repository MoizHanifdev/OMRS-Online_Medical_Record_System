import { Metadata } from 'next';
import { Hero } from './_sections/Hero';
import { TrustedBy } from './_sections/TrustedBy';
import { ProblemSolution } from './_sections/ProblemSolution';
import { FeatureBento } from './_sections/FeatureBento';
import { InteractiveDemo } from './_sections/InteractiveDemo';
import { HowItWorks } from './_sections/HowItWorks';
import { UseCases } from './_sections/UseCases';
import { ComparisonTable } from './_sections/ComparisonTable';
import { Stats } from './_sections/Stats';
import { Testimonials } from './_sections/Testimonials';
import { SecurityCompliance } from './_sections/SecurityCompliance';
import { Integrations } from './_sections/Integrations';
import { PricingPreview } from './_sections/PricingPreview';
import { FAQPreview } from './_sections/FAQPreview';
import { FinalCTA } from './_sections/FinalCTA';

export const metadata: Metadata = {
  title: 'OMRS | The Modern Operating System for Medical Records',
  description: 'Replace paper files with secure, centralized, searchable patient records. Built for doctors, nurses, and the healthcare teams of tomorrow.',
};

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24 overflow-hidden">
      <Hero />
      <TrustedBy />
      <ProblemSolution />
      <FeatureBento />
      <InteractiveDemo />
      <HowItWorks />
      <UseCases />
      <ComparisonTable />
      <Stats />
      <Testimonials />
      <SecurityCompliance />
      <Integrations />
      <PricingPreview />
      <FAQPreview />
      <FinalCTA />
    </div>
  );
}
