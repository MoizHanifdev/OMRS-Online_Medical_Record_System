'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export function EmailVerificationBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

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
        <button className="text-sm font-medium text-amber-600 hover:text-amber-700">Resend email</button>
        <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
