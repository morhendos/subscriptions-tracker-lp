import { Author } from '@/types/blog';

// Types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: Author;
  featured?: boolean;
}

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: 'subscription-services-overpaying',
    title: "10 Subscription Services You're Probably Overpaying For",
    excerpt: "We analyzed thousands of user accounts to identify the most common subscription services people pay too much for, and how to optimize them.",
    content: `
      <h2>Introduction</h2>
      <p>In today's digital age, subscription services have become an integral part of our lives. From streaming entertainment to productivity tools, these services offer convenience and value. However, our analysis of thousands of user accounts reveals that many people are unknowingly overpaying for their subscriptions.</p>

      <h2>1. Streaming Services</h2>
      <p>The average household subscribes to 4+ streaming services, often with overlapping content. Our analysis shows that strategic rotation of services based on viewing habits can save up to $300 annually.</p>
      
      <h3>Common Pitfalls:</h3>
      <ul>
        <li>Keeping multiple services with similar content libraries</li>
        <li>Paying for premium tiers without utilizing premium features</li>
        <li>Not taking advantage of bundle deals</li>
      </ul>

      <h2>2. Cloud Storage</h2>
      <p>Users frequently maintain multiple cloud storage subscriptions or pay for more storage than they need. By consolidating services and regularly reviewing usage, savings of $50-100 per year are possible.</p>

      <h2>3. Digital News Subscriptions</h2>
      <p>While staying informed is important, subscribing to multiple news outlets with paywalls can quickly add up. Consider using aggregator services or looking for bundle deals through your employer or educational institution.</p>

      <h2>4. Productivity Apps</h2>
      <p>Many users pay for individual app subscriptions when a suite package would be more cost-effective. Additionally, free alternatives often provide similar functionality for basic needs.</p>

      <h2>5. Gaming Services</h2>
      <p>Multiple gaming subscription services often go underutilized. Our data shows that most users only actively play games on one platform regularly.</p>

      <h2>6. Music Streaming</h2>
      <p>Family plans shared with actual family members can significantly reduce per-person costs. Additionally, student discounts often go unclaimed.</p>

      <h2>7. Fitness Apps</h2>
      <p>Many users maintain subscriptions to multiple fitness apps with overlapping features. Consider choosing one comprehensive service that meets most of your needs.</p>

      <h2>8. Premium Software Licenses</h2>
      <p>Professional software subscriptions often include features that casual users don't need. Evaluate if a lower tier or alternative solution would suffice.</p>

      <h2>9. Security Services</h2>
      <p>Users frequently pay for multiple security services that provide redundant protection. A single, comprehensive security suite is often more cost-effective.</p>

      <h2>10. Premium Website Services</h2>
      <p>Domain renewals, hosting services, and website builders often auto-renew at higher rates. Regular audits and price comparisons can lead to significant savings.</p>

      <h2>Solutions and Recommendations</h2>
      <p>To optimize your subscription spending:</p>
      <ul>
        <li>Conduct a quarterly subscription audit</li>
        <li>Use subscription tracking tools to monitor expenses</li>
        <li>Take advantage of family plans and bundles</li>
        <li>Regularly review usage patterns</li>
        <li>Set calendar reminders for renewal dates</li>
      </ul>

      <h2>Conclusion</h2>
      <p>By carefully reviewing and optimizing your subscription services, you can maintain access to the content and tools you value while significantly reducing monthly expenses. The key is regular monitoring and strategic decision-making about which services truly provide value for your specific needs.</p>
    `,
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
    content: `
      <h2>Understanding Subscription Fatigue</h2>
      <p>Subscription fatigue is more than just a buzzword—it's a psychological phenomenon that affects millions of consumers in our increasingly subscription-based economy. This article delves into the psychological mechanisms at play and provides actionable strategies to overcome them.</p>

      <h2>The Psychology Behind the Problem</h2>
      
      <h3>1. Loss Aversion</h3>
      <p>Humans are naturally more sensitive to losses than gains. When considering canceling a subscription, we often focus more on what we might miss out on rather than the money we'll save.</p>

      <h3>2. Sunk Cost Fallacy</h3>
      <p>We tend to continue subscriptions because we've already invested time or money in them, even when they no longer serve our needs.</p>

      <h3>3. Decision Paralysis</h3>
      <p>The overwhelming number of subscriptions can lead to decision fatigue, making it harder to evaluate and manage them effectively.</p>

      <h2>Common Symptoms of Subscription Fatigue</h2>
      <ul>
        <li>Feeling overwhelmed by the number of subscriptions</li>
        <li>Difficulty keeping track of payment dates and amounts</li>
        <li>Procrastinating on subscription management</li>
        <li>Experiencing guilt about unused services</li>
      </ul>

      <h2>The Role of Cognitive Biases</h2>
      <p>Several cognitive biases influence our subscription behavior:</p>

      <h3>Status Quo Bias</h3>
      <p>We tend to prefer things to stay the same, making us reluctant to cancel even underutilized subscriptions.</p>

      <h3>Optimism Bias</h3>
      <p>We often overestimate how much we'll use a service in the future, leading to continued subscription of underutilized services.</p>

      <h2>Breaking Free: Practical Strategies</h2>

      <h3>1. Regular Subscription Audits</h3>
      <p>Schedule monthly or quarterly reviews of your subscriptions to evaluate their value objectively.</p>

      <h3>2. Implementation Intentions</h3>
      <p>Create specific "if-then" plans for managing subscriptions: "If I haven't used this service in 30 days, then I'll cancel it."</p>

      <h3>3. Value-Based Decision Making</h3>
      <p>Develop a framework for evaluating subscriptions based on actual usage and value rather than potential future use.</p>

      <h2>Conclusion</h2>
      <p>Understanding the psychological factors behind subscription fatigue is the first step to overcoming it. By implementing practical strategies and maintaining awareness of cognitive biases, you can make more intentional decisions about your subscriptions and reduce the mental burden they create.</p>
    `,
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
    content: `
      <h2>Why Audit Your Subscriptions?</h2>
      <p>In today's digital age, subscriptions can easily pile up without us noticing. A thorough audit helps you understand your spending, identify unused services, and optimize your subscription portfolio.</p>

      <h2>Step 1: Gather Information</h2>
      <h3>Financial Sources to Check:</h3>
      <ul>
        <li>Credit card statements (last 3 months)</li>
        <li>Bank account transactions</li>
        <li>PayPal or digital payment history</li>
        <li>Email receipts and confirmations</li>
      </ul>

      <h2>Step 2: Create a Subscription Inventory</h2>
      <p>List all active subscriptions including:</p>
      <ul>
        <li>Service name and purpose</li>
        <li>Monthly/annual cost</li>
        <li>Billing date</li>
        <li>Last used date</li>
        <li>Cancellation terms</li>
      </ul>

      <h2>Step 3: Categorize Your Subscriptions</h2>
      <p>Group subscriptions into categories:</p>
      <ul>
        <li>Entertainment (streaming, gaming)</li>
        <li>Productivity (software, cloud storage)</li>
        <li>Health & Wellness</li>
        <li>Education</li>
        <li>Others</li>
      </ul>

      <h2>Step 4: Evaluate Usage and Value</h2>
      <p>For each subscription, ask yourself:</p>
      <ul>
        <li>How often do I use this service?</li>
        <li>Does it provide unique value?</li>
        <li>Are there cheaper alternatives?</li>
        <li>Could I share this subscription with family?</li>
      </ul>

      <h2>Step 5: Make Informed Decisions</h2>
      <h3>Actions to Consider:</h3>
      <ul>
        <li>Keep as is</li>
        <li>Downgrade to a lower tier</li>
        <li>Switch to annual billing for savings</li>
        <li>Cancel immediately</li>
        <li>Cancel after current period</li>
      </ul>

      <h2>Step 6: Set Up a Tracking System</h2>
      <p>Implement a system to track:</p>
      <ul>
        <li>Renewal dates</li>
        <li>Usage patterns</li>
        <li>Total monthly subscription costs</li>
        <li>Free trial end dates</li>
      </ul>

      <h2>Step 7: Regular Maintenance</h2>
      <p>Schedule regular reviews:</p>
      <ul>
        <li>Monthly quick checks</li>
        <li>Quarterly detailed audits</li>
        <li>Annual comprehensive review</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Regular subscription audits help you maintain control over your digital spending and ensure you're getting value from every service you pay for. Make it a habit to review your subscriptions regularly and stay mindful of new commitments.</p>
    `,
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

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

// Get featured blog posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.featured);
}

// Get recent blog posts
export async function getRecentPosts(limit: number = 6): Promise<BlogPost[]> {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Get post by slug
export async function getArticleBySlug(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find(post => post.slug === slug);
  return post || null;
}

// Get all article slugs (for static generation)
export async function getAllArticleSlugs(): Promise<string[]> {
  return blogPosts.map(post => post.slug);
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
}

// Get posts by author
export async function getPostsByAuthor(authorName: string): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.author.name === authorName);
}

// Get all authors
export async function getAllAuthors(): Promise<Author[]> {
  const authorMap = new Map<string, Author>();
  blogPosts.forEach(post => {
    authorMap.set(post.author.name, post.author);
  });
  return Array.from(authorMap.values());
}
