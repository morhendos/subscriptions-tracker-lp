'use client';

// ... (previous imports remain the same)

export default function PricingSection() {
  // ... (previous schema definition remains the same)

  return (
    <section className="py-20 bg-background" id="pricing">
      <SchemaOrg schema={pricingSchema} />
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            No Monthly Subscriptions. Ever.
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Tired of endless monthly payments? We get it. That's why we offer a simple choice:
            start for free or get lifetime access with a single payment.
          </p>
          <p className="text-lg text-muted-foreground">
            Join thousands who've already escaped subscription fatigue by switching to our lifetime plan.
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

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Need a custom enterprise plan?{' '}
            <a href="#" className="text-primary hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ... (rest of the component remains the same)