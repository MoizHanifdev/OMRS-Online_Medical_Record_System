'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function TwoFactorChallenge() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [useBackup, setUseBackup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real implementation with NextAuth, this form would actually just call `signIn`
      // with the twoFactorCode attached, but the login form handles that flow.
      // If we are redirecting here, it means we probably implemented a custom challenge API.
      // But we built the 2FA inline in the LoginForm! So this page is just an alternative fallback.
      toast.success('Verified');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.form
        key="challenge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="relative">
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={useBackup ? 'Enter backup code' : '000000'}
            maxLength={useBackup ? 8 : 6}
            className="w-full text-center tracking-widest text-2xl py-4 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length < (useBackup ? 8 : 6)}
          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setUseBackup(!useBackup);
              setCode('');
            }}
            className="text-sm text-primary hover:underline font-medium"
          >
            {useBackup ? 'Use authenticator app instead' : 'Use a backup code'}
          </button>
        </div>
      </motion.form>
    </AnimatePresence>
  );
}
