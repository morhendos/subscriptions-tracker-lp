import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Lock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations | Subscriptions Tracker",
  description:
    "Connect Subscriptions Tracker with your favorite services and financial accounts for seamless subscription management",
  alternates: {
    canonical: "https://subscriptions-tracker.com/integrations",
  },
};

function IntegrationCard({ name, icon, description, categories }) {
  return (
    <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-lg overflow-hidden bg-background flex items-center justify-center">
          <Image 
            src={`/placeholder.svg`} 
            alt={`${name} logo`} 
            width={48} 
            height={48} 
            className="h-8 w-8 object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <span key={index} className="text-xs px-2 py-1 bg-secondary rounded-full">
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const financialIntegrations = [
    {
      name: "Bank of America",
      description: "Connect your Bank of America accounts to automatically track subscription charges.",
      categories: ["Banking", "Credit Cards", "Financial"]
    },
    {
      name: "Chase",
      description: "Integrate with Chase bank accounts and credit cards for automated subscription detection.",
      categories: ["Banking", "Credit Cards", "Financial"]
    },
    {
      name: "American Express",
      description: "Track subscription payments made with your American Express cards.",
      categories: ["Credit Cards", "Financial"]
    },
    {
      name: "Citibank",
      description: "Connect your Citibank accounts to monitor recurring charges and subscriptions.",
      categories: ["Banking", "Credit Cards", "Financial"]
    },
    {
      name: "Wells Fargo",
      description: "Link your Wells Fargo accounts for comprehensive subscription tracking.",
      categories: ["Banking", "Credit Cards", "Financial"]
    },
    {
      name: "Capital One",
      description: "Monitor and manage subscriptions charged to your Capital One accounts.",
      categories: ["Banking", "Credit Cards", "Financial"]
    }
  ];

  const emailIntegrations = [
    {
      name: "Gmail",
      description: "Scan receipt emails in your Gmail account to automatically detect subscriptions.",
      categories: ["Email", "Receipts"]
    },
    {
      name: "Outlook",
      description: "Connect your Outlook email to find and track subscription confirmations and receipts.",
      categories: ["Email", "Receipts", "Microsoft"]
    },
    {
      name: "Yahoo Mail",
      description: "Link your Yahoo Mail account to capture subscription information from your inbox.",
      categories: ["Email", "Receipts"]
    }
  ];

  const serviceIntegrations = [
    {
      name: "Spotify",
      description: "Directly connect to your Spotify account to track your subscription details.",
      categories: ["Entertainment", "Music"]
    },
    {
      name: "Netflix",
      description: "Monitor your Netflix subscription plan, billing dates, and payment history.",
      categories: ["Entertainment", "Streaming"]
    },
    {
      name: "Amazon Prime",
      description: "Track your Amazon Prime membership and additional Amazon subscriptions.",
      categories: ["Shopping", "Entertainment", "Streaming"]
    },
    {
      name: "Apple",
      description: "Connect to Apple services to track App Store subscriptions, Apple Music, iCloud, and more.",
      categories: ["App Store", "Entertainment", "Cloud Storage"]
    },
    {
      name: "Google",
      description: "Track Google One, YouTube Premium, and other Google subscription services.",
      categories: ["Entertainment", "Cloud Storage", "Productivity"]
    },
    {
      name: "Microsoft 365",
      description: "Monitor your Microsoft 365 subscription status, billing, and renewal dates.",
      categories: ["Productivity", "Software", "Cloud Storage"]
    }
  ];

  const paymentIntegrations = [
    {
      name: "PayPal",
      description: "Connect your PayPal account to track recurring payments and subscriptions.",
      categories: ["Payments", "Financial"]
    },
    {
      name: "Venmo",
      description: "Monitor recurring Venmo payments for subscription services.",
      categories: ["Payments", "Financial"]
    },
    {
      name: "Stripe",
      description: "Track subscription payments processed through Stripe.",
      categories: ["Payments", "Financial"]
    }
  ];

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connect All Your Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Subscriptions Tracker integrates with your financial accounts, email, and popular subscription services for a seamless tracking experience.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Start Connecting
          </Link>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-10 border-b">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <p className="font-medium">Bank-level security encryption</p>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-8 w-8 text-primary" />
              <p className="font-medium">Read-only access to your accounts</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-primary" />
              <p className="font-medium">SOC 2 Type II Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Integrations */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Financial Institutions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Connect your bank accounts and credit cards to automatically detect and track subscription charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financialIntegrations.map((integration, index) => (
              <IntegrationCard
                key={index}
                name={integration.name}
                icon="/placeholder.svg"
                description={integration.description}
                categories={integration.categories}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              And 10,000+ more financial institutions worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Email Integrations */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Email Providers</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Connect your email accounts to automatically detect subscription confirmations and receipts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {emailIntegrations.map((integration, index) => (
              <IntegrationCard
                key={index}
                name={integration.name}
                icon="/placeholder.svg"
                description={integration.description}
                categories={integration.categories}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Integrations */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Providers</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Connect directly to popular subscription services for detailed tracking information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceIntegrations.map((integration, index) => (
              <IntegrationCard
                key={index}
                name={integration.name}
                icon="/placeholder.svg"
                description={integration.description}
                categories={integration.categories}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Payment Providers */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Payment Providers</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Connect your payment platforms to capture subscription payments made outside traditional banking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentIntegrations.map((integration, index) => (
              <IntegrationCard
                key={index}
                name={integration.name}
                icon="/placeholder.svg"
                description={integration.description}
                categories={integration.categories}
              />
            ))}
          </div>
        </div>
      </section>

      {/* API/Developer Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Developer API
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Build custom integrations with our comprehensive API. Connect your own services or extend Subscriptions Tracker's functionality.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>RESTful API with comprehensive documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Webhook support for real-time updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>SDKs for popular programming languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>OAuth 2.0 authentication</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Contact us for API access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="lg:w-1/2 bg-black/5 p-8 rounded-xl">
              <pre className="text-sm overflow-x-auto">
                <code className="language-json">
{`// Example API response
{
  "subscriptions": [
    {
      "id": "sub_12345",
      "service": "Netflix",
      "plan": "Premium",
      "price": 19.99,
      "currency": "USD",
      "billing_cycle": "monthly",
      "next_charge_date": "2025-03-15",
      "payment_method": {
        "type": "credit_card",
        "last_four": "4321",
        "provider": "Visa"
      },
      "status": "active"
    }
  ]
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Connect Your Services?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Start tracking all your subscriptions automatically by connecting your accounts and services.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-accent h-11 px-8"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
