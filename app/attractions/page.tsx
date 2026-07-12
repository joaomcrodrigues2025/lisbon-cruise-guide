import { getAllAttractions } from '@/lib/data';
import { CURATED_CATEGORIES } from '@/lib/taxonomy';
import AttractionCard from '@/components/AttractionCard';
import FilterChips from '@/components/FilterChips';
import SearchBar from '@/components/SearchBar';

export const metadata = {
  title: 'All Attractions in Lisbon | Complete Guide for Cruise Passengers',
  description: 'Browse all 70 tourist attractions in Lisbon with photos, reviews, prices, and directions from the cruise port. Find the perfect places to visit during your shore excursion.',
  alternates: {
    canonical: '/attractions',
  },
};

export default async function AttractionsPage() {
  const attractions = await getAllAttractions();

  return (
    <div className="relative flex flex-col w-full">
      <div className="px-4 pt-6">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">All Attractions</h1>
        <p className="text-slate-600 mb-6">Explore {attractions.length} amazing places in Lisbon</p>
        <SearchBar />
      </div>

      <FilterChips categories={CURATED_CATEGORIES.map((c) => ({ slug: c.slug, label: c.displayPlural }))} />

      <div className="px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </div>
    </div>
  );
}
