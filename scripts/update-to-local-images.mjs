import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dataDir = './public/data';
const imagePrefix = '/images/attractions';

// Get all JSON files
const files = readdirSync(dataDir).filter(f => f.endsWith('.json'));

console.log(`Found ${files.length} JSON files to update...`);

let updatedCount = 0;

files.forEach(file => {
  const filePath = join(dataDir, file);
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  const attractionId = data.id;

  // Update hero image
  if (data.images && data.images.heroImage) {
    data.images.heroImage.url = `${imagePrefix}/${attractionId}-hero.jpg`;
  }

  // Update gallery images
  if (data.images && data.images.gallery && Array.isArray(data.images.gallery)) {
    data.images.gallery = data.images.gallery.map((img, index) => ({
      ...img,
      url: `${imagePrefix}/${attractionId}-${index + 1}.jpg`
    }));
  }

  // Write back to file
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  updatedCount++;
  console.log(`✅ Updated ${attractionId}`);
});

console.log(`\n✅ Successfully updated ${updatedCount} attraction files!`);
console.log(`\nAll images now point to local files in ${imagePrefix}/`);
