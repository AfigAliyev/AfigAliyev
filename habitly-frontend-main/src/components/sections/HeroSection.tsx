'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Sparkles, Target, TrendingUp, Flame } from 'lucide-react';

export function HeroSection() {
  const floatingCards = [
    { icon: <Flame className="w-5 h-5" />, text: '226 day streak', delay: 0 },
    { icon: <Target className="w-5 h-5" />, text: '89%', delay: 0.2 },
    { icon: <TrendingUp className="w-5 h-5" />, text: 'AI Coach', delay: 0.4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 bg-gradient-to-b from-white via-purple-light/30 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(137,133,233,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(243,176,220,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge icon={<Sparkles className="w-4 h-4" />} className="mb-6">
              Transform Your Life Today
            </Badge>

            <h1 className="heading-hero text-5xl md:text-6xl lg:text-7xl mb-6">
              Build Better{' '}
              <span className="text-gradient">Habits</span>
            </h1>

            <p className="text-body-large text-xl text-gray-600 mb-8 max-w-2xl">
              The most beautiful and intuitive habit tracker with AI coaching. Track progress, stay
              motivated, and achieve your goals with elegant simplicity.
            </p>

            {/* Download Badges */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <motion.a
                href="https://apps.apple.com/app/id6751553847"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-14"
                />
              </motion.a>
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.afigaliyev.habitly"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-14"
                />
              </motion.a>
            </div>

            {/* Social Proof */}
            <p className="text-small text-sm text-gray-500">
              Join <span className="text-brand-900 font-bold">10,000+</span> users building better
              habits
            </p>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Phone Frame */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-2, 0, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <div className="w-[280px] md:w-[320px] bg-white rounded-[40px] p-2 shadow-hard border border-gray-200">
                  <Image
                    src="/screenshot-1.png"
                    alt="Habitly App Screenshot"
                    width={320}
                    height={693}
                    className="rounded-[32px] w-full h-auto"
                    priority
                  />
                </div>
              </motion.div>

              {/* Floating Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + card.delay, duration: 0.4 }}
                  className={`absolute z-20 ${
                    index === 0
                      ? 'top-12 -left-12 md:-left-16'
                      : index === 1
                      ? 'top-40 -right-8 md:-right-12'
                      : 'bottom-32 -left-8 md:-left-12'
                  }`}
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3 + index,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="bg-white rounded-2xl shadow-brand px-5 py-3 flex items-center gap-3 border border-brand-100"
                  >
                    <span className="text-brand-900">{card.icon}</span>
                    <span className="font-semibold text-gray-900 whitespace-nowrap text-sm">
                      {card.text}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
