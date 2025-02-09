export interface PricingFeature {
  name: string;
  description?: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: PricingFeature[];
  popular?: boolean;
  ctaText: string;
}

export const pricingFeatures = {
  unlimitedSubscriptions: {
    name: 'Up to 5 subscriptions',
    description: 'Track your most important subscriptions',
    included: true
  },
  emailReminders: {
    name: 'Basic email reminders',
    description: 'Get notified before payments',
    included: true
  },
  spendingAnalytics: {
    name: 'Basic analytics',
    description: 'See your monthly spending',
    included: true
  },
  familySharing: {
    name: 'Unlimited subscriptions',
    description: 'Track as many subscriptions as you want',
    included: false
  },
  advancedAnalytics: {
    name: 'Advanced analytics',
    description: 'Detailed insights and forecasting',
    included: false
  },
  priceTracking: {
    name: 'Price increase alerts',
    description: 'Get notified of any price changes',
    included: false
  },
  customCategories: {
    name: 'Custom categories',
    description: 'Organize subscriptions your way',
    included: false
  },
  budgetAlerts: {
    name: 'Budget alerts',
    description: 'Stay within your spending limits',
    included: false
  },
  prioritySupport: {
    name: 'Priority support',
    description: '24/7 priority customer support',
    included: false
  }
};

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    features: [
      pricingFeatures.unlimitedSubscriptions,
      pricingFeatures.emailReminders,
      pricingFeatures.spendingAnalytics,
      { ...pricingFeatures.familySharing, included: false },
      { ...pricingFeatures.advancedAnalytics, included: false },
      { ...pricingFeatures.priceTracking, included: false },
      { ...pricingFeatures.customCategories, included: false },
      { ...pricingFeatures.budgetAlerts, included: false },
      { ...pricingFeatures.prioritySupport, included: false }
    ],
    ctaText: 'Get Started Free'
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    description: 'One-time payment, forever access',
    price: 49,
    popular: true,
    features: [
      { ...pricingFeatures.unlimitedSubscriptions, name: 'Unlimited subscriptions', description: 'Track as many subscriptions as you want' },
      { ...pricingFeatures.emailReminders, name: 'Advanced notifications', description: 'Email, SMS, and custom reminders' },
      pricingFeatures.spendingAnalytics,
      pricingFeatures.familySharing,
      pricingFeatures.advancedAnalytics,
      pricingFeatures.priceTracking,
      pricingFeatures.customCategories,
      pricingFeatures.budgetAlerts,
      pricingFeatures.prioritySupport
    ],
    ctaText: 'Get Lifetime Access'
  }
];