'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up' 
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 0.7, 
        delay: prefersReducedMotion ? 0 : delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}

