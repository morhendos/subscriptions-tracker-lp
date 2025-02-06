import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import dynamic from 'next/dynamic';

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="py-20">Loading...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      <Suspense fallback={<div className="py-20">Loading...</div>}>
        <FAQ />
      </Suspense>
    </main>
  );
}