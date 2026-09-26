// Downloads the published cruise call schedule of the Lisbon Cruise Terminal and saves it to
// lib/cruise-schedule.json. Run before a build: `node scripts/fetch-cruise-schedule.mjs`.
// On any failure the existing JSON is kept, so builds never break because the source is down.
import fs from 'node:fs';
import path from 'node:path';

const SOURCE_PAGE = 'https://lisboncruiseport.pt/schedule';
const ENDPOINT = 'https://lisboncruiseport.pt/wp-content/themes/mbcglobalports/includes/api/schedule.php';
const PAGE_SIZE = 10;
const MAX_PAGES = 80;
const OUT = path.join(process.cwd(), 'lib', 'cruise-schedule.json');

const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

// "25 Sep 2026 | 09:00" -> "2026-09-25T09:00"
function parseStamp(text) {
  const m = text.match(/(\d{1,2}) (\w{3}) (\d{4})\s*\|\s*(\d{2}:\d{2})/);
  if (!m || !MONTHS[m[2]]) return null;
  return `${m[3]}-${String(MONTHS[m[2]]).padStart(2, '0')}-${m[1].padStart(2, '0')}T${m[4]}`;
}

function parseRows(html) {
  const rows = [];
  const rowPattern =
    /<div class="eta">([\s\S]*?)<\/div><div class="etd">([\s\S]*?)<\/div><div class="shipname">([\s\S]*?)<\/div><div class="cruiseline">([\s\S]*?)<\/div><\/div>/g;
  let m;
  while ((m = rowPattern.exec(html)) !== null) {
    const strip = (cell) => decode(cell.replace(/<div class="hide-mobile mobile-schedule-title">[^<]*<\/div>/, ''));
    const arrival = parseStamp(strip(m[1]));
    const departure = parseStamp(strip(m[2]));
    const ship = strip(m[3]);
    const line = strip(m[4]);
    if (arrival && departure && ship) rows.push({ ship, line, arrival, departure });
  }
  return rows;
}

async function main() {
  const calls = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = `${ENDPOINT}?startIndex=${page * PAGE_SIZE}&site_id=45&lang=en`;
    const res = await fetch(url, { headers: { 'User-Agent': 'lisbon-cruise-guide.com schedule sync' } });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const rows = parseRows(await res.text());
    if (rows.length === 0) break;
    calls.push(...rows);
    if (rows.length < PAGE_SIZE) break;
  }
  if (calls.length === 0) throw new Error('No cruise calls parsed; source format may have changed');

  const unique = [...new Map(calls.map((c) => [`${c.ship}|${c.arrival}`, c])).values()].sort((a, b) =>
    a.arrival.localeCompare(b.arrival)
  );
  const data = { source: SOURCE_PAGE, fetchedAt: new Date().toISOString(), calls: unique };
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`Saved ${unique.length} cruise calls (${unique[0].arrival} to ${unique.at(-1).arrival}) to ${OUT}`);
}

main().catch((err) => {
  console.warn(`Cruise schedule not updated, keeping the existing file: ${err.message}`);
});
