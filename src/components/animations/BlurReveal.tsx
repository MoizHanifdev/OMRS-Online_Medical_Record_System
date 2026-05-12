'use client';

import { motion } from 'framer-motion';
import { blurReveal } from '@/lib/utils/animation';

export function BlurReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={blurReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
