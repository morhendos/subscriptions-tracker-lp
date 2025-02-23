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

type ChangeType = 'feature' | 'improvement' | 'fix';

interface Change {
  type: ChangeType;
  title: string;
  description: string;
}

interface ChangelogEntryProps {
  date: string;
  version: string;
  changes: Change[];
  highlights?: string[];
}

function ChangelogEntry({ date, version, changes, highlights = [] }: ChangelogEntryProps) {
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
          type: "feature" as const,
          title: "AI-Powered Savings Recommendations",
          description: "Introduced a new AI system that analyzes your subscription usage patterns and suggests optimization opportunities that could save you money."
        },
        {
          type: "feature" as const,
          title: "Enhanced Mobile App Experience",
          description: "Completely redesigned mobile app with improved navigation, faster performance, and new quick-action gestures."
        },
        {
          type: "improvement" as const,
          title: "Category Management Updates",
          description: "Added the ability to create custom categories and sub-categories for better organization of your subscriptions."
        },
        {
          type: "improvement" as const,
          title: "Expanded Bank Integrations",
          description: "Added support for 200+ new financial institutions across Europe and Asia."
        },
        {
          type: "fix" as const,
          title: "Dashboard Loading Performance",
          description: "Resolved issues causing slow dashboard loading times for users with 50+ subscriptions."
        },
        {
          type: "fix" as const,
          title: "Notification Delivery",
          description: "Fixed a bug preventing some renewal notifications from being delivered on time."
        }
      ]
    },
    // ... rest of the changelog entries remain the same ...
  ] as const;

  return (
    <main className="pb-20">
      {/* Rest of the component remains the same */}
    </main>
  );
}