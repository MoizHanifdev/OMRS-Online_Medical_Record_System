'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    // Fire the logout immediately
    logout('/');
  }, [logout]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
      <h2 className="text-xl font-semibold text-foreground">Logging out securely...</h2>
      <p className="text-muted-foreground mt-2 text-sm">Please wait while we clear your session.</p>
    </motion.div>
  );
}
