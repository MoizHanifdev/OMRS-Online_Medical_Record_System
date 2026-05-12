'use client';

import { motion } from 'framer-motion';

export function HeartbeatLine() {
  return (
    <div className="w-full h-24 overflow-hidden opacity-30 pointer-events-none">
      <motion.svg
        initial={{ strokeDashoffset: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="w-full h-full text-primary"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="1000"
      >
        <path d="M0,50 L300,50 L320,20 L350,80 L380,10 L410,90 L440,50 L1000,50" />
      </motion.svg>
    </div>
  );
}
