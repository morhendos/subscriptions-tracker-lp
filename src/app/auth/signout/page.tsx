'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    // Perform signout operation
    const performSignOut = async () => {
      await signOut({ redirect: false });
      router.push('/');
    };

    performSignOut();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src="/logo-st.svg" alt="Subscriptions Tracker" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Signing out...</h1>
          <p className="mt-4 text-lg text-gray-300">
            You are being signed out and redirected to the homepage.
          </p>
          <div className="mt-6">
            <div className="loader mx-auto h-8 w-8 border-4 border-gray-700 rounded-full border-t-blue-400 animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
}