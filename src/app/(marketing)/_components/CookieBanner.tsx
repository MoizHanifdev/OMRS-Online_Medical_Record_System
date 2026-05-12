'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing banner slightly
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (level: 'all' | 'essential') => {
    localStorage.setItem('cookie-consent', level);
    setVisible(false);
    // Initialize analytics depending on choice
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-sm bg-card border border-border shadow-2xl rounded-2xl p-6 z-50"
        >
          <h3 className="font-semibold text-foreground mb-2">We use cookies</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We use cookies to improve your experience and analyze our traffic (using Plausible Analytics).
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleConsent('all')}
              className="flex-1 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Accept all
            </button>
            <button
              onClick={() => handleConsent('essential')}
              className="flex-1 py-2 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-muted/80 transition-colors"
            >
              Reject non-essential
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
