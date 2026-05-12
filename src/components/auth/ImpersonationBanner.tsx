'use client';

import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export function ImpersonationBanner() {
  const { data: session } = useSession();

  // Assuming we add impersonatorId to the session object if impersonating
  const isImpersonating = !!(session as any)?.impersonatorId;

  if (!isImpersonating) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        className="bg-destructive text-destructive-foreground text-sm font-medium px-4 py-2 flex justify-between items-center"
      >
        <span>
          <strong>Admin Impersonation Mode</strong> — You are currently viewing the system as {session?.user?.name}.
        </span>
        <button
          onClick={() => {
            // Trigger API to revert session
            window.location.href = '/api/v1/auth/admin/exit-impersonation';
          }}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
        >
          Exit
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
