'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

type LogoutButtonProps = {
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'link';
};

export default function LogoutButton({ 
  className = '', 
  variant = 'primary' 
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  // Define base styles
  let buttonStyle = 'px-4 py-2 rounded-md text-sm font-medium transition-colors';
  
  // Add variant-specific styles
  switch (variant) {
    case 'primary':
      buttonStyle += ' bg-red-600 hover:bg-red-700 text-white';
      break;
    case 'outline':
      buttonStyle += ' border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20';
      break;
    case 'ghost':
      buttonStyle += ' text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20';
      break;
    case 'link':
      buttonStyle += ' text-red-500 hover:underline p-0';
      break;
  }
  
  if (isLoading) {
    buttonStyle += ' opacity-70 cursor-not-allowed';
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`${buttonStyle} ${className}`}
    >
      {isLoading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
