'use client';

import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';
import { SchemaOrg } from './SchemaOrg';
import { testimonials, testimonialStats } from '@/config/constants';
import { cn } from '@/lib/utils';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody: testimonial.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <SchemaOrg schema={reviewSchema} />
      <CardContent className="p-6">
        <div className="mt-4 mb-3">
          <StarRating rating={testimonial.rating} />
        </div>

        <blockquote className="mt-4 text-muted-foreground">
          "{testimonial.text}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  // Generate aggregate rating schema
  const aggregateSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: 'Subscription Tracker',
      applicationCategory: 'FinanceApplication'
    },
    ratingValue: testimonialStats.averageRating,
    reviewCount: testimonialStats.totalReviews,
    bestRating: '5',
    worstRating: '1'
  };

  return (
    <section className="py-20 bg-background" id="testimonials">
      <SchemaOrg schema={aggregateSchema} />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground">
            Join our community of satisfied users who have transformed their subscription management
          </p>
        </div>

        {/* Platform ratings */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {testimonialStats.featuredPlatforms.map((platform) => (
            <div key={platform.name} className="text-center">
              <StarRating rating={platform.rating} />
              <p className="mt-2 font-semibold">{platform.rating} on {platform.name}</p>
              <p className="text-sm text-muted-foreground">
                {platform.reviews} reviews
              </p>
            </div>
          ))}
        </div>

        {/* Main testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Overall statistics */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 md:gap-16 px-8 py-6 bg-primary/5 rounded-full">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {testimonialStats.averageRating}/5
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {testimonialStats.totalReviews.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Total Reviews
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {testimonialStats.satisfactionRate}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}