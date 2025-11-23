import fs from 'fs';
import path from 'path';

interface Attraction {
  id: string;
  name: string;
  categories: string[];
  tags: string[];
}

export function getAllAttractionData() {
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

  return attractions;
}

export function getAllCategories(): string[] {
  const attractions = getAllAttractionData();
  const categories = new Set<string>();

  attractions.forEach(attraction => {
    attraction.categories.forEach(category => categories.add(category));
  });

  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const attractions = getAllAttractionData();
  const tags = new Set<string>();

  attractions.forEach(attraction => {
    attraction.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getAttractionSlugs(): string[] {
  const attractions = getAllAttractionData();
  return attractions.map(a => a.id);
}
