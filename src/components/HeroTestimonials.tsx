'use client';

import { Star } from 'lucide-react';
import { testimonialStats } from '@/config/constants';
import { cn } from '@/lib/utils';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-3 w-3',
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
}

export default function HeroTestimonials() {
  return (
    <div className="mt-12">
      {/* Platform ratings */}
      <div className="flex flex-wrap justify-center gap-6 items-center">
        {testimonialStats.featuredPlatforms.map((platform) => (
          <div key={platform.name} className="text-center flex flex-col items-center">
            <StarRating rating={platform.rating} />
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{platform.rating}</span> on {platform.name}
            </p>
          </div>
        ))}
        <div className="h-8 w-px bg-border mx-2" /> {/* Vertical separator */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{testimonialStats.totalReviews.toLocaleString()}+</span> happy users
          </p>
        </div>
      </div>
    </div>
  );
}