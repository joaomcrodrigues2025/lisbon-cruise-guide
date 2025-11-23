import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JINA_API_KEY = 'jina_286992baabee4127acd0e4a5a64c1510DooE9IPGUP6N5h6JYYHNniueedkN';
const DATA_DIR = path.join(__dirname, '../public/data');

// Sleep function for rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to search web and extract images using Jina AI Reader
async function searchWebForImages(query) {
  // Use Google search via Jina Reader to find image-rich pages
  const searchQuery = `${query} site:wikipedia.org OR site:visitlisboa.com OR site:timeout.com`;
  const jinaUrl = `https://r.jina.ai/https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

  try {
    const response = await fetch(jinaUrl, {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'X-Return-Format': 'markdown'
      }
    });

    if (!response.ok) {
      console.error(`Jina API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const markdown = await response.text();

    // Extract image URLs from markdown
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const images = [];
    let match;

    while ((match = imageRegex.exec(markdown)) !== null && images.length < 4) {
      const [, alt, url] = match;
      // Filter out small icons and non-photo images
      if (!url.includes('icon') && !url.includes('logo') &&
          (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png'))) {
        images.push({
          url: url,
          alt: alt || query,
          caption: alt || query
        });
      }
    }

    return images;
  } catch (error) {
    console.error(`Error searching images for "${query}":`, error.message);
    return [];
  }
}

// Function to get Wikipedia/official images using Jina Reader
async function getOfficialImages(attractionName, type) {
  console.log(`  Searching for images...`);
  const images = await searchWebForImages(`${attractionName} Lisbon Portugal`);

  if (images.length < 3) {
    // Try alternative search if not enough images
    await sleep(1000);
    const moreImages = await searchWebForImages(`${attractionName} Lisboa tourist attraction`);
    images.push(...moreImages);
  }

  // Remove duplicates based on URL
  const uniqueImages = [];
  const seenUrls = new Set();

  for (const img of images) {
    if (!seenUrls.has(img.url)) {
      seenUrls.add(img.url);
      uniqueImages.push(img);
    }
  }

  return uniqueImages.slice(0, 4);
}

// Function to update JSON file with new images
function updateAttractionImages(filePath, newImages) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (newImages.length > 0) {
    // Update hero image if we have at least one image
    data.images.heroImage = {
      url: newImages[0].url,
      alt: newImages[0].alt,
      caption: newImages[0].caption
    };

    // Update gallery with remaining images
    data.images.gallery = newImages.slice(1).map(img => ({
      url: img.url,
      alt: img.alt,
      caption: img.caption
    }));
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  Updated ${path.basename(filePath)} with ${newImages.length} images`);
}

// Main function to process all attractions
async function processAllAttractions() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

  console.log(`Found ${files.length} attraction files to process\n`);

  let processedCount = 0;
  let totalImages = 0;

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`\n[${processedCount + 1}/${files.length}] Processing: ${data.name}`);

    try {
      const images = await getOfficialImages(data.name, data.type);

      if (images.length > 0) {
        updateAttractionImages(filePath, images);
        totalImages += images.length;
        console.log(`  ✓ Added ${images.length} images`);
      } else {
        console.log(`  ✗ No images found`);
      }

      processedCount++;

      // Rate limiting between attractions
      await sleep(2000);
    } catch (error) {
      console.error(`  Error processing ${data.name}:`, error.message);
    }
  }

  console.log(`\n\n========================================`);
  console.log(`Processing Complete!`);
  console.log(`========================================`);
  console.log(`Attractions processed: ${processedCount}/${files.length}`);
  console.log(`Total images fetched: ${totalImages}`);
  console.log(`Average images per attraction: ${(totalImages / processedCount).toFixed(1)}`);
}

// Run the script
processAllAttractions().catch(console.error);
