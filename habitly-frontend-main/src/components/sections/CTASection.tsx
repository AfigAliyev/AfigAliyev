'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section id="download" className="relative py-24 bg-gradient-purple overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,white,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,white,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,white,transparent_60%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-hero text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Start building better habits today
          </h2>

          <p className="text-body-large text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have already transformed their lives with Habitly. Your
            future self will thank you.
          </p>

          {/* Download Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://apps.apple.com/app/id6751553847"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-16"
              />
            </motion.a>
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.afigaliyev.habitly"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-16"
              />
            </motion.a>
          </div>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-small mt-8 text-white/80 text-sm"
          >
            Available on iOS and Android • Free to download • Premium features available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
