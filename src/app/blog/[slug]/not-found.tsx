import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="py-16">
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the article you're looking for.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to blog
        </Link>
      </div>
    </main>
  );
}