'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  id?: string;
  author?: string;
  role?: string;
  company?: string;
  text: string;
  rating?: number;
  avatarUrl?: string;
  datePublished?: string;
}

export default function TestimonialCard({ 
  text,
  author,
  role,
  company,
  rating = 5,
  avatarUrl,
  datePublished
}: TestimonialCardProps) {
  // Basic version for simple testimonials
  if (!author) {
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

  // Enhanced version for rich testimonials
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={author} />
            <AvatarFallback>
              {author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{author}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {role}
              {company && ` at ${company}`}
            </p>
          </div>
        </div>
        
        <div className="mt-4 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < (rating || 5)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <blockquote className="mt-4 text-muted-foreground">
          "{text}"
        </blockquote>

        {datePublished && (
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <time dateTime={datePublished}>
              {new Date(datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </time>
          </div>
        )}
      </CardContent>
    </Card>
  );
}