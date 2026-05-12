'use client';

import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

export function Marquee({ children, speed = 40, direction = 'left', pauseOnHover = false }: MarqueeProps) {
  return (
    <div className={`flex w-full overflow-hidden ${pauseOnHover ? 'group' : ''}`}>
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-4 ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-4 ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
