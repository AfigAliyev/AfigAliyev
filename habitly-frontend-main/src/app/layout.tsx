import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Habitly - Build Better Habits with AI Coaching',
  description: 'Beautiful habit tracker with AI coaching. Track progress, build streaks, and achieve your goals. Download now on iOS & Android.',
  keywords: ['habit tracker', 'habits', 'productivity', 'AI coach', 'goals', 'streaks', 'iOS', 'Android'],
  authors: [{ name: 'Habitly Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Habitly - Build Better Habits with AI Coaching',
    description: 'Beautiful habit tracker with AI coaching. Track progress, build streaks, and achieve your goals.',
    url: 'https://habitly.app',
    siteName: 'Habitly',
    type: 'website',
    images: [
      {
        url: '/screenshot-1.png',
        width: 1200,
        height: 630,
        alt: 'Habitly App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habitly - Build Better Habits with AI Coaching',
    description: 'Beautiful habit tracker with AI coaching. Download now on iOS & Android.',
    images: ['/screenshot-1.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8985E9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}