'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const quotes = [
  "The Modern Operating System for Medical Records",
  "Centralized, Secure, Searchable Healthcare",
  "Built for the Healthcare Teams of Tomorrow"
];

export function AuthBrandPanel() {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-primary text-primary-foreground p-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/90 z-0"></div>
      
      {/* Abstract medical icons floating (stubbed for brevity) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="20" cy="30" r="15" fill="currentColor" />
          <rect x="70" y="60" width="20" height="20" fill="currentColor" />
          <path d="M40 80 L60 80 L50 60 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-20 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl">
          O
        </div>
        <span className="font-bold tracking-tight text-2xl">OMRS</span>
      </div>

      <div className="relative z-20 max-w-lg mt-auto mb-32">
        <motion.h1
          key={quoteIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold leading-tight mb-8"
        >
          {quotes[quoteIdx]}
        </motion.h1>

        <div className="space-y-2">
          <p className="text-xl font-medium text-primary-foreground/90 italic">
            &quot;Trusted by 500+ healthcare professionals&quot;
          </p>
          <p className="text-sm text-primary-foreground/70">— Dr. Sarah Jenkins, Chief of Medicine</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden z-20 opacity-30">
        <motion.svg
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="1000"
        >
          <path d="M0,50 L200,50 L250,20 L300,80 L350,50 L1000,50" />
        </motion.svg>
      </div>
    </div>
  );
}
