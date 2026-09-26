'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Attraction } from '@/lib/types';

// Leaflet needs the browser, so the map itself is loaded client-side only
const LisbonMap = dynamic(() => import('@/components/LisbonMap'), {
  ssr: false,
  loading: () => <div className="flex h-[60vh] items-center justify-center bg-slate-100 text-slate-600">Loading map…</div>,
});

export default function MapPage() {
  const [attractions, setAttractions] = useState<Attraction[] | null>(null);

  useEffect(() => {
    fetch('/api/attractions')
      .then((res) => res.json())
      .then((data: Attraction[]) => setAttractions(data))
      .catch(() => setAttractions([]));
  }, []);

  if (!attractions) {
    return <div className="flex h-[60vh] items-center justify-center bg-slate-100 text-slate-600">Loading map…</div>;
  }
  return <LisbonMap attractions={attractions} />;
}
