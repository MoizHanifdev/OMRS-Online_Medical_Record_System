'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "1",
      title: "Register Your Team",
      desc: "Set up roles, permissions, and security policies in minutes.",
      icon: "🏢"
    },
    {
      num: "2",
      title: "Import or Add Patients",
      desc: "Bulk import existing records or register new patients instantly.",
      icon: "👥"
    },
    {
      num: "3",
      title: "Document Care",
      desc: "Start writing notes, ordering labs, and prescribing medications.",
      icon: "✍️"
    }
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            From signup to first record in 3 minutes
          </h2>
        </div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Connecting Line Desktop */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-muted -z-10">
            <motion.div style={{ width: lineWidth }} className="h-full bg-primary" />
          </div>

          {/* Connecting Line Mobile */}
          <div className="md:hidden absolute top-[10%] bottom-[10%] left-[40px] w-[2px] bg-muted -z-10">
            <motion.div style={{ height: lineHeight }} className="w-full bg-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative flex flex-col md:items-center items-start md:text-center text-left pl-20 md:pl-0"
              >
                <div className="absolute left-0 md:relative md:left-auto md:mb-6 w-20 h-20 bg-background border-2 border-primary rounded-full flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold border-4 border-background">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 mt-4 md:mt-0">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
