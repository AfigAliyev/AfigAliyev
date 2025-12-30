/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F3F3FD',
          100: '#E7E7FB',
          200: '#DCDAF8',
          300: '#D0CEF6',
          400: '#C4C2F4',
          500: '#B8B6F2',
          600: '#ACAAF0',
          700: '#A19DED',
          800: '#9591EB',
          900: '#8985E9',  // Primary brand purple
        },
        secondary: {
          500: '#F3B0DC',
          900: '#EB7BC4',  // Secondary pink
        },
        purple: {
          light: '#F6F5FD',  // Background purple
        },
        pastel: {
          red: '#FFCCCC',
          pink: '#FF99CC',
          peach: '#FFCC99',
          yellow: '#FFFFCC',
          green: '#CCFFCC',
          mint: '#99FFCC',
          cyan: '#CCFFFF',
          blue: '#99CCFF',
          lavender: '#CCCCFF',
          purple: '#CC99FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'habitly': '20px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'hard': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'brand': '0 8px 32px rgba(137, 133, 233, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}