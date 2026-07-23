import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { getAllAttractions } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Image Credits | Lisbon Cruise Guide',
  description:
    'Attribution for the photographs used on Lisbon Cruise Guide, sourced from Wikimedia Commons under free licences.',
  alternates: {
    canonical: '/image-credits',
  },
};

interface ImageCredit {
  role: string;
  fname: string;
  file: string;
  author: string;
  license: string;
  licenseUrl: string | null;
  sourceUrl: string;
}

function loadCredits(): Record<string, ImageCredit[]> {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'image-credits.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {};
  }
}

export default async function ImageCreditsPage() {
  const credits = loadCredits();
  const attractions = await getAllAttractions();
  const nameById = new Map(attractions.map((a) => [a.id, a.name]));
  const entries = Object.entries(credits).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="relative flex flex-col w-full px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-[#003366] mb-6">Image Credits</h1>

      <div className="space-y-4 text-slate-700 leading-relaxed mb-10">
        <p>
          The photographs on this site are sourced from{' '}
          <a href="https://commons.wikimedia.org" rel="noopener" className="text-[#003366] underline">
            Wikimedia Commons
          </a>{' '}
          and are used under their respective free licences (Creative Commons or public domain). We are grateful
          to the photographers who make their work freely available. Each image below links to its source page,
          where the full licence terms can be consulted. Images have been resized and converted to web formats;
          no other modifications were made.
        </p>
        <p>
          A small number of illustrative images on listings without suitable free photographs are AI-generated
          and are identified as such in their captions.
        </p>
        <p>
          If you are a rights holder and believe an image is credited incorrectly, please{' '}
          <Link href="/contact" className="text-[#003366] underline">contact us</Link> and we will correct or
          remove it promptly.
        </p>
      </div>

      <div className="space-y-8">
        {entries.map(([id, images]) => (
          <div key={id} className="border-b border-slate-200 pb-6">
            <h2 className="text-xl font-bold text-[#003366] mb-3">
              {id === '_site' ? (
                'Site imagery'
              ) : (
                <Link href={`/attractions/${id}`} className="hover:underline">
                  {nameById.get(id) || id}
                </Link>
              )}
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {images.map((img) => (
                <li key={img.fname}>
                  <a href={img.sourceUrl} rel="noopener" className="text-[#003366] underline">
                    {img.file.replace(/^File:/, '')}
                  </a>{' '}
                  — {img.author},{' '}
                  {img.licenseUrl ? (
                    <a href={img.licenseUrl} rel="noopener" className="underline">
                      {img.license}
                    </a>
                  ) : (
                    img.license
                  )}
                  , via Wikimedia Commons
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
