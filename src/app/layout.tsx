import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SchemaOrg } from "@/components/SchemaOrg";
import Header from "@/components/Header";
import {
  generateSoftwareAppSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/schema";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics"; // Changed from named import to default import
import AnalyticsPageTracker from "@/components/AnalyticsPageTracker";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

const organizationData = {
  name: "Subscriptions Tracker",
  url: "https://subscriptions-tracker.com",
  logo: "https://subscriptions-tracker.com/logo-st.svg",
  sameAs: [
    "https://twitter.com/substracker",
    "https://facebook.com/substracker",
    "https://linkedin.com/company/substracker",
  ],
};

const softwareAppSchema = generateSoftwareAppSchema({
  name: "Subscriptions Tracker",
  description:
    "Track and manage all your subscriptions in one place. Never miss a payment or lose track of your monthly expenses.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  price: "0",
  currency: "USD",
  ratingValue: 4.9,
  ratingCount: 158,
  screenshotUrls: [
    "https://subscriptions-tracker.com/screenshots/dashboard.png",
    "https://subscriptions-tracker.com/screenshots/analytics.png",
  ],
});

const websiteSchema = generateWebsiteSchema({
  name: "Subscriptions Tracker",
  description: "The smart way to manage and optimize your subscriptions",
  organization: organizationData,
});

const organizationSchema = generateOrganizationSchema(organizationData);

export const metadata: Metadata = {
  metadataBase: new URL("https://subscriptions-tracker.com"),
  title: {
    default: "Subscriptions Tracker - Smart Subscription Management",
    template: "%s | Subscriptions Tracker",
  },
  description:
    "Track and manage all your subscriptions in one place. Save money, avoid unexpected charges, and get insights into your subscription spending.",
  keywords: [
    "subscription management",
    "subscriptions tracker",
    "recurring payments",
    "subscription organizer",
    "expense tracking",
    "money saving app",
    "subscription analytics",
    "billing management",
    "personal finance",
    "budget tracking",
  ],
  authors: [{ name: "Subscriptions Tracker Team" }],
  creator: "Subscriptions Tracker",
  publisher: "Subscriptions Tracker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    title: "Subscriptions Tracker - Smart Subscription Management",
    description:
      "Track, manage and optimize your subscriptions. Save money and never miss a payment.",
    url: "https://subscriptions-tracker.com",
    siteName: "Subscriptions Tracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Subscriptions Tracker Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscriptions Tracker - Smart Subscription Management",
    description:
      "Track, manage and optimize your subscriptions. Save money and never miss a payment.",
    images: ["/og-image.png"],
    creator: "@substracker",
  },
  alternates: {
    canonical: "https://subscriptions-tracker.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0A0A1B" />
        <link rel="icon" href="/favicon.ico" />
        <SchemaOrg schema={softwareAppSchema} />
        <SchemaOrg schema={organizationSchema} />
        <SchemaOrg schema={websiteSchema} />
        {/* Analytics Scripts - these don't use client hooks so they're safe in head */}
        <Analytics 
          googleAnalyticsId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          microsoftClarityId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          
          {/* Suspense boundary for client component that uses useSearchParams */}
          <Suspense fallback={null}>
            <AnalyticsPageTracker 
              googleAnalyticsId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
            />
          </Suspense>
          
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
