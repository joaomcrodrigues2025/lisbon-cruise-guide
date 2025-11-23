import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAttractionBySlug, getAllAttractions, getNearbyAttractions } from '@/lib/data';
import { generateAttractionTitle, generateAttractionDescription, generateStructuredData, extractKeywords } from '@/lib/seo';
import AttractionCard from '@/components/AttractionCard';

export async function generateStaticParams() {
  const attractions = await getAllAttractions();
  return attractions.map((attraction) => ({
    slug: attraction.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const attraction = await getAttractionBySlug(slug);
  if (!attraction) return {};

  return {
    title: generateAttractionTitle(attraction),
    description: generateAttractionDescription(attraction),
    keywords: extractKeywords(attraction),
    openGraph: {
      title: `${attraction.name} - Complete Visitor Guide`,
      description: attraction.tagline,
      images: [attraction.images.heroImage.url],
    },
  };
}

export default async function AttractionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const attraction = await getAttractionBySlug(slug);
  if (!attraction) notFound();

  const nearbyAttractions = await getNearbyAttractions(attraction.id);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="material-symbols-outlined fill text-[#FFC72C]">star</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="material-symbols-outlined fill text-[#FFC72C]">star_half</span>);
    }
    return stars;
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(attraction)) }}
      />

      {/* Hero Image */}
      <div className="relative h-80 w-full">
        <Image
          src={attraction.images.heroImage.url}
          alt={attraction.images.heroImage.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <Link href="/attractions" className="absolute top-4 left-4 flex items-center justify-center size-10 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      {/* Title and Actions */}
      <div className="px-4 py-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#003366]">{attraction.name}</h1>
          <p className="text-lg text-slate-600 mt-2">{attraction.tagline}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center">{renderStars(attraction.rating)}</div>
            <span className="font-bold text-[#003366]">{attraction.rating}</span>
            <span className="text-sm text-slate-600">({attraction.reviewCount.toLocaleString()} reviews)</span>
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="px-4 py-6 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="material-symbols-outlined text-[#003366] text-3xl">schedule</span>
            <div>
              <h2 className="text-base font-bold text-[#003366]">Hours</h2>
              <p className="text-sm text-slate-600">{attraction.visitingInformation.openingTimes.seasonal[0]?.hours || 'Check website'}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="material-symbols-outlined text-[#003366] text-3xl">confirmation_number</span>
            <div>
              <h2 className="text-base font-bold text-[#003366]">Price</h2>
              <p className="text-sm text-slate-600">
                {attraction.visitingInformation.admissionPrices.adult === 0 ? 'Free' : `€${attraction.visitingInformation.admissionPrices.adult} / adult`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="material-symbols-outlined text-[#003366] text-3xl">hourglass_empty</span>
            <div>
              <h2 className="text-base font-bold text-[#003366]">Duration</h2>
              <p className="text-sm text-slate-600">{attraction.visitingInformation.averageVisitDuration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#003366] mb-4">About</h2>
        <p className="text-base leading-relaxed text-slate-700 whitespace-pre-line">{attraction.description.full}</p>
      </div>

      {/* Cruise Passenger Tips */}
      <div className="px-4 py-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-[#003366]/20 bg-[#003366]/10 p-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[#003366] text-4xl">directions_boat</span>
              <div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">Tips for Cruise Passengers</h3>
                <p className="text-[#003366]/80 mb-4">{attraction.cruisePassengerInfo.accessibility}</p>
                <p className="text-sm text-[#003366]/80 mb-2"><strong>Time needed from port:</strong> {attraction.cruisePassengerInfo.timeNeededFromPort}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-[#003366]/80">
                  {attraction.cruisePassengerInfo.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#003366] mb-4">Highlights</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {attraction.features.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#FFC72C] mt-0.5">check_circle</span>
              <span className="text-slate-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Location */}
      <div className="px-4 py-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Location & Directions</h2>
          <p className="text-slate-700 mb-2">{attraction.location.address.street}, {attraction.location.address.city}</p>
          <p className="text-sm text-slate-600 mb-4"><strong>From cruise port:</strong> {attraction.location.directions.fromCruisePort}</p>
          <p className="text-sm text-slate-600"><strong>Distance:</strong> {attraction.location.distanceFromCruisePort.meters}m ({attraction.location.distanceFromCruisePort.walkingTime})</p>
        </div>
      </div>

      {/* Nearby Attractions */}
      {nearbyAttractions.length > 0 && (
        <div className="px-4 py-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Nearby Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyAttractions.map((nearby) => (
              <AttractionCard key={nearby.id} attraction={nearby} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
