'use client';

import { motion } from 'framer-motion';

export function HeroOrbit() {
  const cards = [
    {
      id: 1,
      title: "Patient: Sarah Chen",
      subtitle: "MRN OMRS-2026-000247",
      icon: "👩",
      initialPos: { x: -40, y: -20 },
      animatePos: { x: [-40, -50, -40], y: [-20, -30, -20] },
      delay: 0,
      classes: "top-[10%] left-[-10%]"
    },
    {
      id: 2,
      title: "Vitals updated",
      subtitle: "BP 120/80 • HR 72",
      icon: "❤️",
      initialPos: { x: 30, y: 10 },
      animatePos: { x: [30, 40, 30], y: [10, 0, 10] },
      delay: 0.2,
      classes: "top-[20%] right-[-5%]"
    },
    {
      id: 3,
      title: "Lab result",
      subtitle: "HbA1c 6.8% — Normal",
      icon: "🔬",
      initialPos: { x: -20, y: 20 },
      animatePos: { x: [-20, -30, -20], y: [20, 30, 20] },
      delay: 0.4,
      classes: "bottom-[20%] left-[-5%]"
    },
    {
      id: 4,
      title: "Note signed ✓",
      subtitle: "Dr. Jenkins at 14:02",
      icon: "📝",
      initialPos: { x: 20, y: -10 },
      animatePos: { x: [20, 10, 20], y: [-10, -20, -10] },
      delay: 0.6,
      classes: "bottom-[15%] right-[-10%]"
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8, x: card.initialPos.x, y: card.initialPos.y }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: card.delay }}
          className={`absolute ${card.classes}`}
        >
          <motion.div
            animate={{ x: card.animatePos.x, y: card.animatePos.y, rotateZ: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
            className="flex items-center gap-3 p-3 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{card.title}</p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
