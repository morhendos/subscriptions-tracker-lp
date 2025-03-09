'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import UserProfile from '@/components/auth/UserProfile';
import { isAdmin } from '@/lib/auth';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Waitlist', path: '/admin/waitlist' },
  ];
  
  // Check authentication status
  const loading = status === 'loading';
  const authenticated = status === 'authenticated';
  const hasAdminRole = session && isAdmin(session.user);
  
  // Don't need to show error here since middleware will redirect to login
  // This is just a fallback for any edge cases
  if (!loading && (!authenticated || !hasAdminRole)) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen flex-col pt-16"> {/* Added pt-16 to account for the main header */}
      <header className="sticky top-16 z-30 w-full border-b bg-background/95 backdrop-blur"> {/* Changed top-0 to top-16, z-40 to z-30 */}
        <div className="container flex h-14 items-center"> {/* Reduced height from h-16 to h-14 */}
          <div className="mr-4 flex">
            <Link href="/admin" className="font-semibold">
              Admin Dashboard
            </Link>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to Site
            </Link>
            <div className="ml-4">
              <UserProfile />
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Subscriptions Tracker. Admin Panel.
          </p>
        </div>
      </footer>
    </div>
  );
}
