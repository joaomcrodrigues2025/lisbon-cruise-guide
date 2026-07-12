import { notFound } from 'next/navigation';
import { getAttractionsByCuratedCategory } from '@/lib/data';
import { CURATED_CATEGORIES, getCuratedCategory } from '@/lib/taxonomy';
import AttractionCard from '@/components/AttractionCard';
import FilterChips from '@/components/FilterChips';
import Link from 'next/link';

export const dynamicParams = false;

export async function generateStaticParams() {
  return CURATED_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const content = getCuratedCategory(category);
  if (!content) return {};

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical: `/categories/${category}`,
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: `/categories/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const content = getCuratedCategory(category);
  if (!content) notFound();

  const attractions = await getAttractionsByCuratedCategory(category);
  const countLabel =
    attractions.length === 1
      ? `1 ${content.displaySingular}`
      : `${attractions.length} ${content.displayPlural}`;

  return (
    <div className="relative flex flex-col w-full">
      <div className="px-4 pt-6 max-w-6xl mx-auto w-full">
        <nav className="text-sm text-slate-600 mb-4">
          <Link href="/" className="hover:text-[#003366]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/attractions" className="hover:text-[#003366]">Attractions</Link>
          <span className="mx-2">/</span>
          <span className="text-[#003366] font-semibold">{content.displayPlural.replace(/^\w/, (c) => c.toUpperCase())}</span>
        </nav>
        <h1 className="text-3xl font-bold text-[#003366] mb-4">{content.title.split('|')[0].trim()}</h1>
        <div className="prose prose-slate max-w-3xl mb-6">
          {content.intro.map((paragraph, i) => (
            <p key={i} className="text-slate-700 leading-relaxed mb-4">{paragraph}</p>
          ))}
        </div>
        <p className="text-sm font-semibold text-[#003366] mb-2">
          {countLabel} in this guide
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <FilterChips categories={CURATED_CATEGORIES.map((c) => ({ slug: c.slug, label: c.displayPlural }))} activeCategory={category} />
      </div>

      <div className="px-4 pb-8 max-w-6xl mx-auto w-full">
        {attractions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600 py-12">No attractions found in this category.</p>
        )}
      </div>
    </div>
  );
}
