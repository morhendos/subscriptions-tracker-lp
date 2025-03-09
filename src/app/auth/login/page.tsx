import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Login to access the admin dashboard',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src="/logo-st.svg" alt="Subscriptions Tracker" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to access the admin dashboard
          </p>
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
