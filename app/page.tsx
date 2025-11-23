import Link from 'next/link';
import { getFeaturedAttractions, getAllCategories, getStats } from '@/lib/data';
import AttractionCard from '@/components/AttractionCard';

export default async function HomePage() {
  const featuredAttractions = await getFeaturedAttractions(6);
  const categories = await getAllCategories();
  const stats = await getStats();

  return (
    <div className="relative flex flex-col w-full">
      {/* Hero Section */}
      <div
        className="relative flex h-screen min-h-[600px] w-full flex-col"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkw_S0dCYDvoCoE_ATzx8_waJrV-n3g2GGyga-tD4aAdRzuhVISyZcoqRnps6UpCXTK9wL50DfkcSvhqVlHHY6pKGBsoW5Rrqm6Xa14niHyHzs-OjoOLfnS7S6_t05YnT0pTJ-RIb_hIZIUVHN7Mwofg-_v6CivlHkYQeiLvKtXDwBrEZ-c5vtuwy1bvX94T3kANFoQ-YDEKTEHLLKzLwez_hBKRdnzUmI7OyGWLIdFxVuId6T_l_Y7ohFh0Ex3LEnJg5GqyGPw80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative flex flex-1 flex-col justify-center items-center p-6 text-white sm:p-8">
          <div className="flex flex-col items-center text-center max-w-3xl">
            <h1 className="text-white tracking-tight text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-4">
              Welcome to Lisbon
            </h1>
            <p className="mt-2 text-white/90 text-lg md:text-xl font-normal leading-normal max-w-2xl">
              Your guide to an unforgettable day in the city, optimized for cruise ship passengers
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFC72C]">{stats.totalAttractions}</div>
                <div className="text-sm text-white/80">Attractions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFC72C]">{stats.freeAttractions}</div>
                <div className="text-sm text-white/80">Free Entry</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFC72C]">{stats.wheelchairAccessible}</div>
                <div className="text-sm text-white/80">Accessible</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
              <Link
                href="/attractions"
                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-[#003366] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#004080] transition-colors"
              >
                <span className="truncate">Explore All Attractions</span>
              </Link>
              <Link
                href="/map"
                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-[#FFC72C] text-[#003366] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#FFD54F] transition-colors"
              >
                <span className="truncate">View Map</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Attractions Section */}
      <div className="px-4 py-12 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-[#003366] mb-2">Featured Attractions</h2>
        <p className="text-slate-600 mb-8">Top-rated attractions perfect for cruise passengers</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/attractions"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#003366] text-white font-semibold hover:bg-[#004080] transition-colors"
          >
            View All {stats.totalAttractions} Attractions
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-slate-50 px-4 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-[#003366] mb-2">Explore by Category</h2>
          <p className="text-slate-600 mb-8">Find attractions by type</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 12).map((category) => {
              const displayName = category
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-slate-200 group"
                >
                  <span className="material-symbols-outlined text-4xl text-[#003366] mb-2 group-hover:text-[#004080] transition-colors">
                    {getCategoryIcon(category)}
                  </span>
                  <span className="text-sm font-semibold text-center text-slate-700 group-hover:text-[#003366] transition-colors">
                    {displayName}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cruise Passenger Info Section */}
      <div className="px-4 py-12 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl p-8 md:p-12 text-white">
          <div className="flex items-start gap-4 mb-6">
            <span className="material-symbols-outlined text-[#FFC72C] text-5xl">directions_boat</span>
            <div>
              <h2 className="text-3xl font-bold mb-2">Perfect for Cruise Passengers</h2>
              <p className="text-white/90 text-lg">
                All attractions include distances from the cruise port, walking times, and insider tips
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#FFC72C] text-3xl">map</span>
              <div>
                <h3 className="font-bold mb-1">Easy to Navigate</h3>
                <p className="text-sm text-white/80">
                  Clear directions from the cruise port to every attraction
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#FFC72C] text-3xl">schedule</span>
              <div>
                <h3 className="font-bold mb-1">Time Optimized</h3>
                <p className="text-sm text-white/80">
                  Know exactly how long each visit takes including travel
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#FFC72C] text-3xl">tips_and_updates</span>
              <div>
                <h3 className="font-bold mb-1">Insider Tips</h3>
                <p className="text-sm text-white/80">
                  Expert advice specifically for cruise ship passengers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    'monument': 'account_balance',
    'museum': 'museum',
    'viewpoint': 'photo_camera',
    'church': 'church',
    'palace': 'castle',
    'park': 'park',
    'beach': 'beach_access',
    'market': 'shopping_bag',
    'neighborhood': 'location_city',
    'plaza': 'square',
    'tower': 'tower',
    'castle': 'castle',
    'aquarium': 'water',
    'cultural-attraction': 'theater_comedy',
    'historic-site': 'history_edu',
    'default': 'place',
  };

  return iconMap[category] || iconMap['default'];
}
