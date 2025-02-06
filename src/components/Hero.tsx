'use client';

import CTAButton from './CTAButton';
import Image from 'next/image';
import GradientBackground from './GradientBackground';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/config/constants';
import { 
  CheckCircle2,
  TrendingUp,
  BellRing,
  PiggyBank,
  ArrowRight
} from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle2,
    text: 'Track all subscriptions in one place',
    description: 'Centralized dashboard for all your recurring payments'
  },
  {
    icon: TrendingUp,
    text: 'Analyze spending patterns',
    description: 'Get insights into your subscription expenses'
  },
  {
    icon: BellRing,
    text: 'Never miss a payment',
    description: 'Smart notifications for upcoming charges'
  },
  {
    icon: PiggyBank,
    text: 'Save money on subscriptions',
    description: 'Identify opportunities to reduce costs'
  }
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
      <GradientBackground />

      <div className="container mx-auto px-4 py-12 text-center relative z-10">
        {/* Logo and primary heading */}
        <div className="w-full max-w-lg mx-auto mb-12">
          <Image
            src="/logo-st.svg"
            alt="Subscription Tracker - Manage Your Subscriptions Efficiently"
            width={500}
            height={180}
            priority
            className="w-full h-auto"
          />
        </div>

        {/* Main heading with semantic markup */}
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white max-w-5xl mx-auto leading-tight tracking-wide">
          The <span className="text-[#eaac2f]">smartest way</span> to manage and optimize your subscriptions
        </h1>

        {/* SEO-friendly subheading */}
        <h2 className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Take control of your recurring payments, avoid unnecessary charges, and save money with our intelligent subscription management platform.
        </h2>

        {/* Key benefits section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-background/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center"
            >
              <benefit.icon className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{benefit.text}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <CTAButton>
            <span>Start Managing Subscriptions</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </CTAButton>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • Free trial available
          </p>
        </div>

        {/* Social Proof Section */}
        <div className="space-y-4 mb-12">
          <p className="text-xl font-semibold">Trusted by thousands of users worldwide</p>
          <div className="flex justify-center items-center space-x-8">
            <span className="text-2xl font-bold text-primary">★ 4.9/5</span>
            <span className="text-muted-foreground">Based on 1000+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} text={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}