"use client";

import CTAButton from "./CTAButton";
import GradientBackground from "./GradientBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-center relative z-10">
        <p className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto">
          Never miss a payment or overpay for subscriptions again. Get complete
          visibility and control over all your recurring expenses.
        </p>

        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-10 text-white max-w-5xl mx-auto leading-tight tracking-wide">
          The <span className="text-[#eaac2f]">simplest</span> way to organize
          your subscriptions and save money without effort
        </h1>

        <CTAButton>Get Started</CTAButton>
      </div>
    </section>
  );
};

export default Hero;