'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'Doctor' | 'Nurse' | 'Receptionist' | 'Lab Tech' | 'Administrator' | 'Patient';

const roleData: Record<Role, { bullet: string[], img: string }> = {
  Doctor: {
    bullet: [
      "View any patient instantly.",
      "Sign notes with a tap.",
      "Prescribe with interaction & allergy checks built in."
    ],
    img: "🩺"
  },
  Nurse: {
    bullet: [
      "Record vitals in seconds.",
      "Track medication administration.",
      "Co-author care plans with the team."
    ],
    img: "💉"
  },
  Receptionist: {
    bullet: [
      "Register patients in under a minute.",
      "Schedule and manage appointments.",
      "Conflict detection to prevent double-booking."
    ],
    img: "📅"
  },
  'Lab Tech': {
    bullet: [
      "See your queue instantly.",
      "Enter results directly into charts.",
      "Critical values alert ordering doctors automatically."
    ],
    img: "🔬"
  },
  Administrator: {
    bullet: [
      "Full oversight and population analytics.",
      "Tamper-evident audit logs.",
      "Compliance reporting at your fingertips."
    ],
    img: "📊"
  },
  Patient: {
    bullet: [
      "Your records, accessible anytime.",
      "View upcoming appointments and test results.",
      "Direct secure messaging with your care team."
    ],
    img: "📱"
  }
};

export function UseCases() {
  const roles: Role[] = Object.keys(roleData) as Role[];
  const [activeTab, setActiveTab] = useState<Role>('Doctor');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = roles.indexOf(prev);
        return roles[(idx + 1) % roles.length] ?? 'Doctor';
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, roles]);

  return (
    <section className="py-24 bg-muted/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Built for every role in healthcare
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === role ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === role && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary rounded-full -z-10" />
              )}
              {role}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border shadow-2xl rounded-3xl overflow-hidden min-h-[400px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 h-full"
            >
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-foreground mb-6">For the {activeTab}</h3>
                <ul className="space-y-4 mb-8">
                  {roleData[activeTab].bullet.map((b, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <span className="text-primary mt-1">✓</span>
                       <span className="text-muted-foreground">{b}</span>
                     </li>
                  ))}
                </ul>
                <button className="self-start px-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                  Explore {activeTab} features
                </button>
              </div>
              <div className="bg-muted/50 p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-9xl filter drop-shadow-2xl opacity-80">
                  {roleData[activeTab].img}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
