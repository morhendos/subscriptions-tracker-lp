import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ArrowRight, Search, ChevronRight, Tag, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Subscriptions Tracker",
  description:
    "Tips, guides, and insights on managing subscriptions, saving money, and optimizing your recurring expenses",
  alternates: {
    canonical: "https://subscriptions-tracker.com/blog",
  },
};

function BlogPostCard({ title, excerpt, category, author, date, readTime, slug, image }) {
  return (
    <article className="group">
      <Link href={`/blog/${slug}`} className="block">
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={600}
            height={340}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        <Link href={`/blog/${slug}`} className="block">
          <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-4">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt={author.name}
              width={32}
              height={32}
            />
          </div>
          <span className="font-medium">{author.name}</span>
        </div>
      </div>
    </article>
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Family Subscription Sharing: Maximize Value While Staying Compliant",
      slug: "family-subscription-sharing",
      excerpt: "How to share subscription services with family members legally and ethically, while getting the most value for your money.",
      category: "Tips & Tricks",
      author: { name: "Carlos Mendez", role: "Consumer Rights Specialist" },
      date: "February 5, 2025",
      readTime: "9 min read",
      image: "/placeholder.svg"
    },
    {
      title: "The Hidden Cost of Free Trials: What to Watch Out For",
      slug: "hidden-cost-free-trials",
      excerpt: "Free trials can be great for testing services, but they often have hidden costs and conversion tactics. Here's what to be aware of.",
      category: "Consumer Protection",
      author: { name: "Emma Wilson", role: "Consumer Advocate" },
      date: "January 25, 2025",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Subscription Bundling: When It's Worth It (And When It's Not)",
      slug: "subscription-bundling-worth-it",
      excerpt: "A data-driven analysis of popular subscription bundles to determine which ones actually save you money and which are marketing gimmicks.",
      category: "Analysis",
      author: { name: "David Kim", role: "Data Scientist" },
      date: "January 18, 2025",
      readTime: "11 min read",
      image: "/placeholder.svg"
    },
    {
      title: "How We Helped John Save $2,340 on Annual Subscriptions",
      slug: "case-study-john-subscription-savings",
      excerpt: "A real-world case study of how one user identified and eliminated unnecessary subscriptions for significant annual savings.",
      category: "Case Studies",
      author: { name: "Maya Patel", role: "Customer Success Manager" },
      date: "January 10, 2025",
      readTime: "8 min read",
      image: "/placeholder.svg"
    },
    {
      title: "The Environmental Impact of Digital Subscriptions",
      slug: "environmental-impact-digital-subscriptions",
      excerpt: "Exploring the often-overlooked environmental considerations of our increasingly subscription-based digital consumption.",
      category: "Sustainability",
      author: { name: "Thomas Green", role: "Environmental Researcher" },
      date: "January 2, 2025",
      readTime: "9 min read",
      image: "/placeholder.svg"
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

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-10">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredPosts.map((post, index) => (
              <BlogPostCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                author={post.author}
                date={post.date}
                readTime={post.readTime}
                slug={post.slug}
                image={post.image}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                    image={post.image}
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
              
              {/* Popular Posts */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Most Popular</h3>
                <div className="space-y-4">
                  {featuredPosts.map((post, index) => (
                    <Link href={`/blog/${post.slug}`} key={index} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </Link>
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
              
              {/* Authors */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Our Writers</h3>
                <div className="space-y-4">
                  <Link href="#" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt="Author"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        Alex Chen
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Founder & CEO
                      </p>
                    </div>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt="Author"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        Sarah Johnson
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Financial Analyst
                      </p>
                    </div>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt="Author"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        Dr. Michael Wong
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Consumer Psychologist
                      </p>
                    </div>
                  </Link>
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
