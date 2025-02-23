import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogArticle from '@/components/BlogArticle';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/blog';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Subscriptions Tracker',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${article.title} | Subscriptions Tracker Blog`,
    description: article.excerpt,
    alternates: {
      canonical: `https://subscriptions-tracker.com/blog/${params.slug}`,
    },
  };
}

// Generate static pages for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Page component
export default async function BlogPostPage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { content, ...metadata } = article;

  return (
    <main className="py-16">
      <div className="container px-4 mx-auto">
        <BlogArticle {...metadata}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </BlogArticle>
      </div>
    </main>
  );
}
