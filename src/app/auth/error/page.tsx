'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  useEffect(() => {
    const error = searchParams.get('error');
    
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          setErrorMessage('Sign in failed. Check the details you provided are correct.');
          break;
        case 'SessionRequired':
          setErrorMessage('Please sign in to access this page.');
          break;
        case 'AccessDenied':
          setErrorMessage('You don\'t have permission to access this resource.');
          break;
        case 'OAuthCallback':
          setErrorMessage('Error in the authentication process. Please try again.');
          break;
        case 'OAuthAccountNotLinked':
          setErrorMessage('To confirm your identity, sign in with the same account you used originally.');
          break;
        case 'EmailSignin':
          setErrorMessage('The sign in link is no longer valid. It may have expired or already been used.');
          break;
        case 'AuthFailure':
          setErrorMessage('Authentication failed. Please try again.');
          break;
        default:
          setErrorMessage('An unknown error occurred. Please try again.');
      }
    } else {
      setErrorMessage('An error occurred. Please try again.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-500">Authentication Error</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{errorMessage}</p>
          <div className="mt-8 space-y-4">
            <Link 
              href="/auth/login"
              className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </Link>
            <Link 
              href="/"
              className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
