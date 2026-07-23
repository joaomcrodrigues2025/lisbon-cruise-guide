import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllGuides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Lisbon Shore Guides for Cruise Passengers | Lisbon Cruise Guide',
  description:
    'Practical, in-depth Lisbon guides written for cruise passengers: terminal logistics, itineraries by hours in port, Belém transport, the honest Sintra answer, accessibility and more.',
  alternates: {
    canonical: '/guides',
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="relative flex flex-col w-full px-4 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-[#003366] mb-3">Shore Guides</h1>
      <p className="text-lg text-slate-600 mb-10 max-w-3xl">
        In-depth, practical guides written specifically for cruise passengers with a fixed number of hours in
        Lisbon. Real walking times, honest verdicts, no filler.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-shadow"
          >
            {guide.heroImage && (
              <div className="relative h-44 w-full">
                <Image
                  src={guide.heroImage}
                  alt={guide.heroImageAlt || guide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="flex flex-col gap-3 p-6">
              <h2 className="text-xl font-bold leading-tight text-[#003366] group-hover:text-[#004080]">
                {guide.title}
              </h2>
              <p className="text-slate-600 leading-relaxed line-clamp-3">{guide.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                <span>{guide.author}</span>
                <span aria-hidden>·</span>
                <span>{guide.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
