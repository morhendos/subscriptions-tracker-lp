import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle, Clock, CreditCard, Bell, Wallet, ArrowRight, 
  PieChart, History, RefreshCw, Shield, Zap, Calculator,
  LineChart, BarChart3, DollarSign, Percent, Calendar, Filter,
  Smartphone, Tag, UserPlus, Trash2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features | Subscriptions Tracker",
  description:
    "Discover all the powerful features of Subscriptions Tracker that help you manage, monitor, and optimize your subscriptions",
  alternates: {
    canonical: "https://subscriptions-tracker.com/features",
  },
};

function FeatureCard({ icon, title, description }) {
  return (
    <div className="relative p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Dashboard UI mock using pure CSS/SVG instead of an image
function DashboardMock() {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl border bg-card p-4">
      <div className="bg-background rounded-lg p-4">
        {/* Mock header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-muted h-8 w-40 rounded-md"></div>
          <div className="flex space-x-3">
            <div className="bg-muted h-8 w-8 rounded-full"></div>
            <div className="bg-muted h-8 w-24 rounded-md"></div>
          </div>
        </div>
        
        {/* Mock stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-2">
              <div className="bg-muted/50 h-4 w-20 rounded-sm"></div>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">$128.45</div>
            <div className="bg-muted/30 h-3 w-32 rounded-sm mt-2"></div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-2">
              <div className="bg-muted/50 h-4 w-20 rounded-sm"></div>
              <Bell className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">4</div>
            <div className="bg-muted/30 h-3 w-32 rounded-sm mt-2"></div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-2">
              <div className="bg-muted/50 h-4 w-20 rounded-sm"></div>
              <Percent className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">22%</div>
            <div className="bg-muted/30 h-3 w-32 rounded-sm mt-2"></div>
          </div>
        </div>
        
        {/* Mock charts and tables */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-4">
              <div className="bg-muted/70 h-5 w-40 rounded-sm"></div>
              <div className="flex space-x-2">
                <div className="bg-muted/50 h-6 w-20 rounded-md"></div>
                <div className="bg-muted/50 h-6 w-6 rounded-md"></div>
              </div>
            </div>
            
            {/* Chart mockup */}
            <div className="h-60 relative">
              <div className="absolute inset-x-0 bottom-0 h-px bg-border"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-border"></div>
              
              {/* Chart bars */}
              <div className="flex justify-between items-end h-full pt-6 pb-4">
                <div className="w-8 bg-primary/20 rounded-t-sm h-[20%]"></div>
                <div className="w-8 bg-primary/30 rounded-t-sm h-[30%]"></div>
                <div className="w-8 bg-primary/40 rounded-t-sm h-[50%]"></div>
                <div className="w-8 bg-primary/50 rounded-t-sm h-[40%]"></div>
                <div className="w-8 bg-primary/60 rounded-t-sm h-[70%]"></div>
                <div className="w-8 bg-primary/70 rounded-t-sm h-[60%]"></div>
                <div className="w-8 bg-primary/80 rounded-t-sm h-[80%]"></div>
                <div className="w-8 bg-primary rounded-t-sm h-[90%]"></div>
              </div>
              
              {/* Chart labels */}
              <div className="flex justify-between mt-2">
                <div className="w-8 text-center text-xs text-muted-foreground">Jan</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Feb</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Mar</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Apr</div>
                <div className="w-8 text-center text-xs text-muted-foreground">May</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Jun</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Jul</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Aug</div>
              </div>
            </div>
          </div>
          
          {/* Upcoming renewals */}
          <div className="bg-card p-4 rounded-lg border h-full">
            <div className="bg-muted/70 h-5 w-40 rounded-sm mb-4"></div>
            
            <div className="space-y-3">
              <div className="p-2 border rounded-md flex justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 h-8 w-8 rounded-md mr-3 flex items-center justify-center">
                    <div className="bg-red-500 h-4 w-4 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="bg-muted/70 h-4 w-20 rounded-sm"></div>
                    <div className="bg-muted/40 h-3 w-14 rounded-sm mt-1"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$14.99</div>
                  <div className="text-xs text-muted-foreground">Tomorrow</div>
                </div>
              </div>
              
              <div className="p-2 border rounded-md flex justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 h-8 w-8 rounded-md mr-3 flex items-center justify-center">
                    <div className="bg-blue-500 h-4 w-4 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="bg-muted/70 h-4 w-20 rounded-sm"></div>
                    <div className="bg-muted/40 h-3 w-14 rounded-sm mt-1"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$9.99</div>
                  <div className="text-xs text-muted-foreground">in 3 days</div>
                </div>
              </div>
              
              <div className="p-2 border rounded-md flex justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 h-8 w-8 rounded-md mr-3 flex items-center justify-center">
                    <div className="bg-green-500 h-4 w-4 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="bg-muted/70 h-4 w-20 rounded-sm"></div>
                    <div className="bg-muted/40 h-3 w-14 rounded-sm mt-1"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$19.99</div>
                  <div className="text-xs text-muted-foreground">in 5 days</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="bg-muted/30 h-8 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Automated Subscription Tracking",
      description: "Automatically detect and track your subscriptions from connected accounts and email receipts."
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Renewal Alerts",
      description: "Get timely notifications before your subscriptions renew, so you never get charged unexpectedly."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Billing Cycle Management",
      description: "Track different billing cycles (monthly, annual, etc.) and see all upcoming charges in one calendar."
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Spending Analytics",
      description: "Visualize your subscription spending with detailed charts and reports by category, service, or time period."
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Cost Optimization",
      description: "Receive personalized suggestions to save money by identifying unused services and better plan options."
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Budget Planning",
      description: "Set subscription budgets and get alerts when you're approaching your spending limits."
    }
  ];

  const advancedFeatures = [
    {
      icon: <History className="h-6 w-6" />,
      title: "Price History",
      description: "Track price changes over time to identify increasing costs and evaluate service value."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Family Subscription Sharing",
      description: "Coordinate shared subscriptions among family members to eliminate duplicates and reduce costs."
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "One-Click Cancellations",
      description: "Cancel unwanted subscriptions directly through our platform with just one click."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Data Encryption",
      description: "Your financial information is protected with bank-level encryption and security protocols."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Recommendations",
      description: "Get smart recommendations for alternative services that offer better features or lower prices."
    }
  ];

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features to Manage Your Subscriptions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Take control of your recurring payments with our comprehensive toolkit designed to track, optimize, and manage all your subscriptions in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              View Pricing
            </Link>
            <Link
              href="#core-features"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="core-features" className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our essential tools help you stay on top of all your subscriptions effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview - using a code-generated UI mock instead of placeholder image */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                All Your Subscriptions in One Dashboard
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get a complete view of all your subscriptions with our intuitive dashboard. Track expenses, monitor renewal dates, and identify saving opportunities at a glance.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Visual spending breakdowns by category and service</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Calendar view of upcoming renewals and payments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Quick-action buttons for managing subscriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>Customizable views and sorting options</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take your subscription management to the next level with these powerful tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {advancedFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Subscriptions?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of users who save an average of $240 per year by optimizing their subscriptions with our tools.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-secondary h-11 px-8"
          >
            Get Started For Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
