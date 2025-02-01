'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A1B] via-[#1A1F2C] to-[#2A2F3C]">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#DAA520] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="bg-[#DAA520] hover:bg-[#FFD700] text-[#1A1F2C] font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
