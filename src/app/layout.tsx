import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Subscriptions Tracker - Manage Your Subscriptions Easily',
  description: 'Track and manage all your subscriptions in one place. Never miss a payment or lose track of your monthly expenses.',
  keywords: 'subscription management, subscription tracker, subscription analytics, recurring payments',
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
