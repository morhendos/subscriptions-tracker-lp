'use client';

import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SchemaOrg } from './SchemaOrg';
import { generateReviewSchema } from '@/lib/schema';

const testimonials = [
  {
    author: 'Sarah Johnson',
    role: 'Small Business Owner',
    text: 'Subscription Tracker has transformed how I manage my business subscriptions. The cost insights alone helped me save over $200 monthly!',
    rating: 5,
    avatar: '/testimonials/sarah.jpg',
    date: '2025-01-15'
  },
  {
    author: 'Michael Chen',
    role: 'Tech Professional',
    text: 'Finally, a tool that helps me keep track of all my software subscriptions. The renewal reminders are a lifesaver.',
    rating: 5,
    avatar: '/testimonials/michael.jpg',
    date: '2025-01-20'
  },
  {
    author: 'Emma Williams',
    role: 'Family Budget Manager',
    text: 'Managing family subscriptions was a nightmare until I found this tool. Now everyone knows what we're paying for and when.',
    rating: 4,
    avatar: '/testimonials/emma.jpg',
    date: '2025-01-25'
  }
];

export default function Testimonials() {
  const reviews = testimonials.map(t => ({
    author: t.author,
    reviewBody: t.text,
    datePublished: t.date,
    ratingValue: t.rating
  }));

  return (
    <section className="py-20 bg-background" id="testimonials">
      {testimonials.map((testimonial, index) => (
        <SchemaOrg key={index} schema={generateReviewSchema({
          author: testimonial.author,
          reviewBody: testimonial.text,
          datePublished: testimonial.date,
          ratingValue: testimonial.rating
        })} />
      ))}

      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied users who have transformed their subscription management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.author}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="text-muted-foreground">
                  "{testimonial.text}"
                </blockquote>
                
                <time className="text-sm text-muted-foreground mt-4 block">
                  {new Date(testimonial.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </time>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg">
            Join our growing community of 10,000+ satisfied users
          </p>
          <div className="flex justify-center items-center space-x-8 mt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}