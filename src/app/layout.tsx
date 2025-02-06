import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://subscriptions-tracker.com'),
  title: 'Subscriptions Tracker - Manage Your Subscriptions Easily',
  description: 'Track and manage all your subscriptions in one place. Never miss a payment or lose track of your monthly expenses.',
  keywords: 'subscription management, subscription tracker, subscription analytics, recurring payments, budget tracking, expense management',
  openGraph: {
    type: 'website',
    title: 'Subscriptions Tracker - Smart Subscription Management',
    description: 'Track, manage and optimize your subscriptions. Save money and never miss a payment.',
    images: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscriptions Tracker',
    description: 'Smart subscription management made easy',
    images: '/og-image.png',
  },
  alternates: {
    canonical: 'https://subscriptions-tracker.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        <meta name="theme-color" content="#0A0A1B" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Subscriptions Tracker",
              "applicationCategory": "FinanceApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Track and manage all your subscriptions in one place",
              "operatingSystem": "Web"
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}