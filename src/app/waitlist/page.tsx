import WaitlistForm from '@/components/WaitlistForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Waitlist',
  description: 'Join the waitlist for Subscriptions Tracker premium features',
  openGraph: {
    title: 'Join the Premium Waitlist',
    description: 'Be the first to access premium features when they launch',
  },
};

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-card border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Premium Features Coming Soon
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're working hard to bring you our lifetime plan with unlimited 
            subscriptions, advanced analytics, and premium features.
          </p>
        </div>
        
        <WaitlistForm />
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Premium Features Preview
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              title="Unlimited Subscriptions" 
              description="Track as many subscriptions as you want with no limits"
            />
            <FeatureCard 
              title="Advanced Analytics" 
              description="Get detailed insights and spending trends over time"
            />
            <FeatureCard 
              title="Custom Categories" 
              description="Organize your subscriptions with personalized categories"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
