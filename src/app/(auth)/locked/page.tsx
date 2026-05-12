'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LockedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  const mins = Math.floor(countdown / 60).toString().padStart(2, '0');
  const secs = (countdown % 60).toString().padStart(2, '0');

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
      <div className="w-20 h-20 bg-red-100 text-red-600 mx-auto rounded-full flex items-center justify-center mb-6 relative">
        <svg className="w-10 h-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Account temporarily locked</h2>
      <p className="text-muted-foreground mb-6">
        Your account has been locked due to multiple failed login attempts. Please try again in:
      </p>
      <div className="text-4xl font-mono font-bold tracking-widest text-primary mb-8">
        {mins}:{secs}
      </div>
      <button className="px-6 py-2 border border-input rounded-xl font-medium hover:bg-muted transition-colors">
        Contact support
      </button>
    </motion.div>
  );
}
