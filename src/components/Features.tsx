import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Bell, Calendar, CreditCard, PieChart, Shield, Zap } from 'lucide-react';

type FeatureCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: FeatureCard[] = [
  {
    title: 'Smart Notifications',
    description: 'Get timely reminders before your subscriptions renew, helping you avoid unwanted charges.',
    icon: <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: 'Spending Analytics',
    description: 'Visualize your subscription spending patterns and identify areas for potential savings.',
    icon: <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: 'Secure Storage',
    description: 'Your subscription data is encrypted and stored securely, protecting your sensitive information.',
    icon: <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: 'Bill Calendar',
    description: 'View all your upcoming subscription payments in a clean, organized calendar interface.',
    icon: <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: 'Quick Setup',
    description: 'Get started in minutes with our automated subscription detection and easy import tools.',
    icon: <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
  {
    title: 'Payment Tracking',
    description: 'Monitor all your subscription payments across multiple cards and accounts in one place.',
    icon: <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to manage subscriptions
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Powerful features to help you take control of your recurring expenses and save money
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-purple-100 dark:border-purple-900 hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
            >
              <CardHeader>
                <div className="mb-4 p-3 w-fit rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Additional Feature Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              More features coming soon!
            </h3>
            <p className="text-purple-100">
              We're constantly working on new features to help you better manage your subscriptions.
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
