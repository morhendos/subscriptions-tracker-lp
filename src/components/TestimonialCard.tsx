'use client';

import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  text: string;
  rating: number;
}

export default function TestimonialCard({ text, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full bg-background/50 backdrop-blur-sm">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>

        <blockquote className="text-muted-foreground">
          "{text}"
        </blockquote>
      </CardContent>
    </Card>
  );
}