"use client";

import CTAButton from "./CTAButton";
import { Star } from "lucide-react";
import Header from "./Header";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <Header />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-[#0A0A1B]" />

        {/* Main gradient effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(89, 35, 46, 0.7) 0%, rgba(10, 10, 27, 0.9) 45%, rgba(27, 35, 65, 0.7) 100%)",
          }}
        />

        {/* Strong center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 75% at 50% 45%, rgba(82, 36, 46, 0.35) 0%, transparent 100%)",
          }}
        />

        {/* Additional subtle glows */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 35% at 50% 45%, rgba(82, 36, 46, 0.15) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(20% 50% at 50% 50%, rgba(82, 36, 46, 0.2) 0%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 py-12 text-center relative z-10 mt-20">
          {/* Logo with more top space */}
          <div className="w-full max-w-sm mx-auto mb-16 mt-8">
            <Image
              src="/images/logo-2.png"
              alt="Subscription Tracker"
              width={400}
              height={144}
              priority
              className="w-full h-auto"
            />
          </div>

          {/* Main content with improved spacing */}
          <div className="max-w-[900px] mx-auto space-y-8">
            <h1 
              style={{ fontFamily: 'Syne, sans-serif' }} 
              className="text-4xl md:text-6xl font-bold text-white leading-[1.2] tracking-wide"
            >
              The <span className="text-[#FFD43B]">simplest</span> way to organize
              your subscriptions and save money without effort
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Never miss a payment or overpay for subscriptions again. Get complete
              visibility and control over all your recurring expenses.
            </p>
          </div>

          {/* CTA with more space */}
          <div className="mt-12">
            <CTAButton>Get Started</CTAButton>
          </div>

          {/* Testimonials with more top margin */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
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
                  "Finally, a solution that helps me keep track of all my
                  subscriptions in one place!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;