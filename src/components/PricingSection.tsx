'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { pricingTiers } from '@/config/pricing';
import type { PricingTier } from '@/config/pricing';
import { SchemaOrg } from '@/components/SchemaOrg';
import { FEATURES } from '@/config/features';
import Link from 'next/link';
import ComingSoonModal from './ComingSoonModal';

function PricingCard({ tier }: { tier: PricingTier }) {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const isPremium = tier.id !== 'free';
  const isPremiumEnabled = FEATURES.PAYMENT_ENABLED;

  return (
    <Card className={cn(
      'relative flex flex-col h-full',
      tier.popular && 'border-primary shadow-lg scale-105 md:scale-110'
    )}>
      {tier.popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
            Best Value
          </span>
        </div>
      )}

      {/* Add "Coming Soon" badge for premium plans if payments aren't enabled */}
      {isPremium && !isPremiumEnabled && FEATURES.SHOW_COMING_SOON && (
        <div className="absolute top-3 right-3">
          <span className="bg-primary/20 text-primary text-xs py-1 px-2 rounded-full">
            Coming Soon
          </span>
        </div>
      )}

      <CardHeader className="flex-1">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{tier.name}</h3>
          <p className="text-muted-foreground">{tier.description}</p>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            {tier.price > 0 && <span className="text-3xl font-bold">$</span>}
            <span className="text-5xl font-bold">{tier.price}</span>
            {tier.price === 0 ? (
              <span className="ml-2 text-2xl font-medium">Forever</span>
            ) : (
              <span className="ml-2 text-xl text-muted-foreground">one-time</span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature) => (
            <li key={feature.name} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="h-5 w-5 text-primary shrink-0" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
              <div>
                <p className={cn(
                  'text-sm font-medium',
                  !feature.included && 'text-muted-foreground'
                )}>
                  {feature.name}
                </p>
                {feature.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {feature.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-6">
        {isPremium && !isPremiumEnabled ? (
          // Premium plan button - show coming soon modal
          <>
            <Button 
              className="w-full" 
              variant={tier.popular ? 'default' : 'outline'}
              size="lg"
              onClick={() => setShowComingSoonModal(true)}
            >
              {tier.ctaText}
            </Button>
            
            <ComingSoonModal 
              isOpen={showComingSoonModal}
              onClose={() => setShowComingSoonModal(false)}
              planName={tier.name}
            />
          </>
        ) : (
          // Free plan or enabled premium plan - direct link
          <Button 
            className="w-full" 
            variant={tier.popular ? 'default' : 'outline'}
            size="lg"
            asChild
          >
            <Link href={tier.actionUrl}>
              {tier.ctaText}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function PricingSection() {
  // Generate schema for pricing section
  const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Subscriptions Tracker',
    description: 'Subscription management and tracking service',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: 0,
      highPrice: 9.99,
      offerCount: pricingTiers.length,
      offers: pricingTiers.map(tier => ({
        '@type': 'Offer',
        name: tier.name,
        price: tier.price,
        priceCurrency: 'USD',
        description: tier.description
      }))
    }
  };

  return (
    <section className="py-20 bg-background" id="pricing">
      <SchemaOrg schema={pricingSchema} />
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            No Monthly Subscriptions. Ever.
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Tracking subscriptions shouldn't cost you another subscription. Pay once, own it forever – 
            because managing your monthly payments should be simple and subscription-free.
          </p>
          <p className="text-lg text-muted-foreground">
            Join thousands who've already escaped subscription fatigue with our lifetime deal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <PricingCard 
              key={tier.id} 
              tier={tier}
            />
          ))}
        </div>
      </div>
    </section>
  );
}