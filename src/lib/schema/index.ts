interface SoftwareAppData {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  price: string;
  currency: string;
  ratingValue: number;
  ratingCount: number;
}

export function generateSoftwareAppSchema(data: SoftwareAppData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    applicationCategory: data.applicationCategory,
    operatingSystem: data.operatingSystem,
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.ratingValue,
      ratingCount: data.ratingCount,
      bestRating: '5',
      worstRating: '1'
    }
  };
}

interface FAQPageData {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function generateFAQSchema(data: FAQPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };
}

interface PricingData {
  name: string;
  price: string;
  currency: string;
  frequency: string;
  description: string;
  features: string[];
}

export function generateProductSchema(data: PricingData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  };
}

interface ReviewData {
  author: string;
  reviewBody: string;
  datePublished: string;
  ratingValue: number;
}

export function generateReviewSchema(data: ReviewData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: data.author
    },
    reviewBody: data.reviewBody,
    datePublished: data.datePublished,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.ratingValue,
      bestRating: '5',
      worstRating: '1'
    }
  };
}