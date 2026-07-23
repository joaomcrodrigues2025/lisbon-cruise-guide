import { MetadataRoute } from 'next';
import { getAllAttractions } from '@/lib/data';
import { getAllGuides } from '@/lib/guides';
import { CURATED_CATEGORIES, SITE_URL } from '@/lib/taxonomy';

const LAST_MODIFIED = new Date('2026-07-23');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const attractions = await getAllAttractions();

  const attractionPages = attractions.map((attraction) => ({
    url: `${SITE_URL}/attractions/${attraction.id}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryPages = CURATED_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const guidePages = getAllGuides().map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/attractions`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/guides`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/map`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/image-credits`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${SITE_URL}/about`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [...staticPages, ...attractionPages, ...categoryPages, ...guidePages];
}
