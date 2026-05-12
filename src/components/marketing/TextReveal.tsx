'use client';

import { motion } from 'framer-motion';

export function TextReveal({ text }: { text: string }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => {
        // Apply special styling for "Medical Records" from the landing spec
        const isGradient = word === 'Medical' || word === 'Records';
        return (
          <motion.span
            variants={child}
            style={{ marginRight: '0.25em' }}
            key={index}
            className={isGradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark font-extrabold' : ''}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
