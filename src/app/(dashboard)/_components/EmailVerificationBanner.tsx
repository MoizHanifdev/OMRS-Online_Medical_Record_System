'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function EmailVerificationBanner() {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/resend-verification', { method: 'POST' });
      if (res.ok) {
        toast.success('Verification email sent! Check your inbox.');
      } else {
        const error = await res.json();
        toast.error(error.message || 'Failed to resend email');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-500/20 text-amber-600 rounded-full flex items-center justify-center font-bold">!</div>
        <div>
          <p className="text-sm font-medium text-foreground">Please verify your email address</p>
          <p className="text-xs text-muted-foreground">Check your inbox for a verification link to unlock all features.</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleResend}
          disabled={loading}
          className="text-sm font-medium text-amber-600 hover:text-amber-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Resend email'}
        </button>
        <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
