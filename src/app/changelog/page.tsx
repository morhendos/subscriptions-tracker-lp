import type { Metadata } from "next";
import { CalendarDays, Star, CheckCircle, ArrowRight, Sparkles, Zap, BarChart, ListTodo, HelpCircle, Lock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog | Subscriptions Tracker",
  description:
    "Stay updated with the latest features, improvements, and bug fixes for Subscriptions Tracker",
  alternates: {
    canonical: "https://subscriptions-tracker.com/changelog",
  },
};

function ChangelogEntry({ date, version, changes, highlights = [] }) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6">
        <div className="md:w-1/4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="mt-2 font-semibold text-xl">
            Version {version}
          </div>
          {highlights.length > 0 && (
            <div className="mt-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-primary mb-2">
                  <Star className="h-4 w-4 fill-primary" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-3/4">
          <ul className="space-y-4">
            {changes.map((change, index) => (
              <li key={index} className="flex items-start gap-3">
                {change.type === 'feature' && <Sparkles className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />}
                {change.type === 'improvement' && <Zap className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />}
                {change.type === 'fix' && <CheckCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />}
                <div>
                  <h3 className="font-medium">{change.title}</h3>
                  <p className="text-muted-foreground">{change.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-b my-8"></div>
    </div>
  );
}

export default function ChangelogPage() {
  const changelogEntries = [
    {
      date: "February 15, 2025",
      version: "2.3.0",
      highlights: [
        "AI-powered recommendations",
        "New mobile app features"
      ],
      changes: [
        {
          type: "feature",
          title: "AI-Powered Savings Recommendations",
          description: "Introduced a new AI system that analyzes your subscription usage patterns and suggests optimization opportunities that could save you money."
        },
        {
          type: "feature",
          title: "Enhanced Mobile App Experience",
          description: "Completely redesigned mobile app with improved navigation, faster performance, and new quick-action gestures."
        },
        {
          type: "improvement",
          title: "Category Management Updates",
          description: "Added the ability to create custom categories and sub-categories for better organization of your subscriptions."
        },
        {
          type: "improvement",
          title: "Expanded Bank Integrations",
          description: "Added support for 200+ new financial institutions across Europe and Asia."
        },
        {
          type: "fix",
          title: "Dashboard Loading Performance",
          description: "Resolved issues causing slow dashboard loading times for users with 50+ subscriptions."
        },
        {
          type: "fix",
          title: "Notification Delivery",
          description: "Fixed a bug preventing some renewal notifications from being delivered on time."
        }
      ]
    },
    {
      date: "January 3, 2025",
      version: "2.2.0",
      highlights: [
        "Family plan sharing",
        "Dark mode improvements"
      ],
      changes: [
        {
          type: "feature",
          title: "Family Subscription Sharing",
          description: "New feature allowing family members to coordinate shared subscriptions, track usage, and split costs automatically."
        },
        {
          type: "feature",
          title: "Enhanced Dark Mode",
          description: "Completely redesigned dark mode with improved contrast, reduced eye strain, and automatic scheduling options."
        },
        {
          type: "improvement",
          title: "Renewal Calendar Updates",
          description: "Added monthly, quarterly, and yearly views to the renewal calendar with export options to popular calendar apps."
        },
        {
          type: "improvement",
          title: "Report Generation Speed",
          description: "Optimized the report generation system, now 3x faster for large subscription portfolios."
        },
        {
          type: "fix",
          title: "Currency Conversion Accuracy",
          description: "Fixed issues with currency conversion rates for international subscriptions."
        },
        {
          type: "fix",
          title: "Email Parser Reliability",
          description: "Improved the reliability of the email receipt parser for subscription detection."
        }
      ]
    },
    {
      date: "November 18, 2024",
      version: "2.1.0",
      highlights: [
        "Budget planning tools",
        "API improvements"
      ],
      changes: [
        {
          type: "feature",
          title: "Subscription Budget Planner",
          description: "New budgeting tools allowing you to set category-specific spending limits and receive alerts when approaching thresholds."
        },
        {
          type: "feature",
          title: "API v2 Release",
          description: "Completely redesigned API with improved performance, more endpoints, and comprehensive documentation."
        },
        {
          type: "improvement",
          title: "Dashboard Customization",
          description: "Added the ability to customize dashboard widgets, layouts, and data visualizations."
        },
        {
          type: "improvement",
          title: "Price Change Detection",
          description: "Enhanced algorithm for detecting subscription price changes and displaying historical pricing trends."
        },
        {
          type: "fix",
          title: "Account Connection Stability",
          description: "Addressed intermittent connection issues with certain banking providers."
        },
        {
          type: "fix",
          title: "CSV Import Handling",
          description: "Fixed formatting issues when importing subscription data from CSV files."
        }
      ]
    },
    {
      date: "October 5, 2024",
      version: "2.0.0",
      highlights: [
        "Major platform redesign",
        "New analytics engine"
      ],
      changes: [
        {
          type: "feature",
          title: "Complete Platform Redesign",
          description: "Entirely new user interface with improved accessibility, faster navigation, and a cleaner visual design."
        },
        {
          type: "feature",
          title: "Advanced Analytics Engine",
          description: "New analytics system providing deeper insights into spending patterns, usage trends, and saving opportunities."
        },
        {
          type: "feature",
          title: "One-Click Cancellation",
          description: "Introduced the ability to cancel subscriptions directly through our platform for supported services."
        },
        {
          type: "improvement",
          title: "Authentication System",
          description: "Enhanced security with biometric authentication options and improved session management."
        },
        {
          type: "improvement",
          title: "Data Export Options",
          description: "Added new data export formats and scheduling options for regular reports."
        },
        {
          type: "fix",
          title: "Subscription Categorization",
          description: "Improved the automatic categorization accuracy for newly detected subscriptions."
        }
      ]
    }
  ];

  return (
    <main className="pb-20">
      {/* Header Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Product Changelog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay up to date with all the latest features, improvements, and bug fixes for Subscriptions Tracker.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                Current Version: 2.3.0
              </span>
              <span className="text-sm bg-secondary/50 px-3 py-1 rounded-full">
                Released: February 15, 2025
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 border-b">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <h2 className="font-semibold">Changelog Legend:</h2>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-500" />
              <span>New Features</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span>Improvements</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-amber-500" />
              <span>Bug Fixes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          {changelogEntries.map((entry, index) => (
            <ChangelogEntry
              key={index}
              date={entry.date}
              version={entry.version}
              changes={entry.changes}
              highlights={entry.highlights}
            />
          ))}

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Looking for older updates?</p>
            <Link 
              href="/contact"
              className="inline-flex items-center text-primary hover:underline"
            >
              Contact us for historical changelog information
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto text-center max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter to get notified about new features and updates as soon as they're released.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-md"
            />
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Have Feedback?</h2>
            <p className="text-muted-foreground mb-8">
              We're constantly working to improve Subscriptions Tracker. Your feedback helps us prioritize what to build next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Submit Feedback
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Request a Feature
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
