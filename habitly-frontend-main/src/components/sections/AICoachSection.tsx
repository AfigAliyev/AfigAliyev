'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BarChart3, Lightbulb, MessageCircle, Target } from 'lucide-react';

export function AICoachSection() {
  const features = [
    {
      icon: <BarChart3 className="w-5 h-5 text-white" />,
      text: 'Analyzes your progress patterns',
      gradient: 'from-yellow-400 to-orange-400',
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-white" />,
      text: 'Suggests personalized improvements',
      gradient: 'from-cyan-400 to-blue-400',
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      text: 'Chat with your AI coach anytime',
      gradient: 'from-pink-400 to-purple-400',
    },
    {
      icon: <Target className="w-5 h-5 text-white" />,
      text: 'Get actionable insights weekly',
      gradient: 'from-green-400 to-emerald-400',
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-purple overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,white,transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white order-2 lg:order-1"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6 shadow-lg">
              <span className="text-small text-sm font-semibold">✨ NEW: AI-Powered Coaching</span>
            </div>

            <h2 className="heading-section text-4xl md:text-5xl mb-6 drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)]">
              Your Personal AI Habit Coach
            </h2>

            <p className="text-body-large text-lg text-white mb-8">
              Get personalized insights and recommendations powered by advanced AI. Your coach
              learns your patterns and helps you build lasting habits.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/30 hover:border-white/50 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 group"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <span className="font-medium text-white text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - AI Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="w-[260px] md:w-[300px] bg-white/10 backdrop-blur-sm rounded-[40px] p-2 shadow-2xl border border-white/20">
                <Image
                  src="/screenshot-2.png"
                  alt="AI Coach Interface"
                  width={300}
                  height={650}
                  className="rounded-[32px] w-full h-auto"
                />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-white/20 blur-3xl rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
