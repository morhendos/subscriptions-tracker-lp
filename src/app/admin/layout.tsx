'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, User, LayoutDashboard } from 'lucide-react';
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
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
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
    
    // Try to get auth token from localStorage as fallback
    const authToken = localStorage.getItem('admin_auth_token');
    const authUser = localStorage.getItem('admin_auth_user');
    
    // Helper function to fetch auth status from API
    const checkAuth = async () => {
      setIsAuthenticating(true);
      try {
        const response = await fetch('/api/admin/auth');
        const data = await response.json();
        
        if (!data.authenticated) {
          // If not authenticated and no local token, redirect to login
          if (!authToken) {
            router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return false;
          }
          
          console.log("Trying to revalidate with local token...");
          // Try to use the local token to re-authenticate
          const reAuthResponse = await fetch('/api/admin/auth/revalidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: authToken }),
          });
          
          if (!reAuthResponse.ok) {
            console.log("Local token revalidation failed");
            // If reauth failed, clear local storage and redirect to login
            localStorage.removeItem('admin_auth_token');
            localStorage.removeItem('admin_auth_user');
            router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return false;
          }
          
          // Reauth successful, get updated user data
          const reAuthData = await reAuthResponse.json();
          console.log("Local token revalidation successful");
          
          if (reAuthData.user) {
            setUser(reAuthData.user);
            localStorage.setItem('admin_auth_user', JSON.stringify(reAuthData.user));
            return true;
          }
          return false;
        } else {
          // If authenticated via API, update local state and storage
          console.log("Server session authentication successful");
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
        
        // If there's an error but we have local user data, use that temporarily
        // This provides a graceful fallback during API outages
        if (authUser) {
          try {
            console.log("Using cached user data during API error");
            setUser(JSON.parse(authUser));
            toast({
              title: "Connection issue",
              description: "Working with cached credentials. Some features may be limited.",
              variant: "destructive"
            });
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
        setIsAuthenticating(false);
      }
    };
    
    // If we have a cached user, set it immediately and then check auth
    // This improves perceived performance by showing UI faster
    if (authUser) {
      try {
        console.log("Using cached user data initially while verifying");
        const parsedUser = JSON.parse(authUser);
        setUser(parsedUser);
        setIsLoading(false);  // Show the UI faster
      } catch (e) {
        // If parsing fails, do nothing and continue with auth check
        console.error("Error parsing cached user:", e);
      }
    }
    
    // Always check auth to verify the session
    checkAuth();
    
    // Set up a periodic check for session validity
    // This helps with keeping the session alive and detecting session expiry
    const intervalId = setInterval(() => {
      if (!isAuthenticating) { // Prevent overlapping auth checks
        checkAuth().catch(err => {
          console.error("Periodic auth check failed:", err);
        });
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(intervalId); // Clean up the interval
  }, [pathname, router, toast, isAuthenticating]);
  
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
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          
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