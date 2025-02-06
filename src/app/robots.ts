import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://subscriptions-tracker.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // General rules for all bots
        userAgent: '*',
        allow: [
          '/',
          '/features',
          '/pricing',
          '/blog',
          '/resources',
          '/guides',
          '/help',
          '/faq',
          '/about'
        ],
        disallow: [
          '/api/',
          '/private/',
          '/internal/',
          '/beta/',
          '/temp/',
          '/draft/',
          '/*?*', // Block URLs with query parameters
          '/*.json$', // Block direct access to JSON files
          '/*.xml$', // Block direct access to XML files
          '/app/', // Block access to app routes
          '/auth/', // Block access to auth routes
          '/dashboard/', // Block access to dashboard
          '/admin/', // Block access to admin area
          '/cdn-cgi/', // Block access to Cloudflare files
          '/.well-known/', // Block access to well-known directory
          '/wp-*', // Block WordPress-style paths
          '/wp-admin', // Block WordPress admin paths
          '/wp-content',
          '/wp-includes',
          '/node_modules',
          '/.git'
        ],
      },
      {
        // Specific rules for Google
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: [
          '/*.json$',
          '/api/',
          '/auth/'
        ]
      },
      {
        // Specific rules for Bing
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: [
          '/*.json$',
          '/api/',
          '/auth/'
        ]
      },
      {
        // GPTBot (OpenAI's crawler)
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/blog',
          '/features',
          '/pricing'
        ],
        disallow: [
          '/api/',
          '/auth/',
          '/app/',
          '/private/'
        ]
      },
      {
        // Rules for social media crawlers
        userAgent: ['Twitterbot', 'facebookexternalhit', 'LinkedInBot'],
        allow: [
          '/',
          '/blog',
          '/features'
        ],
        disallow: [
          '/api/',
          '/private/'
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}