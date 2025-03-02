'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First, check if there's a stored admin key in localStorage as a fallback
        const storedKey = localStorage.getItem('admin_key');
        const headers: HeadersInit = {};
        
        // If we have a stored key, add it to the request headers
        if (storedKey) {
          headers['x-api-key'] = storedKey;
        }
        
        // Make the auth check request with optional API key header
        const response = await fetch('/api/admin/auth', { headers });
        const data = await response.json();
        
        setIsAuthenticated(data.authenticated);
        
        // If not authenticated and not on login page, redirect to login
        if (!data.authenticated && pathname !== '/admin/login') {
          router.push('/admin/login');
        }
        
        // If authenticated and on login page, redirect to admin dashboard
        if (data.authenticated && pathname === '/admin/login') {
          router.push('/admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [pathname, router]);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE'
      });
      
      // Also clear the localStorage key on logout
      localStorage.removeItem('admin_key');
      
      setIsAuthenticated(false);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  
  // Special case for login page - no header/nav needed
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }
  
  // Render admin layout with navigation
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin header */}
      <div className="border-b bg-background">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
            >
              View Site
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Admin content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}