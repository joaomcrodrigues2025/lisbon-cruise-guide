import { Attraction } from './types';
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

// Get featured attractions (top rated, ideal for cruise passengers)
export async function getFeaturedAttractions(limit: number = 6): Promise<Attraction[]> {
  const attractions = await getAllAttractions();
  return attractions
    .filter(attraction => attraction.cruisePassengerInfo.idealForCruisePassengers)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Get nearby attractions to a given attraction
export async function getNearbyAttractions(attractionId: string, limit: number = 4): Promise<Attraction[]> {
  const attraction = await getAttractionBySlug(attractionId);
  if (!attraction) return [];

  const allAttractions = await getAllAttractions();
  const nearbyIds = attraction.nearbyAttractions.map(n =>
    n.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  );

  return allAttractions
    .filter(a => nearbyIds.includes(a.id) && a.id !== attractionId)
    .slice(0, limit);
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
