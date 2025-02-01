'use client';

import CTAButton from "./CTAButton";
import { Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A1B] via-[#1A1F2C] to-[#2A2F3C]">
      <div className="container mx-auto px-4 py-12 text-center relative z-10">
        <p className="text-[#DAA520] mb-6">Track All Your Subscriptions In One Place</p>
        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white max-w-5xl mx-auto leading-tight">
          The <span className="text-[#DAA520]">simplest</span> way to organize your subscriptions and save money without effort
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Never miss a payment or overpay for subscriptions again. Get complete visibility and control over all your recurring expenses.
        </p>
        <CTAButton>Get Started</CTAButton>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-5 h-5 text-[#4ADE80] fill-[#4ADE80]"
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                "Finally, a solution that helps me keep track of all my subscriptions in one place!"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;