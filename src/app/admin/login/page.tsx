'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ShieldAlert, KeyRound, InfoIcon, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingExistingAuth, setCheckingExistingAuth] = useState(true);
  
  const router = useRouter();
  const { toast } = useToast();
  
  // Check if already authenticated on mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        // Check if we have a stored admin key
        const storedKey = localStorage.getItem('admin_key');
        
        // If we have a key, try to authenticate with it
        if (storedKey) {
          const response = await fetch('/api/admin/auth', {
            headers: {
              'x-api-key': storedKey
            }
          });
          
          const data = await response.json();
          
          // If authentication was successful, redirect to admin
          if (data.authenticated) {
            toast({
              title: 'Already authenticated',
              description: 'You were already logged in',
            });
            
            router.push('/admin');
            return;
          }
        }
      } catch (error) {
        console.error('Error checking existing auth:', error);
      } finally {
        setCheckingExistingAuth(false);
      }
    };
    
    checkExistingAuth();
  }, [router, toast]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Authentication failed');
      }
      
      // On successful authentication, store the password as API key in localStorage
      localStorage.setItem('admin_key', password);
      
      toast({
        title: 'Success',
        description: 'You have been logged in successfully',
      });
      
      // Redirect to admin dashboard
      router.push('/admin');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
      
      // Clear any stored key if login fails
      localStorage.removeItem('admin_key');
      
      toast({
        title: 'Error',
        description: 'Authentication failed. Please check your password.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Show loading state while checking existing authentication
  if (checkingExistingAuth) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
          <p>Checking authentication status...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Access the administration dashboard</p>
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <KeyRound className="h-5 w-5 mr-2" />
              Administrator Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                    <ShieldAlert className="h-4 w-4 mr-2" />
                    {error}
                  </div>
                )}
                
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Login
                </Button>
                
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded px-4 py-3">
                  <div className="flex items-start">
                    <InfoIcon className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                    <p className="text-xs text-blue-700">
                      Your admin key will be securely stored in your browser to maintain your session.
                      This helps with authentication in serverless environments.
                    </p>
                  </div>
                </div>
                
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded px-4 py-3">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                      <p className="text-xs text-amber-700">
                        <strong>Development Mode:</strong> Default admin password is "admin-secret-key" unless overridden by environment variables.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}