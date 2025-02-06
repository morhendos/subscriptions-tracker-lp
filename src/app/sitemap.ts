import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://subscriptions-tracker.com'

function buildUrl(path: string) {
  return `${baseUrl}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages - highest priority
  const coreSections = [
    {
      url: buildUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: buildUrl('/features'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    },
    {
      url: buildUrl('/pricing'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    }
  ]

  // Blog and resources - medium priority
  const contentSections = [
    {
      url: buildUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: buildUrl('/resources'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: buildUrl('/guides'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }
  ]

  // Blog posts - dynamic content
  const blogPosts = [
    {
      url: buildUrl('/blog/subscription-management-guide'),
      lastModified: new Date('2025-02-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: buildUrl('/blog/save-money-on-subscriptions'),
      lastModified: new Date('2025-02-05'),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: buildUrl('/blog/subscription-tracking-tips'),
      lastModified: new Date('2025-02-04'),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }
  ]

  // Support and help sections
  const supportSections = [
    {
      url: buildUrl('/help'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: buildUrl('/faq'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: buildUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }
  ]

  // Legal and auxiliary pages - lowest priority
  const legalPages = [
    {
      url: buildUrl('/privacy'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: buildUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: buildUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }
  ]

  return [
    ...coreSections,
    ...contentSections,
    ...blogPosts,
    ...supportSections,
    ...legalPages
  ]
}