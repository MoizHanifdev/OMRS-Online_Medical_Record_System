'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { PasswordStrengthMeter } from '../_components/PasswordStrengthMeter';
import { PasswordPolicyChecklist } from '../_components/PasswordPolicyChecklist';
import { validatePasswordPolicy } from '@/auth/password-policy';
import Link from 'next/link';

export function SignupWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', phone: '',
    dateOfBirth: '', gender: 'PREFER_NOT_TO_SAY',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { signup } = useAuth();

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1) {
      const errs = validatePasswordPolicy(formData.password, { email: formData.email });
      if (formData.password !== formData.confirmPassword) errs.push('Passwords do not match');
      if (errs.length > 0) {
        setErrors(errs);
        return;
      }
      setErrors([]);
      setStep(2);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signup(formData);
    setLoading(false);
    if (res.ok) {
      setStep(3); // Go to email verify step
    }
  };

  const slideVariants = {
    initial: (direction: number) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
    animate: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction < 0 ? 50 : -50 })
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={1}>
        {step === 1 && (
          <motion.div key="step1" custom={1} variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Create Account</h2>
              <p className="text-muted-foreground mt-1">Start your journey with OMRS</p>
            </div>
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <input type="email" required placeholder="Email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <input type="password" required placeholder="Password" value={formData.password} onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors(validatePasswordPolicy(e.target.value, { email: formData.email }));
                }} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
                <PasswordStrengthMeter password={formData.password} />
                <PasswordPolicyChecklist password={formData.password} errors={errors} />
              </div>
              <div>
                <input type="password" required placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
              </div>
              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
                Continue
              </button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account? <Link href="/login" className="text-primary font-medium">Sign in</Link>
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" custom={1} variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Personal Info</h2>
              <p className="text-muted-foreground mt-1">Tell us a bit about yourself</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="flex gap-4">
                <input type="text" required placeholder="First name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
                <input type="text" required placeholder="Last name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <input type="tel" placeholder="Phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <input type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-input font-semibold rounded-xl hover:bg-muted transition-all">
                  Back
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70">
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" custom={1} variants={slideVariants} initial="initial" animate="animate" exit="exit" className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Check your inbox</h2>
              <p className="text-muted-foreground mt-2">
                We sent a verification link to <br /><span className="font-semibold text-foreground">{formData.email}</span>
              </p>
            </div>
            <Link href="/dashboard" className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
              Go to Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
