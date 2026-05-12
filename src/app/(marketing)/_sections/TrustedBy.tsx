'use client';

import { Marquee } from '@/components/marketing/Marquee';

const logos = [
  "General Hospital", "Mount Sinai", "Mayo Clinic", "Johns Hopkins", 
  "Cleveland Clinic", "UCLA Health", "Stanford Healthcare", "Mass General",
  "Cedars-Sinai", "NYU Langone"
];

export function TrustedBy() {
  return (
    <section className="py-12 bg-background overflow-hidden border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Trusted by healthcare teams worldwide
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <Marquee speed={40} pauseOnHover>
          {logos.map((logo, idx) => (
            <div key={idx} className="mx-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-16">
              <span className="text-xl font-bold font-serif text-foreground">{logo}</span>
            </div>
          ))}
        </Marquee>

        <div className="mt-4">
          <Marquee speed={35} direction="right" pauseOnHover>
            {[...logos].reverse().map((logo, idx) => (
              <div key={idx} className="mx-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-16">
                <span className="text-xl font-bold font-serif text-foreground">{logo}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
