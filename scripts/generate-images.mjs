// Generate all attraction images via Gemini (nano-banana-2 model) and convert to WebP.
// Key is read from process.env.GEMINI_API_KEY (passed at runtime, never hardcoded).
// Resumable: skips images whose target .webp already exists.
//
// Usage:
//   GEMINI_API_KEY=... node scripts/generate-images.mjs [--force] [--only=slug1,slug2]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { GoogleGenAI } from '/home/joaom/.npm/_npx/e576a9e37c97d4ed/node_modules/@google/genai/dist/node/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../public/data');
const IMG_DIR = path.join(__dirname, '../public/images/attractions');

const MODEL = 'gemini-3.1-flash-image-preview';
const RESOLUTION = '2K';
const CONCURRENCY = 4;
const WEBP_QUALITY = 80;
const MAX_WIDTH = 2048;

const FORCE = process.argv.includes('--force');
const onlyArg = process.argv.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? new Set(onlyArg.split('=')[1].split(',')) : null;

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set in env'); process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

fs.mkdirSync(IMG_DIR, { recursive: true });

function buildPrompt(att, img, kind) {
  const city = att.location?.address?.city || 'Lisbon';
  const neigh = att.location?.address?.neighborhood;
  const place = neigh && neigh !== city ? `${neigh}, ${city}` : city;
  const shot = kind === 'hero'
    ? 'Wide cinematic establishing shot.'
    : 'Detailed close scene.';
  return [
    'Photorealistic professional travel photography.',
    `${img.alt}.`,
    `${img.caption}.`,
    `${att.name} — ${place}, Portugal.`,
    shot,
    'Natural daylight or warm golden-hour light, vivid natural colors, sharp high detail,',
    'editorial travel-magazine quality, realistic.',
    'No text, no watermark, no logos, no captions, no signage lettering.',
  ].join(' ');
}

// Build the worklist: 3 slots per attraction.
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
const jobs = [];
for (const file of files) {
  const slug = file.replace(/\.json$/, '');
  if (ONLY && !ONLY.has(slug)) continue;
  const att = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  const hero = att.images?.heroImage;
  const gallery = att.images?.gallery || [];
  const slots = [
    { slot: 'hero', img: hero, aspect: '16:9', kind: 'hero' },
    ...gallery.map((g, i) => ({ slot: String(i + 1), img: g, aspect: '4:3', kind: 'gallery' })),
  ];
  for (const s of slots) {
    if (!s.img) continue;
    const target = path.join(IMG_DIR, `${slug}-${s.slot}.webp`);
    if (!FORCE && fs.existsSync(target)) continue;
    jobs.push({ slug, ...s, att, target });
  }
}

console.log(`Total jobs: ${jobs.length} (force=${FORCE})`);
let done = 0, failed = 0;
const failures = [];

async function genOne(job, attempt = 1) {
  const prompt = buildPrompt(job.att, job.img, job.kind);
  try {
    const resp = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: job.aspect, imageSize: RESOLUTION },
        thinkingConfig: { thinkingLevel: 'minimal' },
      },
    });
    const candidates = resp.candidates || [];
    let b64 = null;
    for (const c of candidates) {
      for (const p of (c.content?.parts || [])) {
        if (p.inlineData?.data) { b64 = p.inlineData.data; break; }
      }
      if (b64) break;
    }
    if (!b64) throw new Error('no image in response');
    const buf = Buffer.from(b64, 'base64');
    await sharp(buf)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(job.target);
    done++;
    console.log(`[${done + failed}/${jobs.length}] OK ${job.slug}-${job.slot}.webp`);
  } catch (err) {
    if (attempt < 3) {
      await new Promise(r => setTimeout(r, 1500 * attempt));
      return genOne(job, attempt + 1);
    }
    failed++;
    failures.push({ job: `${job.slug}-${job.slot}`, error: String(err?.message || err) });
    console.error(`[${done + failed}/${jobs.length}] FAIL ${job.slug}-${job.slot}: ${err?.message || err}`);
  }
}

// Simple concurrency pool.
async function run() {
  const queue = [...jobs];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const job = queue.shift();
      await genOne(job);
    }
  });
  await Promise.all(workers);
  console.log(`\nDONE. ok=${done} failed=${failed}`);
  if (failures.length) {
    fs.writeFileSync(path.join(__dirname, 'image-gen-failures.json'), JSON.stringify(failures, null, 2));
    console.log(`Failures written to scripts/image-gen-failures.json`);
  }
}

run();
