'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { getRoutePreset } from './RoutePresets';
import { ReactNode, useEffect, useState } from 'react';

export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const preset = getRoutePreset(pathname || '/');

  if (reducedMotion) {
    return <div key={pathname}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={preset.transition}
        className="h-full flex flex-col min-h-0 min-w-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
