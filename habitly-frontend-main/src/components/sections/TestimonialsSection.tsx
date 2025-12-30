'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MessageCircle, Star, BadgeCheck } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      text: "The AI coach is a game-changer! It analyzes my patterns and gives me personalized suggestions that actually work. It's like having a personal productivity coach in my pocket.",
      author: 'Sarah Chen',
      title: 'Product Designer',
      avatar: 'S',
      color: 'bg-brand-900',
    },
    {
      rating: 5,
      text: "I've tried dozens of habit trackers, but Habitly's streak tracking and beautiful interface keep me coming back every day. 200+ day streak and counting!",
      author: 'Marcus Johnson',
      title: 'Entrepreneur',
      avatar: 'M',
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
    },
    {
      rating: 5,
      text: "The AI insights help me understand WHY I'm succeeding or struggling with certain habits. Combined with the gorgeous design, it's the only habit tracker I actually enjoy using.",
      author: 'Emily Rodriguez',
      title: 'Software Engineer',
      avatar: 'E',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge icon={<MessageCircle className="w-4 h-4" />} className="mb-6">
            What Users Say
          </Badge>
          <h2 className="heading-section text-4xl md:text-5xl mb-6">
            Loved by <span className="text-gradient">thousands</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full flex flex-col hover:-translate-y-2 hover:shadow-xl hover:shadow-brand/10 transition-all duration-300 relative overflow-hidden group">
                {/* Subtle background gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-100 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity" />

                {/* Animated Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <p className="text-body text-gray-700 mb-6 flex-grow relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-lg shadow-lg`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="heading-small text-gray-900 flex items-center gap-1.5">
                      {testimonial.author}
                      <BadgeCheck className="w-5 h-5 text-white fill-blue-500 flex-shrink-0" />
                    </div>
                    <div className="text-body text-sm text-gray-600">{testimonial.title}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
