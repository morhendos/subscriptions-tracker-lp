import { Author, BlogPost } from '@/types/blog';

// Blog posts data
const blogPosts: BlogPost[] = [
  // First 3 featured articles
  {
    slug: 'subscription-services-overpaying',
    title: "10 Subscription Services You're Probably Overpaying For",
    excerpt: "We analyzed thousands of user accounts to identify the most common subscription services people pay too much for, and how to optimize them.",
    content: `...`, // Previous content
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
    content: `...`, // Previous content
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
    content: `...`, // Previous content
    date: "January 29, 2025",
    readTime: "12 min read",
    category: "Guides",
    author: {
      name: "Alex Chen",
      role: "Founder & CEO"
    },
    featured: true
  },
  // Regular articles
  {
    slug: 'subscription-trends-2025',
    title: "Subscription Model Trends to Watch in 2025",
    excerpt: "Analyzing emerging trends in subscription business models and what they mean for consumers in the coming year.",
    content: `...`, // Previous content
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
    content: `...`, // Previous content
    date: "February 5, 2025",
    readTime: "9 min read",
    category: "Tips & Tricks",
    author: {
      name: "Carlos Mendez",
      role: "Consumer Rights Specialist"
    }
  },
  {
    slug: 'hidden-cost-free-trials',
    title: "The Hidden Cost of Free Trials: What to Watch Out For",
    excerpt: "Free trials can be great for testing services, but they often have hidden costs and conversion tactics. Here's what to be aware of.",
    content: `...`, // Previous content
    date: "January 25, 2025",
    readTime: "6 min read",
    category: "Consumer Protection",
    author: {
      name: "Emma Wilson",
      role: "Consumer Advocate"
    }
  },
  {
    slug: 'subscription-bundling-worth-it',
    title: "Subscription Bundling: When It's Worth It (And When It's Not)",
    excerpt: "A data-driven analysis of popular subscription bundles to determine which ones actually save you money and which are marketing gimmicks.",
    content: `...`, // Previous content
    date: "January 18, 2025",
    readTime: "11 min read",
    category: "Analysis",
    author: {
      name: "David Kim",
      role: "Data Scientist"
    }
  },
  {
    slug: 'case-study-john-subscription-savings',
    title: "How We Helped John Save $2,340 on Annual Subscriptions",
    excerpt: "A real-world case study of how one user identified and eliminated unnecessary subscriptions for significant annual savings.",
    content: `...`, // Previous content
    date: "January 10, 2025",
    readTime: "8 min read",
    category: "Case Studies",
    author: {
      name: "Maya Patel",
      role: "Customer Success Manager"
    }
  },
  {
    slug: 'environmental-impact-digital-subscriptions',
    title: "The Environmental Impact of Digital Subscriptions",
    excerpt: "Exploring the often-overlooked environmental considerations of our increasingly subscription-based digital consumption.",
    content: `...`, // Previous content
    date: "January 2, 2025",
    readTime: "9 min read",
    category: "Sustainability",
    author: {
      name: "Thomas Green",
      role: "Environmental Researcher"
    }
  }
];

// Utility functions
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