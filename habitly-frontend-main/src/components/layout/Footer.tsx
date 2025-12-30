import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.svg" alt="Habitly Logo" width={32} height={32} />
              <span className="text-xl font-bold text-brand-900 tracking-tight">Habitly</span>
            </Link>
            <p className="text-body text-gray-600">
              Transform your life one habit at a time with the most beautiful and intuitive habit
              tracker.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="heading-small text-gray-900 mb-4">Product</h3>
            <div className="flex flex-col gap-3">
              <Link href="#features" className="text-body text-gray-600 hover:text-brand-900 transition-colors">
                Features
              </Link>
              <Link href="#screenshots" className="text-body text-gray-600 hover:text-brand-900 transition-colors">
                Screenshots
              </Link>
              <Link href="/privacy-policy" className="text-body text-gray-600 hover:text-brand-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="text-body text-gray-600 hover:text-brand-900 transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>

          {/* Download Links */}
          <div>
            <h3 className="heading-small text-gray-900 mb-4">Download</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/app/id6751553847"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.afigaliyev.habitly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
          <p className="text-body text-sm">&copy; {currentYear} Habitly. All rights reserved. Made with ❤️ for better habits.</p>
        </div>
      </div>
    </footer>
  );
}
