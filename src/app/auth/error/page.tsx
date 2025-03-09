import React, { Suspense } from 'react';
import ErrorContent from './components/ErrorContent';
import Link from 'next/link';

// Loading fallback component 
function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src="/logo-st.svg" alt="Subscriptions Tracker" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-3xl font-extrabold text-red-500">Authentication Error</h1>
          <p className="mt-4 text-lg text-gray-300">Loading error details...</p>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorContent />
    </Suspense>
  );
}
