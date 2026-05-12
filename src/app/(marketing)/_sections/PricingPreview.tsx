'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function PricingPreview() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-muted rounded-full p-1 relative transition-colors border border-border"
            >
              <motion.div
                layout
                className="w-6 h-6 bg-primary rounded-full"
                animate={{ x: annual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
              Annually <span className="text-green-500 font-bold ml-1">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Solo */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-foreground">Solo Practitioner</h3>
            <p className="text-muted-foreground mt-2 mb-6">Perfect for independent doctors starting out.</p>
            <div className="text-4xl font-bold text-foreground mb-6">
              Free
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Up to 100 patients</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> 1 user</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Basic features</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Community support</li>
            </ul>
            <Link href="/signup" className="w-full py-3 text-center border border-border rounded-xl font-bold hover:bg-muted transition-colors">
              Start Free
            </Link>
          </div>

          {/* Clinic */}
          <div className="bg-card border-2 border-primary rounded-3xl p-8 shadow-xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-md">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-foreground">Clinic</h3>
            <p className="text-muted-foreground mt-2 mb-6">For growing clinics needing collaboration.</p>
            <div className="text-4xl font-bold text-foreground mb-6 flex items-end gap-1">
              ${annual ? '99' : '129'} <span className="text-base text-muted-foreground font-normal">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Up to 5,000 patients</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Up to 10 users</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> All clinical features</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Priority support</li>
            </ul>
            <Link href="/signup" className="w-full py-3 text-center bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Start 30-day trial
            </Link>
          </div>

          {/* Hospital */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-foreground">Hospital</h3>
            <p className="text-muted-foreground mt-2 mb-6">Enterprise-grade solution for large facilities.</p>
            <div className="text-4xl font-bold text-foreground mb-6">
              Custom
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Unlimited patients & users</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Custom integrations</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Dedicated success manager</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> SLA & compliance support</li>
            </ul>
            <Link href="/contact" className="w-full py-3 text-center border border-border rounded-xl font-bold hover:bg-muted transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
