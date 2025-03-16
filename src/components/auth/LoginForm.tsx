'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { hashPasswordForTransit } from '@/lib/auth/client-auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSecure, setIsSecure] = useState(true);

  // Check if we're on HTTPS to show a security indicator
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSecure(window.location.protocol === 'https:' || window.location.hostname === 'localhost');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error when user types
    if (error) setError(null);
    if (debugInfo) setDebugInfo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      // Log attempt (without password)
      console.log(`Attempting to sign in with email: ${formData.email}`);
      
      // Validate form data
      const validation = loginSchema.safeParse(formData);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map(err => err.message).join(', ');
        setError(errorMessages);
        setIsLoading(false);
        return;
      }

      // Get the current password
      const plainPassword = formData.password;
      
      // Hash password for transmission
      const hashedPassword = process.env.NODE_ENV === 'production' 
        ? hashPasswordForTransit(plainPassword)
        : plainPassword; // In development, we might keep it simple

      // Call NextAuth signIn with hashed password
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: hashedPassword,
      });
      
      // Debug info (without showing password)
      if (result) {
        console.log('Auth result:', { ok: result.ok, error: result.error, status: result.status });
        setDebugInfo(`Auth attempt result: { ok: ${result.ok}, status: ${result.status || 'unknown'} }`);
      }

      if (result?.error) {
        let errorMessage: string;
        
        if (result.error === 'CredentialsSignin') {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = result.error;
        }
        
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      if (!result?.ok) {
        setError('Authentication failed for unknown reason');
        setIsLoading(false);
        return;
      }

      // Redirect to admin dashboard on success
      router.push('/admin');
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
      if (err instanceof Error) {
        setDebugInfo(`Error: ${err.message}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-800 rounded-lg shadow-md border border-slate-700">      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-600 text-red-200 rounded">
          {error}
        </div>
      )}
      
      {!isSecure && (
        <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-600 text-yellow-200 rounded text-xs">
          <strong>Security Warning:</strong><br />
          You are using an insecure connection. For your security, consider using HTTPS.
        </div>
      )}
      
      {debugInfo && process.env.NODE_ENV !== 'production' && (
        <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-600 text-yellow-200 rounded text-xs">
          <strong>Debug Info:</strong><br />
          {debugInfo}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white"
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}