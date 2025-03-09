'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="bg-white shadow-md rounded p-6 mb-6 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {session?.user?.name}</h2>
        <p className="mb-4">This is a protected admin area.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow dark:bg-gray-700">
            <h3 className="text-xl font-medium mb-3">Waitlist Management</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Manage and review waitlist signups
            </p>
            <button
              onClick={() => router.push('/admin/waitlist')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Manage Waitlist
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow dark:bg-gray-700">
            <h3 className="text-xl font-medium mb-3">Settings</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Configure admin settings and preferences
            </p>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
