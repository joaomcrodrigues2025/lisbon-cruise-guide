// Post-processing after image generation:
//  1. Set every image url in public/data JSONs to the deterministic .webp path
//     (/images/attractions/<slug>-hero.webp, -1.webp, -2.webp).
//  2. Verify each referenced .webp actually exists (report missing).
//  3. Delete stale .jpg files in public/images/attractions.
//  4. Mirror public/data -> ../sites so the Directory Builder staging matches.
//
// Run only AFTER generation has produced all webp files.
//   node scripts/finalize-images.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../public/data');
const IMG_DIR = path.join(__dirname, '../public/images/attractions');
const SITES_DIR = path.join(__dirname, '../../sites');

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
const missing = [];
let urlsFixed = 0;

for (const file of files) {
  const slug = file.replace(/\.json$/, '');
  const p = path.join(DATA_DIR, file);
  const att = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!att.images) continue;

  if (att.images.heroImage) {
    const url = `/images/attractions/${slug}-hero.webp`;
    if (att.images.heroImage.url !== url) { att.images.heroImage.url = url; urlsFixed++; }
    if (!fs.existsSync(path.join(IMG_DIR, `${slug}-hero.webp`))) missing.push(`${slug}-hero.webp`);
  }
  if (Array.isArray(att.images.gallery)) {
    att.images.gallery.forEach((g, i) => {
      const url = `/images/attractions/${slug}-${i + 1}.webp`;
      if (g.url !== url) { g.url = url; urlsFixed++; }
      if (!fs.existsSync(path.join(IMG_DIR, `${slug}-${i + 1}.webp`))) missing.push(`${slug}-${i + 1}.webp`);
    });
  }
  fs.writeFileSync(p, JSON.stringify(att, null, 2) + '\n');
}

console.log(`URLs updated to .webp: ${urlsFixed}`);
console.log(`Missing webp files referenced by JSON: ${missing.length}`);
if (missing.length) console.log(missing.join('\n'));

// Delete stale jpgs
const jpgs = fs.readdirSync(IMG_DIR).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
for (const j of jpgs) fs.unlinkSync(path.join(IMG_DIR, j));
console.log(`Deleted stale jpg files: ${jpgs.length}`);

// Mirror public/data -> sites (canonical = public/data)
fs.mkdirSync(SITES_DIR, { recursive: true });
const existingSites = fs.readdirSync(SITES_DIR).filter(f => f.endsWith('.json'));
for (const s of existingSites) fs.unlinkSync(path.join(SITES_DIR, s));
for (const file of files) {
  fs.copyFileSync(path.join(DATA_DIR, file), path.join(SITES_DIR, file));
}
console.log(`Synced ${files.length} JSON files to /sites (removed ${existingSites.length} stale).`);
