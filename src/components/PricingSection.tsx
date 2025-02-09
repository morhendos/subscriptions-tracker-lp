'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { pricingTiers } from '@/config/pricing';
import type { PricingTier } from '@/config/pricing';

function PricingCard({ tier, isYearly }: { tier: PricingTier; isYearly: boolean }) {
  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
  const monthlyPrice = isYearly ? (tier.yearlyPrice / 12).toFixed(2) : tier.monthlyPrice;

  return (
    <Card className={cn(
      'relative flex flex-col',
      tier.popular && 'border-primary shadow-lg scale-105'
    )}>
      {tier.popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <CardHeader className="flex-1">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{tier.name}</h3>
          <p className="text-muted-foreground">{tier.description}</p>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">$</span>
            <span className="text-5xl font-bold">{Math.floor(price)}</span>
            <span className="text-xl font-semibold">.{(price % 1).toFixed(2).slice(2)}</span>
            <span className="ml-2 text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
          </div>
          {isYearly && (
            <p className="mt-1 text-sm text-muted-foreground">
              ${monthlyPrice}/month when billed annually
            </p>
          )}
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
        <Button 
          className="w-full" 
          variant={tier.popular ? 'default' : 'outline'}
        >
          {tier.ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="py-20 bg-background" id="pricing">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works best for you. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={cn(
              'text-sm font-medium',
              !isYearly && 'text-primary'
            )}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={cn(
              'text-sm font-medium',
              isYearly && 'text-primary'
            )}>
              Yearly
              <span className="ml-1.5 text-xs text-emerald-600 font-semibold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <PricingCard 
              key={tier.id} 
              tier={tier} 
              isYearly={isYearly}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
            <br />
            Need a custom plan? <a href="#" className="text-primary hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}