'use client';

import { Card, CardContent } from '@/components/ui/card';

function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Track Everything</h3>
              <p className="text-muted-foreground">
                Monitor all your subscriptions in one place, from streaming services to gym memberships.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-muted-foreground">
                Never miss a payment or free trial end with automated notifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Cost Analytics</h3>
              <p className="text-muted-foreground">
                Get insights into your spending patterns and find opportunities to save.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Features;