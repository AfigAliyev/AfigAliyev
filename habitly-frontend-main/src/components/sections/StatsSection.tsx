'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Star, TrendingUp, Globe } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  suffix?: string;
  label: string;
  delay: number;
}

function AnimatedStat({ icon, value, suffix = '', label, delay }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  const targetNumber = parseInt(value.replace(/[^0-9]/g, ''));
  const hasDecimal = value.includes('.');
  const targetDecimal = hasDecimal ? parseFloat(value) : 0;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = hasDecimal ? targetDecimal / steps : targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= (hasDecimal ? targetDecimal : targetNumber)) {
        setCount(hasDecimal ? targetDecimal : targetNumber);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, targetNumber, targetDecimal, hasDecimal]);

  const displayValue = hasDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-900 mb-4">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-brand-900 mb-2 tracking-tight">
        {displayValue}
        {suffix}
      </div>
      <div className="heading-small text-gray-600">{label}</div>
    </motion.div>
  );
}

export function StatsSection() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '10000',
      suffix: '+',
      label: 'Active Users',
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: '4.8',
      suffix: '★',
      label: 'App Store Rating',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '1000000',
      suffix: '+',
      label: 'Habits Tracked',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: '50',
      suffix: '+',
      label: 'Countries',
    },
  ];

  return (
    <section className="py-20 bg-purple-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
