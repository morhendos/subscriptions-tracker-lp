'use client';

import { useSession } from 'next-auth/react';
import LogoutButton from './LogoutButton';
import { Role } from '@/types/auth';

export default function UserProfile() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="flex items-center p-2 rounded-md animate-pulse bg-gray-800">
        <div className="w-8 h-8 rounded-full bg-gray-700 mr-2"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    );
  }
  
  if (status === 'unauthenticated' || !session?.user) {
    return null;
  }

  const userRoles = session.user.roles || [];
  
  // Type-safe way to check for admin role
  const isAdmin = userRoles.some((role: Role | string) => {
    if (typeof role === 'string') {
      return role === 'admin';
    }
    return role.name === 'admin';
  });
  
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 p-3 bg-gray-900 rounded-lg shadow-md border border-gray-800">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 font-semibold">
          {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-white">
            {session.user.name || 'User'}
          </p>
          <p className="text-xs text-gray-400">
            {isAdmin ? 'Admin' : 'User'}
          </p>
        </div>
      </div>
      
      <LogoutButton 
        variant="ghost" 
        className="md:ml-auto"
      />
    </div>
  );
}