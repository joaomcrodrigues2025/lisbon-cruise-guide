import { getAllAttractions } from '@/lib/data';

export const metadata = {
  title: 'Map of Attractions | Lisbon Shore Guide',
  description: 'Interactive map showing all tourist attractions in Lisbon',
};

export default async function MapPage() {
  const attractions = await getAllAttractions();

  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
        <div className="text-center p-8">
          <span className="material-symbols-outlined text-6xl text-[#003366] mb-4">map</span>
          <h1 className="text-2xl font-bold text-[#003366] mb-2">Interactive Map</h1>
          <p className="text-slate-600 mb-6">Map showing all {attractions.length} attractions</p>
          <p className="text-sm text-slate-500">
            Interactive map integration would go here (Google Maps, Mapbox, etc.)
          </p>
        </div>
      </div>
    </div>
  );
}
