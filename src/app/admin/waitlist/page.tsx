'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WaitlistAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [waitlistEntries, setWaitlistEntries] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      // Load waitlist data here
      fetch('/api/admin/waitlist')
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Failed to fetch');
        })
        .then(data => {
          setWaitlistEntries(data || []);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching waitlist:', err);
          setIsLoading(false);
        });
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Waitlist Management</h1>
        <Link href="/admin" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded p-6 mb-6 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Waitlist Entries</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {waitlistEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 px-4 text-center">
                    No waitlist entries found.
                  </td>
                </tr>
              ) : (
                waitlistEntries.map((entry: any) => (
                  <tr key={entry.id} className="border-t dark:border-gray-600">
                    <td className="py-3 px-4">{entry.email}</td>
                    <td className="py-3 px-4">{entry.name}</td>
                    <td className="py-3 px-4">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        entry.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
