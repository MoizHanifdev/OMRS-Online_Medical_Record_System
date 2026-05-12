'use client';

import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import Link from 'next/link';

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
      {children}
    </div>
  );
}

interface BentoCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  href?: string;
  children?: React.ReactNode;
}

export function BentoCard({ title, description, icon, className = '', href, children }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className={`relative group ${className}`}
    >
      <SpotlightCard className="w-full h-full flex flex-col justify-between overflow-hidden">
        <div className="relative z-10 p-6 flex flex-col h-full">
          <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center text-2xl mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
          
          {href && (
            <div className="mt-auto pt-4">
              <Link href={href} className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>
          )}
        </div>
        {children}
      </SpotlightCard>
    </motion.div>
  );
}
