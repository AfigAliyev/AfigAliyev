'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkles } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      emoji: '📊',
      title: 'Visual Progress Tracking',
      description: 'Beautiful calendar views and streak visualization to keep you motivated',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      emoji: '✨',
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations and coaching powered by advanced AI',
      gradient: 'from-brand-900 to-brand-700',
      isNew: true,
    },
    {
      emoji: '📈',
      title: 'Smart Analytics',
      description: 'Comprehensive reports and insights on your habit performance',
      gradient: 'from-purple-500 to-pink-500',
      isPremium: true,
    },
    {
      emoji: '🔥',
      title: 'Streak Tracking',
      description: 'Build momentum with visual streak counters and celebrate consistency',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      emoji: '🎨',
      title: 'Custom Habits',
      description: 'Personalize with 100+ emojis and beautiful pastel colors',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      emoji: '📅',
      title: 'Weekly Planning',
      description: 'Plan and track habits by day of week with flexible scheduling',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge icon={<Sparkles className="w-4 h-4" />} className="mb-6">
            Powerful Features
          </Badge>
          <h2 className="heading-section text-4xl md:text-5xl mb-6">
            Everything you need to build{' '}
            <span className="text-gradient">lasting habits</span>
          </h2>
          <p className="text-body-large text-lg text-gray-600">
            Designed with simplicity and effectiveness in mind, Habitly provides all the tools you
            need to transform your daily routines into powerful habits.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:-translate-y-2 hover:shadow-xl hover:shadow-brand/10 transition-all duration-300 group">
                {/* Emoji Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden`}
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)]" />
                  <span className="relative z-10">{feature.emoji}</span>
                </div>

                {/* Badges */}
                {feature.isPremium && (
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold mb-3 text-small shadow-sm">
                    Premium
                  </div>
                )}
                {feature.isNew && (
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-brand-900 to-brand-700 text-white text-xs font-semibold mb-3 text-small shadow-md">
                    NEW
                  </div>
                )}

                {/* Content */}
                <h3 className="heading-card text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-body text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
