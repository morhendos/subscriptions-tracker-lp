'use client';

import { Star } from "lucide-react";

interface TestimonialCardProps {
  text: string;
}

export default function TestimonialCard({ text }: TestimonialCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className="w-5 h-5 text-[#4ADE80] fill-[#4ADE80]"
          />
        ))}
      </div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}