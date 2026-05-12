'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/v1/public/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        setSuccess(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">Thanks for reaching out. We&apos;ll be in touch within 24 hours.</p>
        <button onClick={() => setSuccess(false)} className="mt-8 text-primary font-medium hover:underline">Send another message</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="b_name" tabIndex={-1} className="hidden" aria-hidden="true" />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input required type="text" name="name" className="w-full px-4 py-2 border border-input rounded-lg bg-background" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input required type="email" name="email" className="w-full px-4 py-2 border border-input rounded-lg bg-background" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Organization</label>
          <input type="text" name="organization" className="w-full px-4 py-2 border border-input rounded-lg bg-background" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Topic</label>
          <select required name="topic" className="w-full px-4 py-2 border border-input rounded-lg bg-background">
            <option value="Sales">Sales & Demo</option>
            <option value="Support">Technical Support</option>
            <option value="Partnership">Partnership</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <select required name="role" className="w-full px-4 py-2 border border-input rounded-lg bg-background">
          <option value="Doctor">Physician / Doctor</option>
          <option value="Administrator">Administrator</option>
          <option value="IT">IT / Engineering</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Message</label>
        <textarea required name="message" rows={4} minLength={20} className="w-full px-4 py-2 border border-input rounded-lg bg-background resize-none" placeholder="Tell us how we can help..."></textarea>
      </div>

      <button disabled={loading} type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
