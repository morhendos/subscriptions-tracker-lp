import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Benefits from '@/components/Benefits'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import PricingSection from '@/components/PricingSection'
import { SchemaOrg } from '@/components/SchemaOrg'
import { generateSoftwareAppSchema } from '@/lib/schema'

const softwareAppSchema = generateSoftwareAppSchema({
  name: 'Subscription Tracker',
  description: 'Track and manage all your subscriptions in one simple dashboard',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  price: '0',
  currency: 'USD',
  ratingValue: 4.8,
  ratingCount: 158
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <SchemaOrg schema={softwareAppSchema} />
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <FAQ />
      <PricingSection />
    </main>
  )
}