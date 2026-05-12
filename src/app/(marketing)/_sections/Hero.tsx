'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal } from '@/components/marketing/TextReveal';
import { MagneticButton } from '@/components/marketing/MagneticButton';
import { DashboardMockup } from '@/components/marketing/DashboardMockup';
import { HeroOrbit } from '@/components/marketing/HeroOrbit';
import { ParticleField } from '@/components/marketing/ParticleField';
import { HeartbeatLine } from '@/components/marketing/HeartbeatLine';
import Link from 'next/link';

export function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const mockupRotateX = useTransform(scrollYProgress, [0, 0.2], [4, 15]);

  return (
    <section className="relative min-h-[100svh] flex flex-col pt-32 lg:pt-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none -z-20" />
      
      {/* Background radial blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <ParticleField count={30} className="absolute inset-0 -z-10 opacity-50" parallax />

      <motion.div style={{ y, opacity }} className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col items-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium relative overflow-hidden group"
          >
            <span className="relative z-10">✨ Now in private beta — request access</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent group-hover:animate-shimmer z-0" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            <TextReveal text="The Modern Operating System for Medical Records" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
          >
            Replace paper files with secure, centralized, searchable patient records. Built for doctors, nurses, and the healthcare teams of tomorrow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticButton>
              <Link href="/signup" className="px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Get Started Free
              </Link>
            </MagneticButton>
            <Link href="#demo" className="group px-6 py-4 flex items-center gap-2 text-foreground font-medium rounded-full hover:bg-muted transition-colors">
              <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium"
          >
            <span className="flex items-center gap-1.5"><span className="text-primary">🔒</span> HIPAA-ready</span>
            <span className="flex items-center gap-1.5"><span className="text-primary">🛡️</span> E2E Encryption</span>
            <span className="flex items-center gap-1.5"><span className="text-primary">⚡</span> &lt;200ms searches</span>
            <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> No CC needed</span>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 relative h-[400px] lg:h-[600px] w-full mt-8 lg:mt-0 perspective-1200">
          <HeroOrbit />
          <motion.div
            style={{ scale: mockupScale, rotateX: mockupRotateX }}
            className="absolute inset-0 flex items-center justify-center transform-gpu"
            initial={{ rotateY: -8, rotateX: 4, y: 50, opacity: 0 }}
            animate={{ y: [10, -10, 10], opacity: 1 }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1 } }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 w-full">
        <HeartbeatLine />
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
