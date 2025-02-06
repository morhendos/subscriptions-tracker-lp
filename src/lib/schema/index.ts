interface SoftwareAppData {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  price: string;
  currency: string;
  ratingValue: number;
  ratingCount: number;
  screenshotUrls?: string[];
}

export function generateSoftwareAppSchema(data: SoftwareAppData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    applicationCategory: data.applicationCategory,
    operatingSystem: data.operatingSystem,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.ratingValue,
      ratingCount: data.ratingCount,
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency,
      availability: 'https://schema.org/InStock'
    },
    ...(data.screenshotUrls && {
      screenshot: data.screenshotUrls.map(url => ({
        '@type': 'ImageObject',
        url
      }))
    })
  };
}

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}

export function generateOrganizationSchema(data: OrganizationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: {
      '@type': 'ImageObject',
      url: data.logo
    },
    ...(data.sameAs && { sameAs: data.sameAs })
  };
}

interface WebsiteData {
  name: string;
  description: string;
  organization: OrganizationData;
}

export function generateWebsiteSchema(data: WebsiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    description: data.description,
    url: data.organization.url,
    publisher: generateOrganizationSchema(data.organization)
  };
}