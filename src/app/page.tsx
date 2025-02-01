import dynamic from 'next/dynamic'

// Dynamically import client components
const Hero = dynamic(() => import('@/components/Hero'))

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
    </main>
  )
}
