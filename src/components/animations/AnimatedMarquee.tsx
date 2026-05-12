'use client';

import { motion } from 'framer-motion';

export function AnimatedMarquee({ children, speed = 40 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="flex overflow-hidden w-full bg-surface-muted/50 py-10 border-y border-border">
      <motion.div
        className="flex min-w-full gap-16 pr-16 items-center hover:pause"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        <div className="flex gap-16 shrink-0">{children}</div>
        <div className="flex gap-16 shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
