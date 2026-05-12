'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = 3; // Stub

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card"
          />
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
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border shadow-2xl rounded-2xl z-50 overflow-hidden origin-top-right"
            >
              <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                <h3 className="font-bold text-foreground">Notifications</h3>
                <button className="text-xs text-primary hover:underline font-medium">Mark all read</button>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-2">
                {/* Stub Items */}
                <div className="p-3 hover:bg-muted rounded-xl transition-colors cursor-pointer flex gap-3 relative">
                  <div className="w-2 h-2 bg-primary rounded-full absolute left-1 top-5" />
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    🔬
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Critical Lab Result</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">Patient John Doe Potassium 6.5 mmol/L</p>
                    <p className="text-xs text-muted-foreground mt-1">2 mins ago</p>
                  </div>
                </div>
                <div className="p-3 hover:bg-muted rounded-xl transition-colors cursor-pointer flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    📝
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Note signed</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">Dr. Smith signed the progress note</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-border text-center bg-muted/10">
                <a href="/notifications" className="text-sm font-medium text-foreground hover:text-primary transition-colors">View all notifications</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
