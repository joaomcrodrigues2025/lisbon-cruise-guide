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
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={attraction.images.heroImage.url}
          alt={attraction.images.heroImage.alt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <Link href="/attractions" className="absolute top-6 left-6 flex items-center justify-center size-12 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl">
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
      <div className="px-4 py-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group flex flex-col gap-4 rounded-2xl border-2 border-[#003366]/10 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-[#003366] to-[#004488] text-white shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-3xl">schedule</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#003366] mb-1">Opening Hours</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{attraction.visitingInformation.openingTimes.seasonal[0]?.hours || 'Check website'}</p>
            </div>
          </div>
          <div className="group flex flex-col gap-4 rounded-2xl border-2 border-[#FFC72C]/20 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-[#FFC72C] to-[#FFD84D] text-[#003366] shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-3xl">confirmation_number</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#003366] mb-1">Admission Price</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {attraction.visitingInformation.admissionPrices.adult === 0 ? 'Free Entry' : `€${attraction.visitingInformation.admissionPrices.adult} per adult`}
              </p>
            </div>
          </div>
          <div className="group flex flex-col gap-4 rounded-2xl border-2 border-[#003366]/10 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-[#003366] to-[#004488] text-white shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#003366] mb-1">Visit Duration</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{attraction.visitingInformation.averageVisitDuration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-12 max-w-6xl mx-auto">
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#003366] via-[#FFC72C] to-[#003366] rounded-full opacity-50"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#004488] bg-clip-text text-transparent mb-6">About This Attraction</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-[#003366] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {attraction.description.full}
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {attraction.images.gallery && attraction.images.gallery.length > 0 && (
        <div className="px-4 py-12 bg-gradient-to-br from-white via-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#004488] bg-clip-text text-transparent mb-8">Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attraction.images.gallery.map((image, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm text-white font-medium leading-relaxed">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cruise Passenger Tips */}
      <div className="px-4 py-12 bg-gradient-to-br from-[#003366]/5 via-white to-[#FFC72C]/5">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#003366]/20 bg-gradient-to-br from-white to-[#003366]/5 p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC72C]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#003366]/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-[#003366] to-[#004488] text-white shadow-lg">
                <span className="material-symbols-outlined text-4xl">directions_boat</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#003366] mb-3 flex items-center gap-2">
                  Tips for Cruise Passengers
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#FFC72C] rounded-full">Essential Info</span>
                </h3>
                <p className="text-base text-slate-700 mb-4 leading-relaxed">{attraction.cruisePassengerInfo.accessibility}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-[#003366]/10 mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[#FFC72C]">schedule</span>
                  <p className="text-sm text-slate-700"><strong className="text-[#003366]">Time from port:</strong> {attraction.cruisePassengerInfo.timeNeededFromPort}</p>
                </div>
                <div className="space-y-3">
                  {attraction.cruisePassengerInfo.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 flex items-center justify-center size-6 rounded-full bg-[#FFC72C]/20 text-[#003366] group-hover:bg-[#FFC72C] group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="px-4 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#004488] bg-clip-text text-transparent mb-8">What Makes This Special</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {attraction.features.highlights.map((highlight, i) => (
            <li key={i} className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-[#FFC72C] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-[#FFC72C] to-[#FFD84D] shadow-md group-hover:shadow-lg transition-shadow">
                <span className="material-symbols-outlined text-[#003366] text-lg">star</span>
              </div>
              <span className="text-slate-700 leading-relaxed pt-1">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Location */}
      <div className="px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#003366] to-[#004488] bg-clip-text text-transparent mb-8">Getting There</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border-2 border-[#003366]/10 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-[#003366] text-white">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <h3 className="text-lg font-bold text-[#003366]">Address</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{attraction.location.address.street}, {attraction.location.address.city}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border-2 border-[#FFC72C]/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-[#FFC72C] text-[#003366]">
                  <span className="material-symbols-outlined">directions</span>
                </div>
                <h3 className="text-lg font-bold text-[#003366]">From Cruise Port</h3>
              </div>
              <p className="text-sm text-slate-700 mb-3 leading-relaxed">{attraction.location.directions.fromCruisePort}</p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="material-symbols-outlined text-[#FFC72C] text-lg">straighten</span>
                <span><strong>{attraction.location.distanceFromCruisePort.meters}m</strong> ({attraction.location.distanceFromCruisePort.walkingTime})</span>
              </div>
            </div>
          </div>
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
