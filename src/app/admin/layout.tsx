'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  roles: Array<{ id: string; name: string }>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  
  // Check authentication status
  useEffect(() => {
    // Don't check auth for login page
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }
    
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth');
        const data = await response.json();
        
        if (!data.authenticated) {
          // If not authenticated, redirect to login
          router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
        } else {
          // If authenticated, set the user data
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // If there's an error, redirect to login
        router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
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
      
      setUser(null);
      
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
      });
      
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      
      toast({
        title: 'Logout failed',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
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
  
  // If not authenticated and not on login page, don't render anything
  // (middleware will handle the redirect)
  if (!user) {
    return null;
  }
  
  // Render admin layout with navigation
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            {/* User info */}
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="h-4 w-4 mr-1" />
              <span>{user.name}</span>
              <span className="ml-2 bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">
                {user.roles?.find(r => r.name === 'admin' || r.name === 'super-admin')?.name || 'admin'}
              </span>
            </div>
            
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
        <div className="container py-6 px-4">
          {children}
        </div>
      </div>
    </div>
  );
}