'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function UserMenu() {
  const { user } = useUser();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 border border-border rounded-full hover:bg-muted transition-colors focus:outline-none"
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            {initials}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 z-50 bg-card border border-border rounded-xl shadow-lg py-1 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                <div className="mt-1 px-2 py-0.5 w-fit rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-wider">
                  {user.role}
                </div>
              </div>

              <div className="py-1">
                <Link href="/settings/profile" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                  Profile
                </Link>
                <Link href="/settings/security" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                  Security
                </Link>
                <Link href="/settings/notifications" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                  Notifications
                </Link>
              </div>

              <div className="border-t border-border py-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted"
                >
                  Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
