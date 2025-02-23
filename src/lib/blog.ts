import { Author, BlogPost } from '@/types/blog';

// Blog posts data
const blogPosts: BlogPost[] = [
  // ... previous articles remain the same ...
  {
    slug: 'case-study-john-subscription-savings',
    title: "How We Helped John Save $2,340 on Annual Subscriptions",
    excerpt: "A real-world case study of how one user identified and eliminated unnecessary subscriptions for significant annual savings.",
    content: `
      <h2>Background</h2>
      <p>John, a 34-year-old software developer, came to us with a common problem: his subscription costs were spiraling out of control. This case study details how we helped him analyze and optimize his subscriptions for maximum savings.</p>

      <h2>Initial Situation</h2>
      <h3>John's Subscription Portfolio:</h3>
      <ul>
        <li>4 streaming services ($52/month)</li>
        <li>3 cloud storage services ($25/month)</li>
        <li>5 software subscriptions ($85/month)</li>
        <li>2 gaming services ($25/month)</li>
        <li>Various app subscriptions ($35/month)</li>
      </ul>

      <h2>Analysis Process</h2>
      <h3>Step 1: Subscription Audit</h3>
      <p>We helped John catalog all his active subscriptions and analyze:</p>
      <ul>
        <li>Monthly costs</li>
        <li>Usage frequency</li>
        <li>Feature overlap</li>
        <li>Alternative options</li>
      </ul>

      <h3>Step 2: Usage Analysis</h3>
      <p>Key findings from usage patterns:</p>
      <ul>
        <li>60% of streaming content watched on two services</li>
        <li>Multiple cloud storage services with low utilization</li>
        <li>Unused premium features in software subscriptions</li>
      </ul>

      <h2>Optimization Strategy</h2>
      <h3>1. Streaming Services</h3>
      <ul>
        <li>Consolidated to two primary services</li>
        <li>Implemented seasonal rotation for others</li>
        <li>Annual savings: $420</li>
      </ul>

      <h3>2. Cloud Storage</h3>
      <ul>
        <li>Consolidated to one service</li>
        <li>Moved to family plan</li>
        <li>Annual savings: $180</li>
      </ul>

      <h3>3. Software Subscriptions</h3>
      <ul>
        <li>Downgraded to appropriate tiers</li>
        <li>Switched to annual billing</li>
        <li>Annual savings: $540</li>
      </ul>

      <h3>4. Gaming Services</h3>
      <ul>
        <li>Consolidated to one primary service</li>
        <li>Annual savings: $180</li>
      </ul>

      <h3>5. App Subscriptions</h3>
      <ul>
        <li>Identified free alternatives</li>
        <li>Removed unused apps</li>
        <li>Annual savings: $300</li>
      </ul>

      <h2>Implementation</h2>
      <p>Changes were implemented gradually over one month:</p>
      <ul>
        <li>Week 1: Service consolidation</li>
        <li>Week 2: Plan optimizations</li>
        <li>Week 3: Cancellations</li>
        <li>Week 4: New system setup</li>
      </ul>

      <h2>Results</h2>
      <h3>Financial Impact:</h3>
      <ul>
        <li>Total annual savings: $2,340</li>
        <li>Monthly reduction: $195</li>
        <li>Savings percentage: 42%</li>
      </ul>

      <h3>Quality of Service:</h3>
      <ul>
        <li>No loss of essential features</li>
        <li>Improved organization</li>
        <li>Better utilization of services</li>
      </ul>

      <h2>Lessons Learned</h2>
      <p>Key takeaways from John's experience:</p>
      <ul>
        <li>Regular subscription audits are essential</li>
        <li>Feature overlap often goes unnoticed</li>
        <li>Alternative solutions can provide same value</li>
        <li>Small changes add up to significant savings</li>
      </ul>

      <h2>Conclusion</h2>
      <p>John's case demonstrates how systematic subscription management can lead to substantial savings without sacrificing service quality. His success story has become a blueprint for helping other users optimize their subscription spending.</p>
    `,
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
    content: `
      <h2>Introduction</h2>
      <p>As our lives become increasingly digital, it's important to understand the environmental impact of our subscription services. From streaming to cloud storage, each digital service has its own carbon footprint.</p>

      <h2>Understanding Digital Carbon Footprint</h2>
      <h3>Key Components:</h3>
      <ul>
        <li>Data center energy consumption</li>
        <li>Network infrastructure</li>
        <li>End-user device usage</li>
        <li>Hardware lifecycle impact</li>
      </ul>

      <h2>Impact by Service Type</h2>
      <h3>1. Video Streaming</h3>
      <p>Environmental considerations:</p>
      <ul>
        <li>Resolution impact on data usage</li>
        <li>Server farm energy consumption</li>
        <li>Content delivery networks</li>
        <li>Device efficiency</li>
      </ul>

      <h3>2. Cloud Storage</h3>
      <ul>
        <li>Data redundancy requirements</li>
        <li>Continuous server operation</li>
        <li>Backup systems</li>
        <li>Infrastructure cooling</li>
      </ul>

      <h3>3. Music Streaming</h3>
      <ul>
        <li>Lower data intensity than video</li>
        <li>Offline download impact</li>
        <li>Server maintenance</li>
      </ul>

      <h2>Reducing Your Digital Carbon Footprint</h2>
      <h3>Individual Actions:</h3>
      <ul>
        <li>Optimize streaming quality</li>
        <li>Use offline downloads strategically</li>
        <li>Manage cloud storage efficiently</li>
        <li>Choose eco-friendly providers</li>
      </ul>

      <h3>Service Provider Initiatives:</h3>
      <ul>
        <li>Renewable energy adoption</li>
        <li>Energy-efficient data centers</li>
        <li>Green hosting solutions</li>
        <li>Carbon offset programs</li>
      </ul>

      <h2>Future Outlook</h2>
      <p>Emerging trends in sustainable digital services:</p>
      <ul>
        <li>Green streaming technologies</li>
        <li>Energy-aware content delivery</li>
        <li>Sustainable data center design</li>
        <li>Consumer awareness tools</li>
      </ul>

      <h2>Recommendations</h2>
      <h3>For Consumers:</h3>
      <ul>
        <li>Audit digital consumption habits</li>
        <li>Choose sustainable service providers</li>
        <li>Optimize device settings</li>
        <li>Support green initiatives</li>
      </ul>

      <h2>Conclusion</h2>
      <p>While digital subscriptions offer convenience and value, it's important to consider their environmental impact. By making informed choices and supporting sustainable practices, we can help minimize the ecological footprint of our digital lifestyle.</p>
    `,
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