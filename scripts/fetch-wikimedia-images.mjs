/**
 * Replaces AI-generated attraction images with real, freely-licensed photos
 * from Wikipedia/Wikimedia Commons.
 *
 * Strategy per attraction:
 *   1. Wikipedia pageimage (high precision) -> hero candidate
 *   2. Commons full-text search -> additional candidates for hero/gallery
 * Downloads up to 3 images, converts to webp with sharp, overwrites
 * public/images/attractions/<id>-hero.webp / <id>-1.webp / <id>-2.webp
 * and writes attribution data to lib/image-credits.json.
 *
 * Usage: node scripts/fetch-wikimedia-images.mjs [id ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DATA_DIR = 'public/data';
const IMG_DIR = 'public/images/attractions';
const CREDITS_FILE = 'lib/image-credits.json';
const UA = 'LisbonCruiseGuideBot/1.0 (https://lisbon-cruise-guide.com; info@lisbon-cruise-guide.com)';

// Search overrides: [wikipediaArticleQuery, commonsSearchQuery]
const OVERRIDES = {
  'alfama': ['Alfama', 'Alfama Lisbon street'],
  'arco-da-rua-augusta': ['Rua Augusta Arch', 'Rua Augusta Arch Lisbon'],
  'azulejo-tile-painting-workshop': ['Museu Nacional do Azulejo', 'azulejo panel Lisbon blue tiles'],
  'bacalhau-cooking-class': [null, 'bacalhau dish Portugal'],
  'bairro-alto': ['Bairro Alto', 'Bairro Alto Lisbon street'],
  'basilica-da-estrela': ['Estrela Basilica', 'Basílica da Estrela Lisbon'],
  'by-the-wine': [null, 'Portuguese wine bottles cellar'],
  'cabo-da-roca': ['Cabo da Roca', 'Cabo da Roca cliffs'],
  'carmo-archaeological-museum': ['Carmo Convent (Lisbon)', 'Convento do Carmo Lisbon'],
  'cascais-coastal-town': ['Cascais', 'Cascais bay beach'],
  'castelo-de-sao-jorge': ['São Jorge Castle', 'Castelo de São Jorge Lisbon'],
  'castelo-dos-mouros': ['Castle of the Moors (Sintra)', 'Castelo dos Mouros Sintra'],
  'chiado': ['Chiado', 'Chiado Lisbon square'],
  'clube-de-fado': ['Fado', 'fado guitarra portuguesa performance'],
  'convento-do-carmo': ['Carmo Convent (Lisbon)', 'Carmo Convent ruins Lisbon'],
  'cork-workshop': [null, 'cork oak bark Portugal'],
  'dolphin-watching-tour': ['Common bottlenose dolphin', 'bottlenose dolphin jumping'],
  'lisbon-bike-tour': [null, 'bicycle path Lisbon river'],
  'segway-tour': [null, 'Segway tour tourists city'],
  'pastel-de-nata-cooking-class': ['Pastel de nata', 'pastel de nata pastry'],
  'traditional-fado-dinner-show': [null, 'fado restaurant singer Lisbon night'],
  'park-rooftop-bar': [null, 'rooftop terrace view Lisbon Bairro Alto'],
  'pink-street': [null, 'Rua Nova do Carvalho pink street Lisbon'],
  'pilar-7-bridge-experience': ['25 de Abril Bridge', 'Ponte 25 de Abril Lisbon'],
  'elevador-da-bica': ['Bica Funicular', 'Ascensor da Bica Lisbon'],
  'evora': ['Évora', 'Évora Roman temple'],
  'hop-on-hop-off-bus-tour': [null, 'sightseeing bus Lisbon'],
  'igreja-de-sao-roque': ['Igreja de São Roque', 'Igreja de São Roque Lisbon interior'],
  'jardim-zoologico': ['Lisbon Zoo', 'Jardim Zoológico Lisboa'],
  'lisbon-bike-tour': [null, 'cycling Lisbon riverside'],
  'lisbon-botanical-garden': ['Lisbon Botanical Garden', 'Jardim Botânico Lisboa'],
  'lisbon-food-tour': [null, 'pastel de nata'],
  'lisbon-tuk-tuk-tour': [null, 'tuk tuk Lisbon'],
  'lx-factory': ['LX Factory', 'LX Factory Lisbon'],
  'maat-museum': ['Museum of Art, Architecture and Technology', 'MAAT Lisbon'],
  'mercado-campo-de-ourique': [null, 'Mercado de Campo de Ourique'],
  'mercado-da-ribeira-food-hall': ['Mercado da Ribeira', 'Mercado da Ribeira Lisbon'],
  'miradouro-da-graca': ['Miradouro da Graça', 'Miradouro da Graça Lisbon'],
  'miradouro-da-senhora-do-monte': [null, 'Miradouro da Senhora do Monte Lisbon'],
  'miradouro-das-portas-do-sol': [null, 'Miradouro das Portas do Sol Lisbon'],
  'miradouro-de-santa-luzia': [null, 'Miradouro de Santa Luzia Lisbon'],
  'miradouro-de-sao-pedro-de-alcantara': [null, 'Miradouro de São Pedro de Alcântara'],
  'mosteiro-da-batalha': ['Batalha Monastery', 'Batalha Monastery'],
  'mosteiro-dos-jeronimos': ['Jerónimos Monastery', 'Jerónimos Monastery Lisbon'],
  'museu-do-fado': ['Fado Museum', 'Museu do Fado Lisbon'],
  'museu-maritimo-nacional': ['Navy Museum (Lisbon)', 'Museu de Marinha Lisbon'],
  'national-palace-of-sintra': ['Sintra National Palace', 'Sintra National Palace'],
  'nazare': ['Nazaré, Portugal', 'Nazaré Portugal waves'],
  'obidos': ['Óbidos, Portugal', 'Óbidos castle street'],
};

const args = process.argv.slice(2);

async function api(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function cleanHtml(s) {
  return (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

async function wikipediaPageImage(query) {
  const u = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&piprop=original|name&origin=*`;
  const j = await api(u);
  const pages = j.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  const orig = page?.original;
  if (!orig?.source) return null;
  const file = page.pageimage ? `File:${page.pageimage}` : null;
  return { url: orig.source, width: orig.width, height: orig.height, title: file, fromArticle: page.title };
}

async function commonsFileMeta(fileTitle) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|extmetadata|mime|size&origin=*`;
  const j = await api(u);
  const pages = j.query?.pages;
  if (!pages) return null;
  const info = Object.values(pages)[0]?.imageinfo?.[0];
  return info || null;
}

async function commonsSearch(query, limit = 10) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=${limit}&prop=imageinfo&iiprop=url|extmetadata|mime|size&origin=*`;
  const j = await api(u);
  const pages = j.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .sort((a, b) => (a.index || 0) - (b.index || 0))
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter((c) => c.info);
}

function usable(info) {
  if (!info) return false;
  if (!/image\/(jpeg|png)/.test(info.mime || '')) return false;
  if ((info.width || 0) < 900) return false;
  const meta = info.extmetadata || {};
  const lic = (meta.LicenseShortName?.value || '').toLowerCase();
  // accept public domain and CC licenses that allow reuse with attribution
  if (!lic) return false;
  if (lic.includes('cc by-nc') || lic.includes('cc by-nd')) return false;
  return lic.includes('cc') || lic.includes('public domain') || lic.includes('pd') || lic.includes('gfdl');
}

function creditOf(title, info) {
  const meta = info.extmetadata || {};
  return {
    file: title,
    author: cleanHtml(meta.Artist?.value) || 'Unknown author',
    license: meta.LicenseShortName?.value || 'See source',
    licenseUrl: meta.LicenseUrl?.value || null,
    sourceUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}`,
  };
}

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function saveWebp(buf, outPath, width) {
  await sharp(buf).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(outPath);
}

async function processAttraction(id, name) {
  const [wpQuery, commonsQuery] = OVERRIDES[id] || [name.replace(/\s*\(.*\)\s*/, ''), `${name.replace(/\s*\(.*\)\s*/, '')} Lisbon`];
  const picked = []; // {url, title, info}
  const seen = new Set();

  // 1. Wikipedia page image
  if (wpQuery) {
    try {
      const pi = await wikipediaPageImage(wpQuery);
      if (pi?.title) {
        const info = await commonsFileMeta(pi.title);
        if (usable(info)) {
          picked.push({ title: pi.title, info });
          seen.add(pi.title);
        }
      }
    } catch (e) {
      console.error(`  wp error ${id}: ${e.message}`);
    }
  }

  // 2. Commons search for the rest
  try {
    const results = await commonsSearch(commonsQuery, 12);
    for (const c of results) {
      if (picked.length >= 3) break;
      if (seen.has(c.title)) continue;
      if (!usable(c.info)) continue;
      picked.push(c);
      seen.add(c.title);
    }
  } catch (e) {
    console.error(`  commons error ${id}: ${e.message}`);
  }

  const saved = [];
  for (let i = 0; i < picked.length; i++) {
    const { title, info } = picked[i];
    const isHero = i === 0;
    const fname = isHero ? `${id}-hero.webp` : `${id}-${i}.webp`;
    try {
      // use a bounded thumb if original is huge
      const url = info.width > 2400 && info.thumburl ? info.thumburl : info.url;
      const buf = await download(url);
      await saveWebp(buf, path.join(IMG_DIR, fname), isHero ? 1600 : 1200);
      saved.push({ role: isHero ? 'hero' : `gallery-${i}`, fname, ...creditOf(title, info) });
    } catch (e) {
      console.error(`  save error ${id}/${fname}: ${e.message}`);
    }
  }
  return saved;
}

const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
const attractions = files.map((f) => {
  const d = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f)));
  return { id: d.id, name: d.name };
});
const todo = args.length ? attractions.filter((a) => args.includes(a.id)) : attractions;

const credits = fs.existsSync(CREDITS_FILE) ? JSON.parse(fs.readFileSync(CREDITS_FILE)) : {};
const misses = [];
for (const a of todo) {
  process.stdout.write(`${a.id} ... `);
  const saved = await processAttraction(a.id, a.name);
  if (saved.length === 0) {
    misses.push(a.id);
    console.log('MISS');
  } else {
    credits[a.id] = saved;
    console.log(`${saved.length} image(s)`);
  }
  await new Promise((r) => setTimeout(r, 300));
}

fs.writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2));
console.log(`\nDone. ${Object.keys(credits).length} attractions with real photos.`);
if (misses.length) console.log(`MISSES (kept AI image): ${misses.join(', ')}`);
