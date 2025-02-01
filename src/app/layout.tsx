import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Subscriptions Tracker - Manage Your Subscriptions Easily',
  description: 'Track and manage all your subscriptions in one place. Never miss a payment or lose track of your monthly expenses.',
  keywords: 'subscription management, subscription tracker, subscription analytics, recurring payments',
  openGraph: {
    title: 'Subscriptions Tracker - Manage Your Subscriptions Easily',
    description: 'Track and manage all your subscriptions in one place. Never miss a payment or lose track of your monthly expenses.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Subscriptions Tracker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscriptions Tracker - Manage Your Subscriptions Easily',
    description: 'Track and manage all your subscriptions in one place. Never miss a payment or lose track of your monthly expenses.',
  },
  verification: {
    google: 'google-site-verification-code', // You'll need to replace this with your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://subscriptions-tracker.com" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Subscriptions Tracker",
              "applicationCategory": "FinanceApplication",
              "description": "Track and manage all your subscriptions in one place. Never miss a payment or lose track of your monthly expenses.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
