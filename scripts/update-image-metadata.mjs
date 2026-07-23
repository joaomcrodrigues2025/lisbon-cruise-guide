/**
 * Syncs each attraction JSON's images block with the real photos fetched by
 * fetch-wikimedia-images.mjs (lib/image-credits.json):
 *  - replaced images get a Wikimedia attribution caption
 *  - gallery is trimmed to the files actually replaced
 *  - attractions with no real photo keep their image, labelled as AI-generated
 */
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = 'public/data';
const CREDITS_FILE = 'lib/image-credits.json';

const credits = JSON.parse(fs.readFileSync(CREDITS_FILE, 'utf8'));
const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));

let real = 0;
let ai = 0;

for (const f of files) {
  const p = path.join(DATA_DIR, f);
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  const id = d.id;
  const entry = credits[id];

  if (entry && entry.length > 0) {
    const hero = entry.find((e) => e.role === 'hero');
    const galleryEntries = entry.filter((e) => e.role !== 'hero');

    if (hero) {
      d.images.heroImage = {
        url: `/images/attractions/${hero.fname}`,
        alt: d.name,
        caption: `${d.name}. Photo: ${hero.author}, ${hero.license}, via Wikimedia Commons`,
      };
    }
    d.images.gallery = galleryEntries.map((g) => ({
      url: `/images/attractions/${g.fname}`,
      alt: d.name,
      caption: `${d.name}. Photo: ${g.author}, ${g.license}, via Wikimedia Commons`,
    }));
    real++;
  } else {
    // no real photo found — keep existing images but label honestly
    if (d.images.heroImage) {
      d.images.heroImage.caption = `Illustrative AI-generated image of ${d.name}`;
    }
    d.images.gallery = (d.images.gallery || []).map((g) => ({
      ...g,
      caption: `Illustrative AI-generated image of ${d.name}`,
    }));
    ai++;
  }

  fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
}

console.log(`Done. ${real} attractions with real photo metadata, ${ai} labelled AI-illustrative.`);
