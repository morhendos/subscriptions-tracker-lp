import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, ArrowRight, Search, ChevronRight, Tag, Bookmark, TrendingUp, User, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Subscriptions Tracker",
  description:
    "Tips, guides, and insights on managing subscriptions, saving money, and optimizing your recurring expenses",
  alternates: {
    canonical: "https://subscriptions-tracker.com/blog",
  },
};

// Text-only blog card component - no images required
function BlogPostCard({ title, excerpt, category, author, date, readTime, slug }) {
  // Generate a consistent color based on category
  const getCategoryColor = (category) => {
    const colors = {
      "Money Saving": "bg-emerald-100 text-emerald-700",
      "Behavioral Finance": "bg-indigo-100 text-indigo-700",
      "Guides": "bg-blue-100 text-blue-700",
      "Industry Trends": "bg-purple-100 text-purple-700",
      "Tips & Tricks": "bg-amber-100 text-amber-700",
      "Consumer Protection": "bg-red-100 text-red-700",
      "Analysis": "bg-cyan-100 text-cyan-700",
      "Case Studies": "bg-orange-100 text-orange-700",
      "Sustainability": "bg-lime-100 text-lime-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <article className="group p-6 bg-card border rounded-lg hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Decorative element replacing image */}
      <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-80"></div>
      
      <div className="mb-4 flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
          {category}
        </span>
        <Bookmark className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <Link href={`/blog/${slug}`} className="block">
        <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
      
      <p className="text-muted-foreground mb-4 line-clamp-3">
        {excerpt}
      </p>
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            <span>{author.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// Featured blog card with decorative elements instead of images
function FeaturedBlogCard({ title, excerpt, category, author, date, readTime, slug }) {
  return (
    <article className="group p-6 bg-card border rounded-lg hover:shadow-md transition-shadow flex flex-col h-full relative overflow-hidden">
      {/* Decorative gradient background instead of image */}
      <div className="absolute inset-0 overflow-hidden rounded-lg opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/20"></div>
        <div className="absolute top-0 left-0 right-0 h-40 bg-primary/10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary/20"></div>
      </div>
      
      <div className="relative">
        {/* Featured tag */}
        <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground px-8 py-1 rotate-45 transform origin-bottom-right text-xs font-medium">
          Featured
        </div>
        
        <div className="mb-4 flex items-center">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {category}
          </span>
          <TrendingUp className="h-4 w-4 text-primary ml-2" />
        </div>
        
        <Link href={`/blog/${slug}`} className="block">
          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-6 flex-grow">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center text-sm">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
              {author.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-xs text-muted-foreground">{author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// Compact card for sidebar - no images
function CompactBlogCard({ title, date, slug }) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <div className="p-3 rounded-md hover:bg-muted transition-colors">
        <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2 mb-1">
          {title}
        </h4>
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3 mr-1" />
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}

// Author display without images
function AuthorCompact({ name, role }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <Link href="#" className="flex items-center gap-3 group">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
        {initials}
      </div>
      <div>
        <h4 className="font-medium group-hover:text-primary transition-colors">
          {name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {role}
        </p>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const featuredPosts = [
    {
      title: "10 Subscription Services You're Probably Overpaying For",
      slug: "subscription-services-overpaying",
      excerpt: "We analyzed thousands of user accounts to identify the most common subscription services people pay too much for, and how to optimize them.",
      category: "Money Saving",
      author: { name: "Sarah Johnson", role: "Financial Analyst" },
      date: "February 15, 2025",
      readTime: "8 min read",
      featured: true
    },
    {
      title: "The Psychology Behind Subscription Fatigue (And How to Beat It)",
      slug: "psychology-subscription-fatigue",
      excerpt: "Understanding the psychological mechanisms that make us reluctant to cancel unused subscriptions, and practical strategies to overcome them.",
      category: "Behavioral Finance",
      author: { name: "Dr. Michael Wong", role: "Consumer Psychologist" },
      date: "February 8, 2025",
      readTime: "10 min read",
      featured: true
    },
    {
      title: "How to Audit Your Subscriptions: A Step-by-Step Guide",
      slug: "audit-subscriptions-guide",
      excerpt: "A comprehensive guide to finding all your active subscriptions, evaluating their value, and making informed decisions about what to keep.",
      category: "Guides",
      author: { name: "Alex Chen", role: "Founder & CEO" },
      date: "January 29, 2025",
      readTime: "12 min read",
      featured: true
    }
  ];

  const recentPosts = [
    {
      title: "Subscription Model Trends to Watch in 2025",
      slug: "subscription-trends-2025",
      excerpt: "Analyzing emerging trends in subscription business models and what they mean for consumers in the coming year.",
      category: "Industry Trends",
      author: { name: "Leila Patel", role: "Market Analyst" },
      date: "February 12, 2025",
      readTime: "7 min read"
    },
    {
      title: "Family Subscription Sharing: Maximize Value While Staying Compliant",
      slug: "family-subscription-sharing",
      excerpt: "How to share subscription services with family members legally and ethically, while getting the most value for your money.",
      category: "Tips & Tricks",
      author: { name: "Carlos Mendez", role: "Consumer Rights Specialist" },
      date: "February 5, 2025",
      readTime: "9 min read"
    },
    {
      title: "The Hidden Cost of Free Trials: What to Watch Out For",
      slug: "hidden-cost-free-trials",
      excerpt: "Free trials can be great for testing services, but they often have hidden costs and conversion tactics. Here's what to be aware of.",
      category: "Consumer Protection",
      author: { name: "Emma Wilson", role: "Consumer Advocate" },
      date: "January 25, 2025",
      readTime: "6 min read"
    },
    {
      title: "Subscription Bundling: When It's Worth It (And When It's Not)",
      slug: "subscription-bundling-worth-it",
      excerpt: "A data-driven analysis of popular subscription bundles to determine which ones actually save you money and which are marketing gimmicks.",
      category: "Analysis",
      author: { name: "David Kim", role: "Data Scientist" },
      date: "January 18, 2025",
      readTime: "11 min read"
    },
    {
      title: "How We Helped John Save $2,340 on Annual Subscriptions",
      slug: "case-study-john-subscription-savings",
      excerpt: "A real-world case study of how one user identified and eliminated unnecessary subscriptions for significant annual savings.",
      category: "Case Studies",
      author: { name: "Maya Patel", role: "Customer Success Manager" },
      date: "January 10, 2025",
      readTime: "8 min read"
    },
    {
      title: "The Environmental Impact of Digital Subscriptions",
      slug: "environmental-impact-digital-subscriptions",
      excerpt: "Exploring the often-overlooked environmental considerations of our increasingly subscription-based digital consumption.",
      category: "Sustainability",
      author: { name: "Thomas Green", role: "Environmental Researcher" },
      date: "January 2, 2025",
      readTime: "9 min read"
    }
  ];

  const categories = [
    "Money Saving",
    "Guides",
    "Industry Trends",
    "Tips & Tricks",
    "Case Studies",
    "Analysis",
    "Behavioral Finance",
    "Consumer Protection",
    "Sustainability"
  ];

  const authors = [
    { name: "Alex Chen", role: "Founder & CEO" },
    { name: "Sarah Johnson", role: "Financial Analyst" },
    { name: "Dr. Michael Wong", role: "Consumer Psychologist" }
  ];

  return (
    <main className="pb-20">
      {/* Header */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Subscription Management Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert advice, tips, and insights to help you manage subscriptions smarter and save money.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="search"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search articles..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts - reimagined without images */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-10">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredPosts.map((post, index) => (
              <FeaturedBlogCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Posts Grid */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-10">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recentPosts.map((post, index) => (
                  <BlogPostCard
                    key={index}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    author={post.author}
                    date={post.date}
                    readTime={post.readTime}
                    slug={post.slug}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-16">
                <nav className="flex items-center gap-1">
                  <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    1
                  </span>
                  <Link href="#" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    2
                  </Link>
                  <Link href="#" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    3
                  </Link>
                  <span className="px-1">...</span>
                  <Link href="#" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4">
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </nav>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Categories */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-sm bg-background border rounded-full px-3 py-1 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Popular Posts - text-only version */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Most Popular</h3>
                <div className="divide-y">
                  {featuredPosts.map((post, index) => (
                    <CompactBlogCard
                      key={index}
                      title={post.title}
                      date={post.date}
                      slug={post.slug}
                    />
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-semibold mb-3">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get the latest articles, tips, and money-saving advice delivered directly to your inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-muted-foreground mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              
              {/* Authors - no images version */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Our Writers</h3>
                <div className="space-y-4">
                  {authors.map((author, index) => (
                    <AuthorCompact 
                      key={index}
                      name={author.name}
                      role={author.role}
                    />
                  ))}
                  <div className="pt-2">
                    <Link 
                      href="#" 
                      className="inline-flex items-center text-primary hover:underline text-sm"
                    >
                      View all writers
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Take Control of Your Subscriptions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Put the insights from our blog into practice with our subscription management platform.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
