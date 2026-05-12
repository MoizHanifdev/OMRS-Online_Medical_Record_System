'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const faqCategories = [
  "Getting Started",
  "Pricing & Billing",
  "Security & Compliance",
  "Features & Capabilities",
  "Integration & Migration",
  "Support"
];

const faqsData = [
  { category: "Security & Compliance", q: "Is OMRS HIPAA-compliant?", a: "Yes. Our architecture is designed to meet and exceed HIPAA requirements. All data is encrypted at rest and in transit, and we maintain comprehensive audit logs." },
  { category: "Security & Compliance", q: "How is my data backed up?", a: "We perform automated, encrypted backups every 24 hours. These backups are stored in geographically redundant locations to ensure data survivability in any disaster scenario." },
  { category: "Integration & Migration", q: "Can I import data from my existing system?", a: "Absolutely. We provide secure import tools for common formats (CSV, JSON, HL7) and offer white-glove migration services for Clinic and Hospital plans." },
  { category: "Features & Capabilities", q: "What's the difference between OMRS and a traditional EHR?", a: "Traditional EHRs are often bloated, slow, and hard to use. OMRS is built like a modern SaaS product—fast, intuitive, and focused on clinician workflow rather than billing codes." },
  { category: "Support", q: "Do you offer training?", a: "Yes! While OMRS is designed to be intuitive, we offer comprehensive documentation, video tutorials, and live onboarding sessions for your entire staff." },
  { category: "Pricing & Billing", q: "Can I cancel anytime?", a: "Yes, our monthly plans are entirely flexible. You can cancel at any time and export your patients' data in a standard format." },
  { category: "Getting Started", q: "How long does it take to deploy OMRS?", a: "A solo practitioner can set up their account and start documenting in under 5 minutes. Larger clinics typically complete deployment and training within 2 weeks." }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqsData.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">How can we help?</h1>
        <p className="text-xl text-muted-foreground">Search our knowledge base or browse frequently asked questions.</p>
        
        <div className="mt-8 max-w-lg mx-auto relative">
          <input 
            type="text" 
            placeholder="Search questions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-input bg-card pl-12 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
          />
          <svg className="w-5 h-5 absolute left-4 top-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === "All" ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}
          >
            All
          </button>
          {faqCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No questions found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
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
        )}

        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Link href="/contact" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
