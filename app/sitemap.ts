import { MetadataRoute } from 'next';
import { getAllAttractions, getAllCategories, getAllTags } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const attractions = await getAllAttractions();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  const baseUrl = 'https://lisbonshore.com'; // Replace with your actual domain

  const attractionPages = attractions.map((attraction) => ({
    url: `${baseUrl}/attractions/${attraction.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/attractions`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/map`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...attractionPages,
    ...categoryPages,
    ...tagPages,
  ];
}
