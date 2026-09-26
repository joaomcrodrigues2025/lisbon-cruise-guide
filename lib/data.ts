import { Attraction } from './types';
import { canonicalizeCategory } from './taxonomy';
import { distanceBetween } from './distance';
import fs from 'fs';
import path from 'path';

// Get all attractions from JSON files
export async function getAllAttractions(): Promise<Attraction[]> {
  const dataDirectory = path.join(process.cwd(), 'public', 'data');
  const filenames = fs.readdirSync(dataDirectory);

  const attractions = filenames
    .filter(filename => filename.endsWith('.json'))
    .map(filename => {
      try {
        const filePath = path.join(dataDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents) as Attraction;
      } catch (error) {
        console.warn(`Warning: Could not parse ${filename}:`, error);
        return null;
      }
    })
    .filter((attraction): attraction is Attraction => attraction !== null);

  return attractions.sort((a, b) => a.name.localeCompare(b.name));
}

// Get single attraction by slug
export async function getAttractionBySlug(slug: string): Promise<Attraction | null> {
  try {
    const dataDirectory = path.join(process.cwd(), 'public', 'data');
    const filePath = path.join(dataDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Attraction;
  } catch (error) {
    return null;
  }
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const attractions = await getAllAttractions();
  const categories = new Set<string>();

  attractions.forEach(attraction => {
    attraction.categories.forEach(category => categories.add(category));
  });

  return Array.from(categories).sort();
}

// Get attractions by category
export async function getAttractionsByCategory(category: string): Promise<Attraction[]> {
  const attractions = await getAllAttractions();
  return attractions.filter(attraction =>
    attraction.categories.includes(category)
  );
}

// Get attractions by curated category, folding alias slugs into the canonical bucket
export async function getAttractionsByCuratedCategory(slug: string): Promise<Attraction[]> {
  const attractions = await getAllAttractions();
  return attractions.filter(attraction =>
    attraction.categories.some(category => canonicalizeCategory(category) === slug)
  );
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const attractions = await getAllAttractions();
  const tags = new Set<string>();

  attractions.forEach(attraction => {
    attraction.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

// Get attractions by tag
export async function getAttractionsByTag(tag: string): Promise<Attraction[]> {
  const attractions = await getAllAttractions();
  return attractions.filter(attraction =>
    attraction.tags.includes(tag)
  );
}

// Get all unique types
export async function getAllTypes(): Promise<string[]> {
  const attractions = await getAllAttractions();
  const types = new Set<string>();

  attractions.forEach(attraction => {
    types.add(attraction.type);
  });

  return Array.from(types).sort();
}

// Get attractions by type
export async function getAttractionsByType(type: string): Promise<Attraction[]> {
  const attractions = await getAllAttractions();
  return attractions.filter(attraction => attraction.type === type);
}

// Search attractions by query
export async function searchAttractions(query: string): Promise<Attraction[]> {
  const attractions = await getAllAttractions();
  const lowerQuery = query.toLowerCase();

  return attractions.filter(attraction =>
    attraction.name.toLowerCase().includes(lowerQuery) ||
    attraction.description.short.toLowerCase().includes(lowerQuery) ||
    attraction.tagline.toLowerCase().includes(lowerQuery) ||
    attraction.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    attraction.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
  );
}

// Hand-picked flagship sights shown on the homepage
const FEATURED_IDS = [
  'alfama',
  'mosteiro-dos-jeronimos',
  'castelo-de-sao-jorge',
  'miradouro-de-santa-luzia',
  'praca-do-comercio',
  'pasteis-de-belem',
];

export async function getFeaturedAttractions(limit: number = 6): Promise<Attraction[]> {
  const attractions = await getAllAttractions();
  return FEATURED_IDS.map((id) => attractions.find((a) => a.id === id))
    .filter((a): a is Attraction => a !== undefined)
    .slice(0, limit);
}

// Get the attractions geographically closest to a given attraction
export async function getNearbyAttractions(attractionId: string, limit: number = 4): Promise<Attraction[]> {
  const attraction = await getAttractionBySlug(attractionId);
  if (!attraction) return [];

  const allAttractions = await getAllAttractions();
  return allAttractions
    .filter((a) => a.id !== attractionId)
    .map((a) => ({ a, d: distanceBetween(attraction, a) }))
    .filter(({ d }) => d <= 3000)
    .sort((x, y) => x.d - y.d)
    .slice(0, limit)
    .map(({ a }) => a);
}

// Get statistics
export async function getStats() {
  const attractions = await getAllAttractions();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return {
    totalAttractions: attractions.length,
    totalCategories: categories.length,
    totalTags: tags.length,
    freeAttractions: attractions.filter(a => a.visitingInformation.admissionPrices.adult === 0).length,
    wheelchairAccessible: attractions.filter(a => a.features.accessibility.wheelchairAccessible).length,
    idealForCruisePassengers: attractions.filter(a => a.cruisePassengerInfo.idealForCruisePassengers).length,
  };
}
