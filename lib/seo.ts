import { Attraction } from './types';

export function generateAttractionTitle(attraction: Attraction): string {
  return `${attraction.name} - Everything You Need to Know | Lisbon Cruise Guide`;
}

export function generateAttractionDescription(attraction: Attraction): string {
  const hours = attraction.visitingInformation.openingTimes.seasonal[0]?.hours || 'Check hours';
  const price = attraction.visitingInformation.admissionPrices.adult === 0
    ? 'Free entry'
    : `€${attraction.visitingInformation.admissionPrices.adult}`;

  return `Planning to visit ${attraction.name}? Get ${hours} hours, ${price} prices, photos & insider cruise passenger tips. ${attraction.tagline}`;
}

export function generateCategoryTitle(category: string, count: number): string {
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return `Best ${categoryName} in Lisbon - Top ${count} ${categoryName} for Cruise Passengers`;
}

export function generateCategoryDescription(category: string, count: number): string {
  const categoryName = category.replace(/-/g, ' ');
  return `Discover the best ${categoryName} in Lisbon. Compare ${count} options with photos, reviews, prices, and directions from cruise port. Find your perfect ${categoryName} today!`;
}

export function generateTagTitle(tag: string, count: number): string {
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return `Top ${tagName} Attractions in Lisbon - ${count} Options for Cruise Passengers`;
}

export function generateTagDescription(tag: string, count: number): string {
  const tagName = tag.replace(/-/g, ' ');
  return `${count} amazing ${tagName} attractions in Lisbon perfect for cruise passengers. Explore with photos, reviews, directions from port, and visitor information.`;
}

export function extractKeywords(attraction: Attraction): string {
  return [
    attraction.name,
    ...attraction.tags.slice(0, 5),
    ...attraction.categories.slice(0, 3),
    'Lisbon',
    'cruise port',
    'tourist attraction'
  ].join(', ');
}

export function formatPriceRange(priceRange: string): string {
  switch (priceRange) {
    case 'Free':
      return 'Free';
    case '$':
      return '€0-10';
    case '$$':
      return '€10-20';
    case '$$$':
      return '€20-30';
    case '$$$$':
      return '€30+';
    default:
      return 'Varies';
  }
}

export function generateStructuredData(attraction: Attraction) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.description.short,
    image: attraction.images.heroImage.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: attraction.location.address.street,
      addressLocality: attraction.location.address.city,
      addressRegion: attraction.location.address.region,
      postalCode: attraction.location.address.postal_code,
      addressCountry: 'PT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: attraction.location.coordinates.latitude,
      longitude: attraction.location.coordinates.longitude
    },
    telephone: attraction.contact.phone,
    url: attraction.contact.website,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: attraction.rating,
      reviewCount: attraction.reviewCount
    },
    priceRange: attraction.priceRange,
  };
}
