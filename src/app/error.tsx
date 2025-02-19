'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A1B] via-[#1A1F2C] to-[#2A2F3C]">
      <div className="max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-8">
          We've encountered an unexpected error. Our team has been notified and we're working to fix the issue.
        </p>
        {error.digest && (
          <div className="bg-[#1A1F2C] px-4 py-2 rounded-md mb-6">
            <p className="text-sm text-gray-400">Error Reference: <code className="text-[#DAA520]">{error.digest}</code></p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-[#DAA520] hover:bg-[#FFD700] text-[#1A1F2C] font-semibold py-3 px-6 rounded-lg flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try again
          </button>
          <Link
            href="/"
            className="border border-[#DAA520] text-[#DAA520] hover:bg-[#DAA520]/10 font-semibold py-3 px-6 rounded-lg flex items-center justify-center text-lg transition-all duration-300"
          >
            <Home className="h-5 w-5 mr-2" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
