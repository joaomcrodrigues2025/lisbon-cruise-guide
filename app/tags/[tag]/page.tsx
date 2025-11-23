import { getAllTags, getAttractionsByTag } from '@/lib/data';
import { generateTagTitle, generateTagDescription } from '@/lib/seo';
import AttractionCard from '@/components/AttractionCard';
import Link from 'next/link';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const attractions = await getAttractionsByTag(tag);
  return {
    title: generateTagTitle(tag, attractions.length),
    description: generateTagDescription(tag, attractions.length),
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const attractions = await getAttractionsByTag(tag);
  const tagName = tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="relative flex flex-col w-full px-4 py-8 max-w-7xl mx-auto">
      <nav className="text-sm text-slate-600 mb-4">
        <Link href="/" className="hover:text-[#003366]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#003366] font-semibold">{tagName}</span>
      </nav>
      <h1 className="text-3xl font-bold text-[#003366] mb-2">Top {tagName} Attractions</h1>
      <p className="text-slate-600 mb-8">{attractions.length} attractions tagged with {tagName.toLowerCase()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
}
