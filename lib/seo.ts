import { Attraction } from './types';
import { SITE_URL } from './taxonomy';

export function generateAttractionTitle(attraction: Attraction): string {
  return `${attraction.name} - Everything You Need to Know | Lisbon Cruise Guide`;
}

export function generateAttractionDescription(attraction: Attraction): string {
  const short = attraction.description.short.trim();
  if (short.length <= 155) return short;
  return `${short.slice(0, 152).replace(/\s+\S*$/, '')}…`;
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
  const pageUrl = `${SITE_URL}/attractions/${attraction.id}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.description.short,
    image: `${SITE_URL}${attraction.images.heroImage.url}`,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
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
    sameAs: attraction.contact.website ? [attraction.contact.website] : undefined,
    priceRange: attraction.priceRange,
  };
}
