'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function AnimatedCounter({ from, to, duration = 2, suffix = '' }: { from: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        // Keep decimals for small numbers, or round for large
        const formatted = to % 1 !== 0 ? value.toFixed(2) : Math.round(value).toString();
        node.textContent = formatted + suffix;
      }
    });

    return () => controls.stop();
  }, [from, to, duration, suffix, inView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary-foreground/20 text-center">
          
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">
              <AnimatedCounter from={0} to={40} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 font-medium">more time with patients</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">
              &lt;<AnimatedCounter from={1000} to={200} suffix="ms" />
            </div>
            <p className="text-primary-foreground/80 font-medium">avg record retrieval</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">
              <AnimatedCounter from={90} to={99.99} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 font-medium">uptime SLA guarantee</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter">
              <AnimatedCounter from={0} to={256} suffix="-bit" />
            </div>
            <p className="text-primary-foreground/80 font-medium">E2E encryption</p>
          </div>

        </div>
      </div>
    </section>
  );
}
