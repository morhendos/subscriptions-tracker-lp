'use client';

import { useSession } from 'next-auth/react';
import LogoutButton from './LogoutButton';

export default function UserProfile() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="flex items-center p-2 rounded-md animate-pulse bg-gray-100 dark:bg-gray-800">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    );
  }
  
  if (status === 'unauthenticated' || !session?.user) {
    return null;
  }

  const userRoles = session.user.roles || [];
  const isAdmin = userRoles.some(role => role.name === 'admin' || role === 'admin');
  
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold">
          {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {session.user.name || 'User'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
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
