'use client';

import { BentoGrid, BentoCard } from '@/components/marketing/BentoGrid';

export function FeatureBento() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Everything your healthcare team needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Six tools that replace dozens of disconnected systems.
          </p>
        </div>

        <BentoGrid>
          <BentoCard
            title="Centralized Records"
            description="One unified view of the patient's entire medical history, instantly accessible."
            icon="🗂️"
            className="col-span-12 md:col-span-6 row-span-2 min-h-[400px]"
            href="/features/records"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="mt-8 flex justify-center">
              <div className="w-3/4 h-48 bg-card border border-border rounded-t-xl shadow-lg flex items-end justify-center p-4">
                <div className="flex gap-2">
                  <div className="w-12 h-16 bg-blue-100 rounded rotate-[-10deg]"></div>
                  <div className="w-12 h-20 bg-amber-100 rounded z-10"></div>
                  <div className="w-12 h-16 bg-green-100 rounded rotate-[10deg]"></div>
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard
            title="Smart Search & Analytics"
            description="Find anything in milliseconds. Analyze populations instantly."
            icon="🔍"
            className="col-span-12 md:col-span-6 row-span-1"
            href="/features/search"
          />

          <BentoCard
            title="Role-Based Access"
            description="Strict access controls ensuring only authorized staff see sensitive data."
            icon="🔐"
            className="col-span-12 md:col-span-3 row-span-1"
            href="/features/security"
          />

          <BentoCard
            title="Medication Management"
            description="E-prescribing with built-in allergy and interaction checks."
            icon="💊"
            className="col-span-12 md:col-span-3 row-span-1"
            href="/features/medications"
          />

          <BentoCard
            title="Lab & Radiology"
            description="Integrated results directly in the patient chart."
            icon="🔬"
            className="col-span-12 md:col-span-4 row-span-1"
            href="/features/labs"
          />

          <BentoCard
            title="Clinical Documentation"
            description="Rich note editor with templates and digital signatures."
            icon="📝"
            className="col-span-12 md:col-span-4 row-span-1"
            href="/features/notes"
          />

          <BentoCard
            title="Patient Portal"
            description="Give patients access to their own data anywhere, anytime."
            icon="📱"
            className="col-span-12 md:col-span-4 row-span-1"
            href="/features/portal"
          />
        </BentoGrid>
      </div>
    </section>
  );
}
