'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-primary/10 -z-20" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6"
        >
          Ready to digitize your practice?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10"
        >
          Join the hospitals and clinics already transforming their workflow.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 text-lg">
            Start Free Trial
          </Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-card text-foreground border border-border font-bold rounded-full hover:bg-muted transition-colors text-lg">
            Book a Demo
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Free forever for solo practitioners. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}
