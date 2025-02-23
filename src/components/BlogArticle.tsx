import React from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, ArrowLeft, User, Tag } from 'lucide-react';

interface Author {
  name: string;
  role: string;
}

interface BlogArticleProps {
  title: string;
  date: string;
  readTime: string;
  author: Author;
  category: string;
  children: React.ReactNode;
}

export default function BlogArticle({
  title,
  date,
  readTime,
  author,
  category,
  children
}: BlogArticleProps) {
  // Generate a consistent color based on category
  const getCategoryColor = (category: string) => {
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
    <article className="max-w-4xl mx-auto">
      {/* Navigation */}
      <Link
        href="/blog"
        className="inline-flex items-center text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to blog
      </Link>

      {/* Article header */}
      <header className="mb-16">
        <div className="space-y-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">{author.name}</span>
              <span className="text-sm">({author.role})</span>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article content */}
      <div className="prose-article">
        {children}
      </div>

      {/* Article footer */}
      <footer className="mt-16 pt-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="font-medium mb-1">Written by {author.name}</h4>
            <p className="text-sm text-muted-foreground">{author.role}</p>
          </div>
          
          <Link
            href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center text-sm hover:text-primary"
          >
            <Tag className="mr-2 h-4 w-4" />
            More from {category}
          </Link>
        </div>
      </footer>
    </article>
  );
}