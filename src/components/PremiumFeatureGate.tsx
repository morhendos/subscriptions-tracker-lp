'use client';

import React from 'react';
import Link from 'next/link';
import { APP_URL } from '@/config/constants';
import { FEATURES } from '@/config/features';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface PremiumFeatureGateProps {
  featureId: string;
  children: React.ReactNode;
  title: string;
  description: string;
}

export function PremiumFeatureGate({ 
  featureId, 
  children, 
  title, 
  description 
}: PremiumFeatureGateProps) {
  // This will be enhanced with the actual useFeatureAccess hook later
  const hasAccess = FEATURES.PREMIUM_FEATURES_ENABLED;
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  return (
    <Card className="relative overflow-hidden border-dashed border-primary/40">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4">
        <Lock className="h-10 w-10 text-primary/50 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-center max-w-xs mb-6">
          {description}
        </p>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
          <Button asChild>
            <Link href={`${APP_URL}signup`}>Sign Up Free</Link>
          </Button>
        </div>
      </div>
      
      {/* Blurred child content */}
      <div className="opacity-20 filter blur-sm pointer-events-none">
        {children}
      </div>
    </Card>
  );
}

export default PremiumFeatureGate;
