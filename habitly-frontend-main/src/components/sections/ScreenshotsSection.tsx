'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Smartphone } from 'lucide-react';

export function ScreenshotsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const screenshots = [
    { src: '/screenshot-1.png', alt: 'Home Dashboard', label: 'Your Dashboard' },
    { src: '/screenshot-2.png', alt: 'AI Coach', label: 'AI Coach' },
    { src: '/screenshot-3.png', alt: 'Overall Progress', label: 'Overall View' },
    { src: '/screenshot-4.png', alt: 'Progress Analytics', label: 'Analytics' },
    { src: '/screenshot-5.png', alt: 'Weekly View', label: 'Weekly View' },
    { src: '/screenshot-6.png', alt: 'Habit Feedback', label: 'AI Insights' },
    { src: '/screenshot-7.png', alt: 'Habit Details', label: 'Detailed Stats' },
    { src: '/screenshot-8.png', alt: 'Create Habit', label: 'Create Habits' },
  ];

  return (
    <section id="screenshots" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge icon={<Smartphone className="w-4 h-4" />} className="mb-6">
            Beautiful Interface
          </Badge>
          <h2 className="heading-section text-4xl md:text-5xl mb-6">
            Designed for <span className="text-gradient">simplicity</span>
          </h2>
          <p className="text-body-large text-lg text-gray-600">
            Every pixel crafted with care to create an experience that's both beautiful and
            functional.
          </p>
        </motion.div>

        {/* Screenshots Carousel */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container with Scroll Snap */}
          <div className="overflow-x-auto scrollbar-hide pb-12 scroll-smooth" style={{ scrollSnapType: 'x mandatory', scrollPadding: '2rem' }}>
            <div className="flex gap-8 px-8">
              {screenshots.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex-shrink-0 group"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div className="relative">
                    {/* Phone Frame with Enhanced Glow */}
                    <div className="w-[220px] bg-white rounded-[32px] p-2 shadow-2xl border-2 border-gray-200 group-hover:border-brand-300 group-hover:shadow-brand/30 transition-all duration-300 group-hover:-translate-y-4 relative">
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-brand-500/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-full" />

                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        width={220}
                        height={477}
                        className="rounded-[24px] w-full h-auto"
                      />
                    </div>

                    {/* Enhanced Label - Appears on Hover */}
                    <div className="mt-5 text-center opacity-100 group-hover:opacity-100 transition-opacity">
                      <span className="inline-block px-4 py-2 rounded-full bg-white shadow-md text-sm font-semibold text-brand-900 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                        {screenshot.label}
                      </span>
                    </div>

                    {/* Subtle Reflection Effect */}
                    <div className="absolute -bottom-6 left-0 right-0 h-12 bg-gradient-to-b from-gray-200/40 to-transparent blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-8 md:hidden"
        >
          <p className="text-sm text-gray-500">← Scroll to see more →</p>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
