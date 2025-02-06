"use client";

import CTAButton from "./CTAButton";
import Image from "next/image";
import GradientBackground from "./GradientBackground";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/config/constants";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-center relative z-10">
        {/* Logo placement */}
        <div className="w-full max-w-lg mx-auto mb-20">
          <Image
            src="/logo-st.svg"
            alt="Subscription Tracker"
            width={500}
            height={180}
            priority
            className="w-full h-auto"
          />
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white max-w-5xl mx-auto leading-tight tracking-wide">
          The <span className="text-[#eaac2f]">simplest</span> way to organize
          your subscriptions and save money without effort
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Never miss a payment or overpay for subscriptions again. Get complete
          visibility and control over all your recurring expenses.
        </p>
        <CTAButton>Get Started</CTAButton>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} text={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
