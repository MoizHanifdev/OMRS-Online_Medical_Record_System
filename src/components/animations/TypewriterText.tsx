'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TypewriterText({ texts, speed = 100 }: { texts: string[]; speed?: number }) {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, texts[index]?.length! * speed + 2000);
    return () => clearInterval(timer);
  }, [texts, speed, index]);

  return (
    <div className="relative inline-block overflow-hidden h-[1.2em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible placeholder to reserve space */}
      <span className="invisible whitespace-nowrap">{texts.reduce((a, b) => a.length > b.length ? a : b)}</span>
    </div>
  );
}
