import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'

// Dynamically import the FAQ component with ssr enabled
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true })

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
    </main>
  )
}