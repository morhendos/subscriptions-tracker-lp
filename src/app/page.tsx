import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <Features />
        <Testimonials />
        <PricingSection />
        <FAQ />
      </main>
    </>
  );
}
