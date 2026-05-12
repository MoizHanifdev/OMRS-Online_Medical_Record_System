import Link from 'next/link';

export function FinalCTA() {
  return (
    <div className="bg-primary text-primary-foreground py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-4xl font-bold">Ready to modernize your practice?</h2>
        <p className="text-xl text-primary-foreground/80">
          Join thousands of healthcare professionals who have already made the switch.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="px-8 py-4 bg-background text-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
            Start Free Trial
          </Link>
          <Link href="/contact" className="px-8 py-4 border-2 border-primary-foreground/20 font-bold rounded-full hover:bg-primary-foreground/10 transition-colors">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
