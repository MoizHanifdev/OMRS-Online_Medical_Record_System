'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Stub implementation
    setTimeout(() => {
      setStatus('success');
      toast.success('Subscribed successfully!');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <h4 className="text-sm font-medium text-foreground mb-2">Subscribe to our newsletter</h4>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 bg-background border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
        />
        {/* Honeypot field for anti-spam */}
        <input type="text" name="b_name" tabIndex={-1} className="hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-all disabled:opacity-70 whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed ✓' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
}
