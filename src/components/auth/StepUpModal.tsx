'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface StepUpModalProps {
  isOpen: boolean;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function StepUpModal({ isOpen, description, onConfirm, onCancel }: StepUpModalProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/step-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Verification failed');
      onConfirm();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md p-6 bg-card rounded-2xl shadow-xl border border-border"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Confirm your identity</h2>
            <p className="text-muted-foreground mb-6">
              To {description}, please re-enter your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="sr-only">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Confirm'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
