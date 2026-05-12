'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [needs2FA, setNeeds2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShake(false);
    
    const result = await login({ email, password, rememberMe, twoFactorCode }, callbackUrl);
    
    if (result?.error) {
      setShake(true);
      if (result.error === '2FA_REQUIRED') {
        setNeeds2FA(true);
      }
      setTimeout(() => setShake(false), 500);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {!needs2FA ? (
        <motion.form
          key="credentials"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.1 } }}
          exit={{ opacity: 0, x: -50 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <div className="relative group">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background/50 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-primary peer transition-all"
                placeholder=" "
              />
              <label htmlFor="email" className="absolute left-10 top-3.5 text-muted-foreground text-sm cursor-text peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-card peer-focus:px-1 peer-focus:text-primary transition-all peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:px-1">
                Email address
              </label>
            </div>
          </motion.div>

          <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <div className="relative group">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background/50 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-primary peer transition-all"
                placeholder=" "
              />
              <label htmlFor="password" className="absolute left-10 top-3.5 text-muted-foreground text-sm cursor-text peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-card peer-focus:px-1 peer-focus:text-primary transition-all peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:px-1">
                Password
              </label>
            </div>
          </motion.div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded border-input text-primary focus:ring-primary" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : null}
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </motion.form>
      ) : (
        <motion.form
          key="2fa"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
            <p className="text-muted-foreground mt-2">Enter the 6-digit code from your authenticator app.</p>
          </div>

          <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <input
              type="text"
              required
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full text-center tracking-widest text-2xl py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </motion.div>

          <button
            type="submit"
            disabled={loading || twoFactorCode.length < 6}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70"
          >
            {loading ? 'Verifying...' : 'Verify & Sign in'}
          </button>

          <button
            type="button"
            onClick={() => setNeeds2FA(false)}
            className="w-full text-sm text-muted-foreground hover:text-foreground"
          >
            Back to login
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
