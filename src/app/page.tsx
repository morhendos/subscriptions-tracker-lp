import dynamic from 'next/dynamic'

// Dynamically import client components
const Hero = dynamic(() => import('@/components/Hero'))
const Features = dynamic(() => import('@/components/Features'))
const HowItWorks = dynamic(() => import('@/components/HowItWorks'))

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
    </main>
  )
}
