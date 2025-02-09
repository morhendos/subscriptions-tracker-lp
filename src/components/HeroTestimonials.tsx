'use client';

import { Star } from 'lucide-react';
import { testimonialStats } from '@/config/constants';
import { cn } from '@/lib/utils';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4 md:h-5 md:w-5', // Increased star size
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
}

export default function HeroTestimonials() {
  return (
    <div className="mt-16 md:mt-20"> {/* Increased spacing from CTA */}
      {/* Platform ratings */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-10 items-center"> {/* Increased gap between items */}
        {testimonialStats.featuredPlatforms.map((platform) => (
          <div key={platform.name} className="text-center flex flex-col items-center">
            <StarRating rating={platform.rating} />
            <p className="mt-2 text-base text-muted-foreground"> {/* Increased text size and spacing */}
              <span className="font-semibold text-primary">{platform.rating}</span> on {platform.name}
            </p>
          </div>
        ))}
        <div className="h-10 w-px bg-border mx-4" /> {/* Taller separator with more margin */}
        <div className="text-center">
          <p className="text-base text-muted-foreground"> {/* Increased text size */}
            <span className="font-semibold text-primary">{testimonialStats.totalReviews.toLocaleString()}+</span> happy users
          </p>
        </div>
      </div>
    </div>
  );
}