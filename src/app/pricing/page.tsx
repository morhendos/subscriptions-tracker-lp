import PricingSection from "@/components/PricingSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing for Subscriptions Tracker - Tracking subscriptions shouldn't cost you another subscription. ",
  alternates: {
    canonical: "https://subscriptions-tracker.com/pricing",
  },
};

export default function Pricing() {
  return (
    <main className="py-16 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PricingSection />
        </div>
      </div>
    </main>
  );
}
