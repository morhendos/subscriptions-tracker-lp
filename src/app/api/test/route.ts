import { NextResponse } from 'next/server';
import { getAllPosts, getArticleBySlug } from '@/lib/blog';

export async function GET() {
  const posts = await getAllPosts();
  const testArticle = await getArticleBySlug('subscription-services-overpaying');
  
  return NextResponse.json({
    totalPosts: posts.length,
    allSlugs: posts.map(post => post.slug),
    testArticle: testArticle ? 'found' : 'not found'
  });
}