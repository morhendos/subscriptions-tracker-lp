'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ShieldAlert, KeyRound, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const errorType = searchParams.get('error');
  
  const { toast } = useToast();
  
  // Check if already authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/auth');
        const data = await response.json();
        
        if (data.authenticated) {
          // If already authenticated, redirect to the callback URL
          toast({
            title: 'Already signed in',
            description: 'You are already signed in as an admin',
          });
          
          router.push(callbackUrl);
          return;
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setCheckingSession(false);
      }
    };
    
    checkSession();
    
    // Show error messages based on URL parameters
    if (errorType === 'SessionExpired') {
      toast({
        title: 'Session expired',
        description: 'Your session has expired. Please sign in again',
        variant: 'destructive',
      });
    }
  }, [callbackUrl, errorType, router, toast]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset any previous errors
    setError(null);
    
    // Validate form
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    setLoading(true);
    
    try {
      // First ensure no credentials are being sent via URL params
      const cleanCallbackUrl = callbackUrl.split('?')[0];
      
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          // Including redirect info with the request
          callbackUrl: cleanCallbackUrl
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      // Log debug information
      console.log("Login successful, redirecting to:", cleanCallbackUrl);
      
      // If authentication successful, show success message and redirect
      toast({
        title: 'Authentication successful',
        description: `Welcome back, ${data.user?.name || 'Admin'}!`,
      });
      
      // Replace the current URL with the callback URL to avoid history issues
      window.location.href = cleanCallbackUrl;
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
      
      toast({
        title: 'Authentication failed',
        description: 'Please check your email and password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Show loading state while checking session
  if (checkingSession) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold">Checking your session...</h2>
          <p className="mt-2 text-muted-foreground">Please wait while we verify your admin access.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 relative mb-4">
            <Image 
              src="/logo-st.svg" 
              alt="Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="text-muted-foreground">Sign in with your admin credentials</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <KeyRound className="h-5 w-5 mr-2" />
              Administrator Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                </div>
                
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded flex items-center">
                    <ShieldAlert className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                
                <Button type="submit" disabled={loading} className="mt-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                
                <div className="mt-4 bg-muted/50 border border-muted rounded px-4 py-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      This area is restricted to administrators only. You need an admin account from the main application to access this area.
                    </p>
                  </div>
                </div>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push('/')}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ← Return to the main site
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}