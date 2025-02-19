import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Target, Heart, Lightbulb, Shield, Library, ChevronRight, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Subscriptions Tracker",
  description:
    "Learn about Subscriptions Tracker's mission, team, and the story behind our subscription management platform",
  alternates: {
    canonical: "https://subscriptions-tracker.com/about",
  },
};

// Team member component without image
function TeamMember({ name, role, bio }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="flex flex-col items-center text-center bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-semibold mb-4">
        {initials}
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{role}</p>
      <p className="text-sm">{bio}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Visual element to replace team image
function StoryVisual() {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/5 to-primary/20 p-8 aspect-video flex items-center justify-center relative">
      <div className="absolute w-40 h-40 rounded-full bg-primary/10 top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-60 h-60 rounded-full bg-primary/10 bottom-0 right-0 transform translate-x-1/2 translate-y-1/2" />
      
      <div className="text-center relative z-10 max-w-md">
        <div className="inline-block p-4 bg-card shadow-lg rounded-lg mb-6">
          <svg width="120" height="60" viewBox="0 0 120 60" className="mx-auto">
            <rect x="10" y="10" width="100" height="40" rx="4" fill="#e2e8f0" />
            <circle cx="30" cy="30" r="10" fill="#94a3b8" />
            <rect x="50" y="20" width="50" height="5" rx="2" fill="#94a3b8" />
            <rect x="50" y="30" width="40" height="5" rx="2" fill="#94a3b8" />
            <rect x="50" y="40" width="30" height="5" rx="2" fill="#94a3b8" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Our Journey</h3>
        <p className="text-primary mb-4">From idea to 250,000+ users</p>
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
            2023
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mx-4">
            2025
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary ml-4">
            Future
          </div>
        </div>
      </div>
    </div>
  );
}

// Investor logo component without images
function InvestorLogo({ name }) {
  return (
    <div className="w-36 h-16 bg-muted rounded-md flex items-center justify-center border">
      <Building className="h-5 w-5 text-muted-foreground mr-2" />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former fintech executive who founded Subscriptions Tracker after struggling to manage his own 30+ subscriptions."
    },
    {
      name: "Sarah Johnson",
      role: "Chief Product Officer",
      bio: "Product visionary with 12+ years experience building consumer-focused financial tools at leading tech companies."
    },
    {
      name: "Miguel Rodriguez",
      role: "CTO",
      bio: "Engineering leader specializing in financial data systems with previous leadership roles at major financial institutions."
    },
    {
      name: "Leila Patel",
      role: "Head of Design",
      bio: "Award-winning UX designer focused on creating intuitive interfaces for complex financial products."
    }
  ];

  const companyValues = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Customer First",
      description: "We build everything with our users' needs at the center, constantly seeking feedback to improve."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security & Privacy",
      description: "We treat your financial data with the highest standards of security and privacy protection."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Clarity & Simplicity",
      description: "We make the complex simple, offering clear insights without unnecessary complications."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Continuous Innovation",
      description: "We constantly push boundaries to find better ways to help you manage your financial life."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Financial Wellbeing",
      description: "We're committed to improving financial health by helping people make informed decisions."
    },
    {
      icon: <Library className="h-6 w-6" />,
      title: "Transparency",
      description: "We believe in being open and honest about our product, pricing, and how we use your data."
    }
  ];

  const investors = [
    "Sequoia Capital", 
    "Andreessen Horowitz", 
    "Y Combinator", 
    "Accel Partners",
    "Union Square"
  ];

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Mission: Financial Clarity Through Subscription Management
            </h1>
            <p className="text-xl text-muted-foreground">
              We're working to help millions of people take control of their subscription spending, eliminate waste, and make more informed financial decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Subscriptions Tracker began in 2023 when our founder, Alex Chen, realized he was spending over $400 monthly on subscriptions he barely used. After searching for a solution and finding nothing comprehensive enough, he decided to build one.
                </p>
                <p>
                  What started as a personal project quickly gained attention as Alex discovered that millions of people share the same challenge: managing an ever-growing number of subscriptions across dozens of services.
                </p>
                <p>
                  With the rise of subscription-based business models across industries, from entertainment to productivity tools, we saw an opportunity to create a platform that brings clarity to this increasingly complex aspect of personal finance.
                </p>
                <p>
                  Today, Subscriptions Tracker helps over 250,000 users manage more than $50 million in annual subscription spending, with the average user saving $240 per year by identifying unused or overpriced services.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <StoryVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-card rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">250K+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">$60M+</div>
              <p className="text-muted-foreground">Annual Subscription Spend Tracked</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">$15M+</div>
              <p className="text-muted-foreground">Saved by Our Users</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a diverse team of finance experts, engineers, and designers passionate about helping people take control of their financial lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/careers" 
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              Join our growing team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at Subscriptions Tracker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Backed By</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're proud to be supported by leading investors who share our vision.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 items-center">
            {investors.map((investor, index) => (
              <InvestorLogo key={index} name={investor} />
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">In The Press</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what others are saying about Subscriptions Tracker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="p-6 bg-card rounded-xl border">
              <p className="italic mb-4">"Subscriptions Tracker is the financial tool we didn't know we needed in the subscription economy."</p>
              <footer className="font-semibold">- TechCrunch</footer>
            </blockquote>
            <blockquote className="p-6 bg-card rounded-xl border">
              <p className="italic mb-4">"A must-have app for anyone looking to regain control of their subscription spending."</p>
              <footer className="font-semibold">- Wall Street Journal</footer>
            </blockquote>
            <blockquote className="p-6 bg-card rounded-xl border">
              <p className="italic mb-4">"This innovative platform is helping users save hundreds annually on unused subscriptions."</p>
              <footer className="font-semibold">- Forbes</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Subscriptions?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join 250,000+ users who are saving money and gaining clarity on their subscription spending.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Get Started For Free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
