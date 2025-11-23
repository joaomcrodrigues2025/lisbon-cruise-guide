import { getAllCategories, getAttractionsByCategory } from '@/lib/data';
import { generateCategoryTitle, generateCategoryDescription } from '@/lib/seo';
import AttractionCard from '@/components/AttractionCard';
import FilterChips from '@/components/FilterChips';
import Link from 'next/link';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const attractions = await getAttractionsByCategory(category);
  return {
    title: generateCategoryTitle(category, attractions.length),
    description: generateCategoryDescription(category, attractions.length),
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const attractions = await getAttractionsByCategory(category);
  const allCategories = await getAllCategories();
  
  const categoryName = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="relative flex flex-col w-full">
      <div className="px-4 pt-6">
        <nav className="text-sm text-slate-600 mb-4">
          <Link href="/" className="hover:text-[#003366]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/attractions" className="hover:text-[#003366]">Attractions</Link>
          <span className="mx-2">/</span>
          <span className="text-[#003366] font-semibold">{categoryName}</span>
        </nav>
        <h1 className="text-3xl font-bold text-[#003366] mb-2">Best {categoryName} in Lisbon</h1>
        <p className="text-slate-600 mb-6">Discover {attractions.length} {categoryName.toLowerCase()} perfect for cruise passengers</p>
      </div>

      <FilterChips categories={allCategories} activeCategory={category} />

      <div className="px-4 pb-8">
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
