'use client';

import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export function SessionTimeoutModal() {
  const { isIdle, countdown, stayLoggedIn } = useSessionTimeout();
  const { logout } = useAuth();

  return (
    <AnimatePresence>
      {isIdle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md p-6 bg-card rounded-2xl shadow-xl border border-border"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Are you still there?</h2>
            <p className="text-muted-foreground mb-6">
              You will be logged out in <span className="font-bold text-foreground">{countdown}</span> seconds for your security.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => logout()}
                className="flex-1 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted"
              >
                Log out now
              </button>
              <button
                onClick={stayLoggedIn}
                className="flex-1 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90"
              >
                Stay logged in
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
