import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTAButton from "@/components/CTAButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0A1B]">
      <Hero />
      <Features />
      <HowItWorks />
      <section className="py-20 bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Join thousands of users saving money on their subscriptions
          </p>
          <CTAButton>Start Free Trial</CTAButton>
        </div>
      </section>
    </div>
  );
};

export default Index;