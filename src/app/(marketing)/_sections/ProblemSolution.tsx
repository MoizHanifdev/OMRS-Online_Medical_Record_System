'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !leftColRef.current) return;
    
    // Pin the left column while the right column scrolls
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top+=100",
      end: "bottom bottom",
      pin: leftColRef.current,
      pinSpacing: false,
    });

    return () => trigger.kill();
  }, []);

  const steps = [
    {
      title: "The Problem",
      desc: "Healthcare drowns in paper. Records get lost. Time gets wasted. Patients suffer.",
    },
    {
      title: "The Cost",
      desc: "Doctors spend up to 40% of their day searching for patient information.",
    },
    {
      title: "The Solution",
      desc: "OMRS centralizes every record, every test, every prescription — instantly accessible, fully secure.",
    },
    {
      title: "The Result",
      desc: "More time with patients. Fewer errors. Better outcomes.",
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-16 relative items-start">
        {/* Left pinned column */}
        <div ref={leftColRef} className="hidden lg:flex h-[500px] flex-col justify-center sticky top-[100px]">
          <div className="relative w-full h-full bg-card rounded-3xl border border-border overflow-hidden p-8 shadow-2xl flex items-center justify-center">
            {/* Morphing Illustration Placeholder */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-48 h-48 mx-auto bg-muted/50 rounded-full flex items-center justify-center text-4xl mb-6">
                📄 ➡️ 💻
              </div>
              <h3 className="text-xl font-bold text-foreground">From Chaos to Clarity</h3>
            </motion.div>
          </div>
        </div>

        {/* Right scrolling column */}
        <div className="space-y-[40vh] py-[20vh]">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-20% 0px -20% 0px", once: false }}
              transition={{ duration: 0.6 }}
              className="bg-background/80 backdrop-blur-sm p-8 rounded-2xl border border-border shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold mb-6">
                0{idx + 1}
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">{step.title}</h3>
              <p className="text-xl text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
