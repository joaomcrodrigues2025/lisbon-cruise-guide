import { searchAttractions } from '@/lib/data';
import AttractionCard from '@/components/AttractionCard';
import SearchBar from '@/components/SearchBar';

export const metadata = {
  title: 'Search Attractions | Lisbon Shore Guide',
  description: 'Search for tourist attractions in Lisbon by name, category, or tag',
};

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  const results = query ? await searchAttractions(query) : [];

  return (
    <div className="relative flex flex-col w-full px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#003366] mb-6">Search Attractions</h1>
      <SearchBar />

      {query && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
