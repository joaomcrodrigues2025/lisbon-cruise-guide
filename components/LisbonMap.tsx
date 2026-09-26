'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import type { Attraction } from '@/lib/types';
import { canonicalizeCategory } from '@/lib/taxonomy';

const TERMINAL: [number, number] = [38.7104, -9.1263];

interface Group {
  id: string;
  label: string;
  color: string;
  categories: string[];
}

// Curated categories folded into a handful of map groups, checked in this order
const GROUPS: Group[] = [
  { id: 'daytrip', label: 'Day trips', color: '#475569', categories: ['day-trip', 'sintra-attractions'] },
  { id: 'museums', label: 'Museums', color: '#7C3AED', categories: ['museum'] },
  { id: 'food', label: 'Food, drink & fado', color: '#EA580C', categories: ['food-and-drink', 'fado-music'] },
  { id: 'history', label: 'Historic sites', color: '#92400E', categories: ['historic-site', 'religious-site'] },
  { id: 'views', label: 'Viewpoints', color: '#2563EB', categories: ['viewpoint'] },
  { id: 'areas', label: 'Neighbourhoods', color: '#DC2626', categories: ['neighborhood'] },
  { id: 'parks', label: 'Parks & family', color: '#16A34A', categories: ['garden', 'family-friendly'] },
];

function groupOf(a: Attraction): Group {
  const cats = new Set(a.categories.map(canonicalizeCategory).filter(Boolean) as string[]);
  return GROUPS.find((g) => g.categories.some((c) => cats.has(c))) ?? GROUPS.find((g) => g.id === 'history')!;
}

const dot = (color: string, active: boolean) =>
  L.divIcon({
    className: '',
    html: `<span style="display:block;width:${active ? 22 : 16}px;height:${active ? 22 : 16}px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)"></span>`,
    iconSize: active ? [22, 22] : [16, 16],
    iconAnchor: active ? [11, 11] : [8, 8],
    popupAnchor: [0, -10],
  });

const shipIcon = L.divIcon({
  className: '',
  html: '<span style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:9999px;background:#003366;border:3px solid #FFC72C;color:#FFC72C;font-size:20px;box-shadow:0 2px 6px rgba(0,0,0,.4)">⚓</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

function FlyTo({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [map, target]);
  return null;
}

export default function LisbonMap({ attractions }: { attractions: Attraction[] }) {
  const [active, setActive] = useState<Set<string>>(new Set(GROUPS.map((g) => g.id)));
  const [selected, setSelected] = useState<string | null>(null);
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  const items = useMemo(
    () =>
      attractions
        .map((a) => ({ a, group: groupOf(a) }))
        .sort((x, y) => x.a.location.distanceFromCruisePort.meters - y.a.location.distanceFromCruisePort.meters),
    [attractions]
  );
  const visible = items.filter(({ group }) => active.has(group.id));
  const selectedItem = items.find(({ a }) => a.id === selected);

  useEffect(() => {
    if (selected) markerRefs.current[selected]?.openPopup();
  }, [selected]);

  const toggle = (id: string) => {
    const next = new Set(active);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setActive(next.size === 0 ? new Set(GROUPS.map((g) => g.id)) : next);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
      <aside className="order-2 lg:order-1 lg:w-[380px] lg:shrink-0 lg:overflow-y-auto border-r border-slate-200 bg-white">
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-[#003366]">Lisbon Map for Cruise Passengers</h1>
          <p className="mt-1 text-sm text-slate-600">
            Sorted by distance from the ship. Times are measured walking routes from the Jardim do Tabaco terminal.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => toggle(g.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  active.has(g.id) ? 'border-slate-300 bg-white text-slate-800' : 'border-slate-200 bg-slate-100 text-slate-400'
                }`}
              >
                <span className="inline-block size-2.5 rounded-full" style={{ background: active.has(g.id) ? g.color : '#cbd5e1' }} />
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <ol className="divide-y divide-slate-100">
          {visible.map(({ a, group }) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => setSelected(a.id)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 ${selected === a.id ? 'bg-[#FFC72C]/15' : ''}`}
              >
                <span className="mt-1.5 inline-block size-3 shrink-0 rounded-full" style={{ background: group.color }} />
                <span className="min-w-0">
                  <span className="block font-semibold text-slate-800">{a.name}</span>
                  <span className="block text-sm text-slate-600">{a.location.distanceFromCruisePort.walkingTime}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <div className="order-1 lg:order-2 relative h-[60vh] lg:h-auto lg:flex-1">
        <MapContainer center={[38.712, -9.15]} zoom={13} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyTo target={selectedItem ? [selectedItem.a.location.coordinates.latitude, selectedItem.a.location.coordinates.longitude] : null} />

          {/* ~1 km and ~2 km straight-line rings: roughly 15 and 30 minutes on foot along real streets */}
          {[
            { r: 1000, label: '≈ 15 min walk' },
            { r: 2000, label: '≈ 30 min walk' },
          ].map(({ r, label }) => (
            <Circle
              key={r}
              center={TERMINAL}
              radius={r}
              pathOptions={{ color: '#003366', weight: 1.5, dashArray: '6 6', fillColor: '#003366', fillOpacity: r === 1000 ? 0.06 : 0.03 }}
            >
              <Tooltip direction="top" offset={[0, -4]} sticky>
                {label} from the ship (hills add time)
              </Tooltip>
            </Circle>
          ))}

          <Marker position={TERMINAL} icon={shipIcon} zIndexOffset={1000}>
            <Popup>
              <strong>Lisbon Cruise Terminal</strong>
              <br />
              Jardim do Tabaco. Rings show roughly 15 and 30 minutes on foot.
            </Popup>
          </Marker>

          {visible.map(({ a, group }) => (
            <Marker
              key={a.id}
              position={[a.location.coordinates.latitude, a.location.coordinates.longitude]}
              icon={dot(group.color, selected === a.id)}
              ref={(m) => {
                markerRefs.current[a.id] = m;
              }}
              eventHandlers={{ click: () => setSelected(a.id) }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <p className="font-bold text-[#003366] !m-0">{a.name}</p>
                  <p className="text-xs text-slate-500 !m-0 !mb-2">{group.label}</p>
                  <p className="text-sm !m-0">From the ship: {a.location.distanceFromCruisePort.walkingTime}</p>
                  <p className="text-sm !m-0 !mb-2">
                    {a.visitingInformation.admissionPrices.adult === 0 ? 'Free' : `Adult €${a.visitingInformation.admissionPrices.adult}`}
                    {' · '}
                    {a.visitingInformation.averageVisitDuration}
                  </p>
                  <Link
                    href={`/attractions/${a.id}`}
                    className="block rounded-lg bg-[#003366] px-3 py-2 text-center text-sm font-semibold !text-white !no-underline hover:bg-[#004080]"
                  >
                    View details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
