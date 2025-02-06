export const APP_URL = "https://app.subscriptions-tracker.com/";

export interface Testimonial {
  id: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    text: 'Made me more mindful about my subscriptions. When you see all the numbers in one place, it really makes you think!',
    rating: 5
  },
  {
    id: '2',
    text: 'Having all my subscriptions organized in one list changed everything. Now I know exactly what I\'m paying for and when each payment is due.',
    rating: 5
  },
  {
    id: '3',
    text: 'As someone who hates spreadsheets, this is exactly what I needed to keep track of my monthly services.',
    rating: 5
  }
];

// Statistics for social proof
export const testimonialStats = {
  averageRating: 4.9,
  totalReviews: 1582,
  satisfactionRate: 98,
  featuredPlatforms: [
    {
      name: 'Product Hunt',
      rating: 4.9,
      reviews: 387
    },
    {
      name: 'G2',
      rating: 4.8,
      reviews: 245
    },
    {
      name: 'Capterra',
      rating: 4.9,
      reviews: 178
    }
  ]
};