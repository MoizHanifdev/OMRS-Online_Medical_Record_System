'use client';

import { motion } from 'framer-motion';

export function DashboardMockup() {
  return (
    <div className="w-full max-w-3xl aspect-[16/10] bg-card rounded-2xl border border-border/50 shadow-2xl shadow-primary/10 overflow-hidden relative">
      <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto h-5 w-64 bg-background rounded-md border border-border/50 flex items-center px-2">
          <div className="w-3 h-3 rounded-full bg-primary/20 mr-2"></div>
          <div className="h-2 w-24 bg-muted-foreground/20 rounded"></div>
        </div>
      </div>
      <div className="flex h-[calc(100%-2.5rem)]">
        <div className="w-16 md:w-48 border-r border-border bg-muted/20 p-4 space-y-4">
          <div className="h-8 rounded-lg bg-primary/10 border border-primary/20 hidden md:block"></div>
          <div className="h-4 w-8 md:w-24 bg-muted rounded"></div>
          <div className="h-4 w-8 md:w-20 bg-muted rounded"></div>
          <div className="h-4 w-8 md:w-32 bg-muted rounded"></div>
        </div>
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-foreground/10 rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
            </div>
            <div className="h-8 w-24 bg-primary/90 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-muted/30 rounded-xl border border-border p-4">
              <div className="h-4 w-16 bg-muted mb-2 rounded"></div>
              <div className="h-8 w-24 bg-foreground/10 rounded"></div>
            </div>
            <div className="h-24 bg-muted/30 rounded-xl border border-border p-4">
              <div className="h-4 w-16 bg-muted mb-2 rounded"></div>
              <div className="h-8 w-16 bg-foreground/10 rounded"></div>
            </div>
            <div className="h-24 bg-muted/30 rounded-xl border border-border p-4">
              <div className="h-4 w-16 bg-muted mb-2 rounded"></div>
              <div className="h-8 w-20 bg-foreground/10 rounded"></div>
            </div>
          </div>
          <div className="h-48 bg-muted/20 rounded-xl border border-border"></div>
        </div>
      </div>
      
      {/* Overlay gradient for a bit of polish */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
    </div>
  );
}
