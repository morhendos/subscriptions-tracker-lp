import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Target, Heart, Lightbulb, Shield, Library } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Subscriptions Tracker",
  description:
    "Learn about Subscriptions Tracker's mission, team, and the story behind our subscription management platform",
  alternates: {
    canonical: "https://subscriptions-tracker.com/about",
  },
};

function TeamMember({ name, role, image, bio }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-primary/10">
        <Image 
          src={image} 
          alt={name} 
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
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

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      bio: "Former fintech executive who founded Subscriptions Tracker after struggling to manage his own 30+ subscriptions."
    },
    {
      name: "Sarah Johnson",
      role: "Chief Product Officer",
      image: "/placeholder.svg",
      bio: "Product visionary with 12+ years experience building consumer-focused financial tools at leading tech companies."
    },
    {
      name: "Miguel Rodriguez",
      role: "CTO",
      image: "/placeholder.svg",
      bio: "Engineering leader specializing in financial data systems with previous leadership roles at major financial institutions."
    },
    {
      name: "Leila Patel",
      role: "Head of Design",
      image: "/placeholder.svg",
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
              <div className="rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg"
                  alt="Subscriptions Tracker team working"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">250K+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$60M+</div>
              <p className="text-muted-foreground">Annual Subscription Spend Tracked</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$15M+</div>
              <p className="text-muted-foreground">Saved by Our Users</p>
            </div>
            <div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
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

          <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
            <Image src="/placeholder.svg" alt="Investor logo" width={120} height={40} />
            <Image src="/placeholder.svg" alt="Investor logo" width={120} height={40} />
            <Image src="/placeholder.svg" alt="Investor logo" width={120} height={40} />
            <Image src="/placeholder.svg" alt="Investor logo" width={120} height={40} />
            <Image src="/placeholder.svg" alt="Investor logo" width={120} height={40} />
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
