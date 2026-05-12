'use client';

import { motion } from 'framer-motion';

export function AuthFormCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-card backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl shadow-primary/5"
    >
      <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">
          O
        </div>
        <span className="font-bold tracking-tight text-2xl text-foreground">OMRS</span>
      </div>
      {children}
    </motion.div>
  );
}
