'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function EmailVerificationBanner() {
  const { user, isEmailVerified } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [coolingDown, setCoolingDown] = useState(false);

  useEffect(() => {
    if (user && !isEmailVerified) {
      const dismissed = sessionStorage.getItem('emailBannerDismissed');
      if (!dismissed) setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user, isEmailVerified]);

  const handleResend = async () => {
    if (coolingDown) return;
    setCoolingDown(true);
    try {
      const res = await fetch('/api/v1/auth/resend-verification', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Failed to resend');
      toast.success('Verification email sent');
    } catch (err: any) {
      toast.error(err.message);
    }
    setTimeout(() => setCoolingDown(false), 60000);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('emailBannerDismissed', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-900"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Please verify your email address. Some features are limited.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleResend}
                disabled={coolingDown}
                className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 disabled:opacity-50"
              >
                {coolingDown ? 'Wait 60s' : 'Resend email'}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
              >
                Refresh
              </button>
              <button onClick={handleDismiss} className="ml-2 text-amber-500 hover:text-amber-600 dark:hover:text-amber-400">
                <span className="sr-only">Dismiss</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
