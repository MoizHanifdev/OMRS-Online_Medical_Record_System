'use client';

import { motion } from 'framer-motion';

const rows = [
  { aspect: 'Access speed', paper: 'Hours or days', omrs: '< 1 second' },
  { aspect: 'Risk of loss', paper: 'High (fire, flood, misplacement)', omrs: 'None (geo-redundant backups)' },
  { aspect: 'Concurrent access', paper: 'One person at a time', omrs: 'Unlimited simultaneous users' },
  { aspect: 'Search capability', paper: 'Manual file flipping', omrs: 'Instant full-text global search' },
  { aspect: 'Audit trail', paper: 'Non-existent', omrs: 'Every action cryptographically logged' },
  { aspect: 'Trend analysis', paper: 'Nearly impossible', omrs: 'Automated insights and graphs' },
  { aspect: 'Physical space required', paper: 'Entire filing rooms', omrs: 'Zero (Cloud-based)' },
  { aspect: 'Patient portal access', paper: 'Requires physical pickup', omrs: 'Self-service mobile access' }
];

export function ComparisonTable() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            The choice is clear
          </h2>
          <p className="text-xl text-muted-foreground">
            Why leading clinics are abandoning paper.
          </p>
        </div>

        <div className="border border-border rounded-3xl overflow-hidden bg-card shadow-xl">
          <div className="grid grid-cols-3 bg-muted/50 border-b border-border p-6">
            <div className="font-semibold text-muted-foreground">Aspect</div>
            <div className="font-semibold text-foreground">Paper Records</div>
            <div className="font-semibold text-primary">OMRS</div>
          </div>
          
          <div className="divide-y divide-border">
            {rows.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="grid grid-cols-3 p-6 hover:bg-muted/20 transition-colors"
              >
                <div className="font-medium flex items-center pr-4">{row.aspect}</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-red-500 shrink-0">✕</span>
                  <span>{row.paper}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <motion.span 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: idx * 0.1 + 0.3 }}
                    className="text-green-500 shrink-0"
                  >
                    ✓
                  </motion.span>
                  <span>{row.omrs}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
