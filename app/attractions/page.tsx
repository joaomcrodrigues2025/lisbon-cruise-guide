import { getAllAttractions, getAllCategories } from '@/lib/data';
import AttractionCard from '@/components/AttractionCard';
import FilterChips from '@/components/FilterChips';
import SearchBar from '@/components/SearchBar';

export const metadata = {
  title: 'All Attractions in Lisbon | Complete Guide for Cruise Passengers',
  description: 'Browse all 37 tourist attractions in Lisbon with photos, reviews, prices, and directions from cruise port. Find the perfect places to visit during your shore excursion.',
};

export default async function AttractionsPage() {
  const attractions = await getAllAttractions();
  const categories = await getAllCategories();

  return (
    <div className="relative flex flex-col w-full">
      <div className="px-4 pt-6">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">All Attractions</h1>
        <p className="text-slate-600 mb-6">Explore {attractions.length} amazing places in Lisbon</p>
        <SearchBar />
      </div>

      <FilterChips categories={categories} />

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
