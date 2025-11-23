import Link from 'next/link';
import Image from 'next/image';
import { Attraction } from '@/lib/types';

interface AttractionCardProps {
  attraction: Attraction;
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="material-symbols-outlined fill text-[#FFC72C]">
          star
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-symbols-outlined fill text-[#FFC72C]">
          star_half
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-white overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={attraction.images.heroImage.url}
          alt={attraction.images.heroImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {attraction.visitingInformation.admissionPrices.adult === 0 && (
          <div className="absolute top-3 right-3 bg-[#FFC72C] text-[#003366] px-3 py-1 rounded-full text-sm font-bold">
            FREE
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-stretch justify-center gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#003366]">
            {attraction.name}
          </h2>
          <p className="text-base font-normal leading-normal text-slate-600 line-clamp-2">
            {attraction.tagline}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(attraction.rating)}
            </div>
            <span className="text-sm font-semibold text-slate-700">{attraction.rating}</span>
            <span className="text-sm text-slate-500">({attraction.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined !text-xl text-[#003366]">schedule</span>
            <span>{attraction.visitingInformation.averageVisitDuration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined !text-xl text-[#003366]">directions_walk</span>
            <span>{attraction.location.distanceFromCruisePort.walkingTime}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-[#003366]">
            {attraction.visitingInformation.admissionPrices.adult === 0
              ? 'Free'
              : `€${attraction.visitingInformation.admissionPrices.adult}`}
          </div>
          <div className="text-sm text-slate-600">{attraction.priceRange}</div>
        </div>

        <Link
          href={`/attractions/${attraction.id}`}
          className="flex h-11 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#003366] text-base font-medium text-white hover:bg-[#004080] transition-colors"
        >
          <span className="truncate">View Details</span>
        </Link>
      </div>
    </div>
  );
}
