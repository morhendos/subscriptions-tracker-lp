'use client';

import { Card, CardContent } from './ui/card';
import { 
  CreditCard, 
  Bell, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Share2
} from 'lucide-react';

const features = [
  {
    title: 'Smart Payment Tracking',
    description: 'Never miss a payment again. Our intelligent system tracks all your subscription payments and sends timely reminders before each due date.',
    icon: CreditCard,
    details: [
      'Automatic payment detection',
      'Recurring payment tracking',
      'Payment history analysis',
      'Smart categorization'
    ]
  },
  {
    title: 'Proactive Notifications',
    description: 'Stay informed with customizable alerts for upcoming payments, price changes, and subscription renewals.',
    icon: Bell,
    details: [
      'Customizable reminder settings',
      'Price change alerts',
      'Renewal notifications',
      'Payment confirmation'
    ]
  },
  {
    title: 'Spending Analytics',
    description: 'Gain valuable insights into your subscription spending patterns with detailed analytics and visual reports.',
    icon: PieChart,
    details: [
      'Monthly spending breakdown',
      'Category-wise analysis',
      'Trend visualization',
      'Budget tracking'
    ]
  },
  {
    title: 'Cost Optimization',
    description: 'Identify opportunities to save money with our intelligent cost optimization suggestions and duplicate subscription detection.',
    icon: TrendingUp,
    details: [
      'Savings recommendations',
      'Duplicate detection',
      'Better plan suggestions',
      'Cost comparison tools'
    ]
  },
  {
    title: 'Secure Data Protection',
    description: 'Your financial data is safe with our bank-grade encryption and secure data storage practices.',
    icon: Shield,
    details: [
      'End-to-end encryption',
      'Secure data storage',
      'Regular security audits',
      'Privacy protection'
    ]
  },
  {
    title: 'Family Sharing',
    description: 'Share subscription management with family members and track shared expenses efficiently.',
    icon: Share2,
    details: [
      'Multiple user access',
      'Shared subscription tracking',
      'Cost splitting',
      'Family budget management'
    ]
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-background" id="features">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features to Manage Your Subscriptions
          </h2>
          <p className="text-xl text-muted-foreground">
            Take control of your recurring payments with our comprehensive suite of tools and features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <feature.icon className="h-6 w-6 mr-2 text-primary" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}