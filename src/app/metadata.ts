import { Metadata } from 'next'

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://subscriptions-tracker.com'),
  title: {
    default: 'Subscription Tracker - Manage All Your Subscriptions in One Place',
    template: '%s | Subscription Tracker'
  },
  description: 'Never miss a payment or overpay for subscriptions again. Track, manage, and optimize all your recurring payments in one simple dashboard. Start saving money today!',
  keywords: [
    'subscription management',
    'subscription tracker',
    'recurring payments',
    'subscription organizer',
    'expense tracking',
    'money saving app',
    'subscription analytics',
    'billing management',
    'personal finance',
    'budget tracking'
  ],
  authors: [{ name: 'Subscription Tracker Team' }],
  creator: 'Subscription Tracker',
  publisher: 'Subscription Tracker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://subscriptions-tracker.com',
    siteName: 'Subscription Tracker',
    title: 'Subscription Tracker - Manage All Your Subscriptions in One Place',
    description: 'Never miss a payment or overpay for subscriptions again. Track, manage, and optimize all your recurring payments in one simple dashboard.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Subscription Tracker Dashboard'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscription Tracker - Manage All Your Subscriptions in One Place',
    description: 'Never miss a payment or overpay for subscriptions again. Track and manage all your subscriptions easily.',
    images: ['/og-image.png'],
    creator: '@substracker'
  },
  verification: {
    google: 'google-site-verification-code', // Add your Google verification code
  },
  category: 'Personal Finance'
}