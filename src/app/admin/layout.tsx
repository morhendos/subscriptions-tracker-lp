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
    
    // Try to get auth token from localStorage first
    const authToken = localStorage.getItem('admin_auth_token');
    const authUser = localStorage.getItem('admin_auth_user');
    
    // Helper function to fetch auth status from API
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth');
        const data = await response.json();
        
        if (!data.authenticated) {
          // If not authenticated and no local token, redirect to login
          if (!authToken) {
            router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return false;
          }
          // Try to use the local token to re-authenticate
          const reAuthResponse = await fetch('/api/admin/auth/revalidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: authToken }),
          });
          
          if (!reAuthResponse.ok) {
            // If reauth failed, clear local storage and redirect to login
            localStorage.removeItem('admin_auth_token');
            localStorage.removeItem('admin_auth_user');
            router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return false;
          }
          
          // Reauth successful, get updated user data
          const reAuthData = await reAuthResponse.json();
          if (reAuthData.user) {
            setUser(reAuthData.user);
            localStorage.setItem('admin_auth_user', JSON.stringify(reAuthData.user));
            return true;
          }
          return false;
        } else {
          // If authenticated via API, update local state and storage
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('admin_auth_user', JSON.stringify(data.user));
            if (data.token) {
              localStorage.setItem('admin_auth_token', data.token);
            }
          }
          return true;
        }
      } catch (error) {
        console.error('Auth check error:', error);
        
        // If there's an error but we have local user data, use that
        if (authUser) {
          try {
            setUser(JSON.parse(authUser));
            return true;
          } catch (e) {
            // If parsing fails, clear local storage
            localStorage.removeItem('admin_auth_token');
            localStorage.removeItem('admin_auth_user');
          }
        }
        
        // If all else fails, redirect to login
        router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
    
    // If we have a cached user, set it immediately and then check auth
    if (authUser) {
      try {
        setUser(JSON.parse(authUser));
        setIsLoading(false);  // Show the UI faster
      } catch (e) {
        // If parsing fails, do nothing and continue with auth check
      }
    }
    
    // Always check auth to verify the session
    checkAuth();
  }, [pathname, router]);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE'
      });
      
      setUser(null);
      localStorage.removeItem('admin_auth_token');
      localStorage.removeItem('admin_auth_user');
      
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
  
  // Show loading state only if on a page other than login and still loading
  if (isLoading && pathname !== '/admin/login') {
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
  
  // Render admin layout with navigation
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            {/* User info */}
            {user && (
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                <span>{user.name}</span>
                <span className="ml-2 bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">
                  {user.roles?.find(r => r.name === 'admin' || r.name === 'super-admin')?.name || 'admin'}
                </span>
              </div>
            )}
            
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