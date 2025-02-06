import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://subscriptions-tracker.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/api/',
          '/private/',
          '/*.json$',
          '/admin',
          '/temp/',
          '/draft/'
        ]
      },
      {
        userAgent: 'GPTBot',
        allow: ['/'],
        disallow: ['/api/']
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/api/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}