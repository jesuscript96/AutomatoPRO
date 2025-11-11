'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  delay = 0,
  className = ''
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 0.6, 
        delay: prefersReducedMotion ? 0 : delay,
        ease: 'easeOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

