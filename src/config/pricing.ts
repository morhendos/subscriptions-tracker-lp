export interface PricingFeature {
  name: string;
  description?: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  popular?: boolean;
  ctaText: string;
}

export const pricingFeatures = {
  unlimitedSubscriptions: {
    name: 'Unlimited subscriptions',
    description: 'Track as many subscriptions as you want',
    included: true
  },
  emailReminders: {
    name: 'Email reminders',
    description: 'Get notified before payments and trial ends',
    included: true
  },
  spendingAnalytics: {
    name: 'Spending analytics',
    description: 'Detailed insights into your subscription costs',
    included: true
  },
  priceTracking: {
    name: 'Price increase tracking',
    description: 'Get alerted when subscription prices change',
    included: true
  },
  familySharing: {
    name: 'Family sharing',
    description: 'Share subscriptions with family members',
    included: false
  },
  customCategories: {
    name: 'Custom categories',
    description: 'Create your own subscription categories',
    included: false
  },
  budgetAlerts: {
    name: 'Budget alerts',
    description: 'Get notified when approaching budget limits',
    included: false
  },
  prioritySupport: {
    name: 'Priority support',
    description: '24/7 priority customer support',
    included: false
  },
  dataExport: {
    name: 'Data export',
    description: 'Export your data in CSV or PDF format',
    included: false
  },
  apiAccess: {
    name: 'API access',
    description: 'Access our API for custom integrations',
    included: false
  }
};

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started with subscription tracking',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      pricingFeatures.unlimitedSubscriptions,
      pricingFeatures.emailReminders,
      { ...pricingFeatures.spendingAnalytics, included: false },
      { ...pricingFeatures.priceTracking, included: false },
      { ...pricingFeatures.familySharing, included: false },
      { ...pricingFeatures.customCategories, included: false },
      { ...pricingFeatures.budgetAlerts, included: false },
      { ...pricingFeatures.prioritySupport, included: false },
      { ...pricingFeatures.dataExport, included: false },
      { ...pricingFeatures.apiAccess, included: false }
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for individuals and families',
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    popular: true,
    features: [
      pricingFeatures.unlimitedSubscriptions,
      pricingFeatures.emailReminders,
      pricingFeatures.spendingAnalytics,
      pricingFeatures.priceTracking,
      pricingFeatures.familySharing,
      pricingFeatures.customCategories,
      pricingFeatures.budgetAlerts,
      { ...pricingFeatures.prioritySupport, included: false },
      { ...pricingFeatures.dataExport, included: false },
      { ...pricingFeatures.apiAccess, included: false }
    ],
    ctaText: 'Try Pro Free'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For teams and businesses of any size',
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    features: [
      pricingFeatures.unlimitedSubscriptions,
      pricingFeatures.emailReminders,
      pricingFeatures.spendingAnalytics,
      pricingFeatures.priceTracking,
      pricingFeatures.familySharing,
      pricingFeatures.customCategories,
      pricingFeatures.budgetAlerts,
      pricingFeatures.prioritySupport,
      pricingFeatures.dataExport,
      pricingFeatures.apiAccess
    ],
    ctaText: 'Contact Sales'
  }
];