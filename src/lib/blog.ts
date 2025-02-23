import { Author, BlogPost } from '@/types/blog';
import { content as subscriptionServicesContent } from '@/content/subscription-services-overpaying';
import { content as psychologyContent } from '@/content/psychology-subscription-fatigue';
import { content as auditGuideContent } from '@/content/audit-subscriptions-guide';
import { content as trendsContent } from '@/content/subscription-trends-2025';
import { content as familySharingContent } from '@/content/family-subscription-sharing';

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: 'subscription-services-overpaying',
    title: "10 Subscription Services You're Probably Overpaying For",
    excerpt: "We analyzed thousands of user accounts to identify the most common subscription services people pay too much for, and how to optimize them.",
    content: subscriptionServicesContent,
    date: "February 15, 2025",
    readTime: "6 min read",
    category: "Money Saving",
    author: {
      name: "Sarah Johnson",
      role: "Financial Analyst"
    },
    featured: true
  },
  {
    slug: 'psychology-subscription-fatigue',
    title: "The Psychology Behind Subscription Fatigue (And How to Beat It)",
    excerpt: "Understanding the psychological mechanisms that make us reluctant to cancel unused subscriptions, and practical strategies to overcome them.",
    content: psychologyContent,
    date: "February 8, 2025",
    readTime: "7 min read",
    category: "Behavioral Finance",
    author: {
      name: "Dr. Michael Wong",
      role: "Consumer Psychologist"
    },
    featured: true
  },
  {
    slug: 'audit-subscriptions-guide',
    title: "How to Audit Your Subscriptions: A Step-by-Step Guide",
    excerpt: "A comprehensive guide to finding all your active subscriptions, evaluating their value, and making informed decisions about what to keep.",
    content: auditGuideContent,
    date: "January 29, 2025",
    readTime: "8 min read",
    category: "Guides",
    author: {
      name: "Alex Chen",
      role: "Founder & CEO"
    },
    featured: true
  },
  {
    slug: 'subscription-trends-2025',
    title: "Subscription Model Trends to Watch in 2025",
    excerpt: "Analyzing emerging trends in subscription business models and what they mean for consumers in the coming year.",
    content: trendsContent,
    date: "February 12, 2025",
    readTime: "7 min read",
    category: "Industry Trends",
    author: {
      name: "Leila Patel",
      role: "Market Analyst"
    }
  },
  {
    slug: 'family-subscription-sharing',
    title: "Family Subscription Sharing: Maximize Value While Staying Compliant",
    excerpt: "How to share subscription services with family members legally and ethically, while getting the most value for your money.",
    content: familySharingContent,
    date: "February 5, 2025",
    readTime: "8 min read",
    category: "Tips & Tricks",
    author: {
      name: "Carlos Mendez",
      role: "Consumer Rights Specialist"
    }
  }
];

// Utility functions
export const getAllPosts = (): Promise<BlogPost[]> => {
  return Promise.resolve(blogPosts);
};

export const getFeaturedPosts = (): Promise<BlogPost[]> => {
  return Promise.resolve(blogPosts.filter(post => post.featured));
};

export const getRecentPosts = (limit: number = 6): Promise<BlogPost[]> => {
  return Promise.resolve(
    blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  );
};

export const getArticleBySlug = (slug: string): Promise<BlogPost | null> => {
  const post = blogPosts.find(post => post.slug === slug);
  return Promise.resolve(post || null);
};

export const getAllArticleSlugs = (): Promise<string[]> => {
  return Promise.resolve(blogPosts.map(post => post.slug));
};

export const getPostsByCategory = (category: string): Promise<BlogPost[]> => {
  return Promise.resolve(
    blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase())
  );
};

export const getAllCategories = (): Promise<string[]> => {
  const categories = new Set(blogPosts.map(post => post.category));
  return Promise.resolve(Array.from(categories));
};

export const getPostsByAuthor = (authorName: string): Promise<BlogPost[]> => {
  return Promise.resolve(
    blogPosts.filter(post => post.author.name === authorName)
  );
};

export const getAllAuthors = (): Promise<Author[]> => {
  const authorMap = new Map<string, Author>();
  blogPosts.forEach(post => {
    authorMap.set(post.author.name, post.author);
  });
  return Promise.resolve(Array.from(authorMap.values()));
};