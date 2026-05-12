'use client';

import { motion } from 'framer-motion';

export function SecurityCompliance() {
  const features = [
    { icon: '🔒', text: 'End-to-end AES-256-GCM encryption' },
    { icon: '🛡️', text: 'HIPAA-ready architecture' },
    { icon: '📋', text: 'Tamper-evident audit trail' },
    { icon: '🔐', text: 'Multi-factor authentication (TOTP + Passkeys)' },
    { icon: '🌍', text: 'GDPR-compliant data residency options' },
    { icon: '🔄', text: 'Daily encrypted backups' },
    { icon: '👤', text: 'Role-based access control' },
    { icon: '🚨', text: 'Real-time anomaly detection' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Healthcare-grade security by default
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your patients trust you with their lives. We help you keep that trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border"
              >
                <span className="text-2xl">{f.icon}</span>
                <span className="font-medium text-foreground">{f.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="relative h-[500px] bg-card rounded-3xl border border-border flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(var(--primary),0.3)]">
                <motion.svg 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </motion.svg>
              </div>
              
              {/* Data streams animation */}
              <div className="flex gap-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    className="w-2 h-16 bg-primary/50 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="px-6 py-3 bg-card border border-border rounded-xl font-bold text-foreground shadow-sm">HIPAA Ready</div>
          <div className="px-6 py-3 bg-card border border-border rounded-xl font-bold text-foreground shadow-sm opacity-60">SOC 2 Type II <span className="text-xs font-normal ml-1">(Q2 2026)</span></div>
          <div className="px-6 py-3 bg-card border border-border rounded-xl font-bold text-foreground shadow-sm opacity-60">ISO 27001 <span className="text-xs font-normal ml-1">(Q3 2026)</span></div>
          <div className="px-6 py-3 bg-card border border-border rounded-xl font-bold text-foreground shadow-sm">GDPR Compliant</div>
        </div>
      </div>
    </section>
  );
}
