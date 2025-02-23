import { Author, BlogPost } from '@/types/blog';
import { content as subscriptionServicesContent } from '@/content/subscription-services-overpaying';
import { content as psychologyContent } from '@/content/psychology-subscription-fatigue';
import { content as auditGuideContent } from '@/content/audit-subscriptions-guide';

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: 'subscription-services-overpaying',
    title: "10 Subscription Services You're Probably Overpaying For",
    excerpt: "We analyzed thousands of user accounts to identify the most common subscription services people pay too much for, and how to optimize them.",
    content: subscriptionServicesContent,
    date: "February 15, 2025",
    readTime: "8 min read",
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
    readTime: "10 min read",
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
    readTime: "12 min read",
    category: "Guides",
    author: {
      name: "Alex Chen",
      role: "Founder & CEO"
    },
    featured: true
  }
];

// Utility functions remain the same
export async function getAllPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.featured);
}

export async function getRecentPosts(limit: number = 6): Promise<BlogPost[]> {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getArticleBySlug(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find(post => post.slug === slug);
  return post || null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return blogPosts.map(post => post.slug);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export async function getAllCategories(): Promise<string[]> {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
}

export async function getPostsByAuthor(authorName: string): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.author.name === authorName);
}

export async function getAllAuthors(): Promise<Author[]> {
  const authorMap = new Map<string, Author>();
  blogPosts.forEach(post => {
    authorMap.set(post.author.name, post.author);
  });
  return Array.from(authorMap.values());
}