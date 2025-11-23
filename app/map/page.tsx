'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Attraction } from '@/lib/types';

// Import Leaflet dynamically to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Category color mapping
const categoryColors: { [key: string]: string } = {
  'monument': '#8B4513',
  'museum': '#9B59B6',
  'viewpoint': '#3498DB',
  'neighborhood': '#E74C3C',
  'church': '#F39C12',
  'palace': '#D4AF37',
  'aquarium': '#1ABC9C',
  'market': '#E67E22',
  'nightlife': '#E91E63',
  'park': '#27AE60',
  'experience': '#16A085',
  'bridge': '#95A5A6',
  'default': '#003366'
};

function getMarkerColor(attraction: Attraction): string {
  // Check main type first
  if (categoryColors[attraction.type]) {
    return categoryColors[attraction.type];
  }

  // Check categories array
  for (const category of attraction.categories) {
    if (categoryColors[category]) {
      return categoryColors[category];
    }
  }

  return categoryColors['default'];
}

function createCustomIcon(color: string) {
  if (typeof window === 'undefined') return undefined;

  const L = require('leaflet');

  const svgIcon = `
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z"
            fill="${color}"
            stroke="#fff"
            stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="#fff"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42]
  });
}

export default function MapPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Import Leaflet CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load attractions data from public JSON files
    async function loadAttractions() {
      try {
        // Fetch the list of JSON files
        const response = await fetch('/api/attractions');
        const data = await response.json();
        setAttractions(data);
      } catch (error) {
        console.error('Error loading attractions:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAttractions();

    // Import Leaflet library
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);
    });

    return () => {
      // Cleanup link on unmount
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Cruise port coordinates
  const cruisePortCoords: [number, number] = [38.7097, -9.1190];
  const lisbonCenter: [number, number] = [38.7223, -9.1393];

  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-4rem)]">
      {/* Legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="text-sm font-bold text-[#003366] mb-3">Map Legend</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
            <span className="text-slate-700">Cruise Port</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['monument'] }}></div>
            <span className="text-slate-700">Monuments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['museum'] }}></div>
            <span className="text-slate-700">Museums</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['viewpoint'] }}></div>
            <span className="text-slate-700">Viewpoints</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['neighborhood'] }}></div>
            <span className="text-slate-700">Neighborhoods</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['church'] }}></div>
            <span className="text-slate-700">Churches</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['market'] }}></div>
            <span className="text-slate-700">Markets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['nightlife'] }}></div>
            <span className="text-slate-700">Nightlife</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: categoryColors['default'] }}></div>
            <span className="text-slate-700">Other Attractions</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            <strong>{attractions.length}</strong> attractions displayed
          </p>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-[#003366]">map</span>
          <div>
            <h1 className="text-lg font-bold text-[#003366]">Lisbon Attractions Map</h1>
            <p className="text-xs text-slate-600">Click markers for details</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-full">
        {L && (
          <MapContainer
            center={lisbonCenter}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Cruise Port Marker */}
            {L && (
              <Marker
                position={cruisePortCoords}
                icon={L.divIcon({
                  html: `
                    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z"
                            fill="#EF4444"
                            stroke="#fff"
                            stroke-width="2"/>
                      <text x="20" y="22" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">⚓</text>
                    </svg>
                  `,
                  className: 'custom-marker',
                  iconSize: [40, 50],
                  iconAnchor: [20, 50],
                  popupAnchor: [0, -50]
                })}
              >
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-bold text-[#003366] mb-1">Cruise Port</h3>
                    <p className="text-xs text-slate-600">Your starting point</p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Attraction Markers */}
            {attractions.map((attraction) => {
              const position: [number, number] = [
                attraction.location.coordinates.latitude,
                attraction.location.coordinates.longitude
              ];
              const markerColor = getMarkerColor(attraction);

              return L ? (
                <Marker
                  key={attraction.id}
                  position={position}
                  icon={createCustomIcon(markerColor)}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-[#003366] mb-1">
                        {attraction.name}
                      </h3>
                      <p className="text-xs text-slate-600 mb-2">
                        {attraction.tagline}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-[#FFC72C] text-xs">★</span>
                        <span className="text-xs font-semibold">{attraction.rating}</span>
                        <span className="text-xs text-slate-500">
                          ({attraction.reviewCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mb-2">
                        <strong>Category:</strong> {attraction.type}
                      </div>
                      <div className="text-xs text-slate-600 mb-3">
                        <strong>Distance from port:</strong>{' '}
                        {attraction.location.distanceFromCruisePort.walkingTime}
                      </div>
                      <a
                        href={`/attractions/${attraction.id}`}
                        className="block text-center bg-[#003366] text-white text-xs py-2 px-3 rounded hover:bg-[#004488] transition-colors"
                      >
                        View Details
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ) : null;
            })}
          </MapContainer>
        )}
      </div>

      <style jsx global>{`
        .custom-marker {
          background: none;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
