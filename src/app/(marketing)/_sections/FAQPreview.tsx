'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const faqs = [
  {
    q: "Is OMRS HIPAA-compliant?",
    a: "Yes. Our architecture is designed to meet and exceed HIPAA requirements. All data is encrypted at rest and in transit, and we maintain comprehensive audit logs."
  },
  {
    q: "How is my data backed up?",
    a: "We perform automated, encrypted backups every 24 hours. These backups are stored in geographically redundant locations to ensure data survivability in any disaster scenario."
  },
  {
    q: "Can I import data from my existing system?",
    a: "Absolutely. We provide secure import tools for common formats (CSV, JSON, HL7) and offer white-glove migration services for Clinic and Hospital plans."
  },
  {
    q: "What's the difference between OMRS and a traditional EHR?",
    a: "Traditional EHRs are often bloated, slow, and hard to use. OMRS is built like a modern SaaS product—fast, intuitive, and focused on clinician workflow rather than billing codes."
  },
  {
    q: "Do you offer training?",
    a: "Yes! While OMRS is designed to be intuitive, we offer comprehensive documentation, video tutorials, and live onboarding sessions for your entire staff."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, our monthly plans are entirely flexible. You can cancel at any time and export your patients' data in a standard format."
  }
];

export function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30 border-t border-border/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground tracking-tight mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className="font-semibold text-foreground">{faq.q}</span>
                <motion.svg
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  className="w-5 h-5 text-muted-foreground shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-0 text-muted-foreground">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/faq" className="text-primary hover:underline font-semibold">
            View full FAQ →
          </Link>
        </div>
      </div>
    </section>
  );
}
