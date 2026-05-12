'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function Setup2FAWizard() {
  const [step, setStep] = useState(1);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [manualEntryKey, setManualEntryKey] = useState('');
  const [code, setCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(''); // required to initiate setup
  const router = useRouter();

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/2fa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Failed to start setup');
      setQrCodeDataUrl(data.qrCodeDataUrl);
      setManualEntryKey(data.manualEntryKey);
      setStep(2);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Invalid code');
      setBackupCodes(data.backupCodes);
      setStep(3);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" custom={1}>
        {step === 1 && (
          <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Secure your account</h2>
              <p className="text-muted-foreground mt-2">Two-factor authentication adds an extra layer of security.</p>
            </div>
            <form onSubmit={handleStart} className="space-y-4">
              <input type="password" required placeholder="Enter current password to continue" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
              <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70">
                {loading ? 'Processing...' : 'Get started'}
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Scan the QR code</h2>
              <p className="text-muted-foreground mt-2">Open your authenticator app and scan this code.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl w-fit mx-auto border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeDataUrl} alt="QR Code" className="w-48 h-48" />
            </div>
            <div className="text-center text-sm">
              <p className="text-muted-foreground mb-1">Can&apos;t scan? Use this key:</p>
              <code className="bg-muted px-2 py-1 rounded text-foreground font-mono">{manualEntryKey}</code>
            </div>
            <form onSubmit={handleVerify} className="space-y-4 pt-4 border-t border-border">
              <p className="text-sm font-medium text-center">Verify your authenticator</p>
              <input type="text" required maxLength={6} placeholder="000000" value={code} onChange={(e) => setCode(e.target.value)} className="w-full text-center tracking-widest text-2xl py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
              <button type="submit" disabled={loading || code.length < 6} className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70">
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 text-center">
            <div>
              <h2 className="text-2xl font-bold">Save your backup codes</h2>
              <p className="text-muted-foreground mt-2">If you lose your device, you can use these to log in.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-muted p-4 rounded-xl border border-border">
              {backupCodes.map((c, i) => (
                <div key={i} className="font-mono text-sm tracking-wider text-foreground">{c}</div>
              ))}
            </div>
            <label className="flex items-start gap-3 text-left mt-4">
              <input type="checkbox" required className="mt-1 rounded border-input text-primary focus:ring-primary" />
              <span className="text-sm text-muted-foreground">I have saved my backup codes in a safe place.</span>
            </label>
            <button onClick={() => router.push('/dashboard')} className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
              Complete setup
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
