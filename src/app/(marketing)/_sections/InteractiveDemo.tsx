'use client';

import { motion } from 'framer-motion';
import { DemoWidget } from '@/components/marketing/DemoWidget/DemoWidget';
import Link from 'next/link';

export function InteractiveDemo() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Try it now — no signup required
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore a real patient record in our interactive sandbox. All data is mock data and stays on your device.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glass window decoration */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-500 rounded-3xl blur opacity-20"></div>
          
          <div className="relative bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9] flex flex-col">
            {/* macOS Chrome */}
            <div className="h-10 bg-muted/30 border-b border-border flex items-center px-4 gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto text-xs font-medium text-muted-foreground">omrs.health/demo</div>
            </div>
            
            {/* Real Demo Content */}
            <div className="flex-1 overflow-hidden relative">
              <DemoWidget />
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-lg text-foreground font-medium mb-4">Like what you see?</p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            Get full access — Sign up free
          </Link>
        </div>
      </div>
    </section>
  );
}
