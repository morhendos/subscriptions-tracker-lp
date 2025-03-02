'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track interests for more targeted marketing
  const [interests, setInterests] = useState<string[]>([]);
  
  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Make actual API call
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          name, 
          source: 'waitlist_page',
          interests
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to join waitlist');
      }
      
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join our Premium Waitlist</CardTitle>
        <CardDescription>
          Be the first to know when our Lifetime Plan launches!
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isSuccess ? (
          <div className="py-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium">You're on the list!</h3>
            <p className="text-muted-foreground mt-2">
              We'll notify you as soon as our premium features are available.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Which features are you most interested in?</Label>
              <div className="space-y-2 mt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="feature-unlimited" 
                    checked={interests.includes('unlimited')}
                    onCheckedChange={() => toggleInterest('unlimited')}
                  />
                  <Label htmlFor="feature-unlimited" className="font-normal">Unlimited subscriptions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="feature-analytics" 
                    checked={interests.includes('analytics')}
                    onCheckedChange={() => toggleInterest('analytics')}
                  />
                  <Label htmlFor="feature-analytics" className="font-normal">Advanced analytics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="feature-categories" 
                    checked={interests.includes('categories')}
                    onCheckedChange={() => toggleInterest('categories')}
                  />
                  <Label htmlFor="feature-categories" className="font-normal">Custom categories</Label>
                </div>
              </div>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </form>
        )}
      </CardContent>
      
      {!isSuccess && (
        <CardFooter>
          <Button 
            className="w-full" 
            type="submit"
            disabled={isSubmitting || !name || !email}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default WaitlistForm;
