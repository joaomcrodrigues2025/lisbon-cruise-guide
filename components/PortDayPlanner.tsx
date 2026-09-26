'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AREAS, RETURN_MARGIN, buildPlan, formatTime, type AreaId, type Interest, type Mobility } from '@/lib/planner';

const INTERESTS: { id: Interest; label: string }[] = [
  { id: 'history', label: 'History' },
  { id: 'views', label: 'Viewpoints' },
  { id: 'food', label: 'Food' },
  { id: 'museums', label: 'Museums' },
  { id: 'family', label: 'With children' },
];

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const chip = (active: boolean) =>
  `px-3 py-2 rounded-lg border text-sm transition-colors ${
    active ? 'bg-[#003366] border-[#003366] text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-[#003366]'
  }`;

export default function PortDayPlanner() {
  const [arrival, setArrival] = useState('08:00');
  const [allAboard, setAllAboard] = useState('17:30');
  const [areas, setAreas] = useState<AreaId[]>(['alfama', 'baixa']);
  const [interests, setInterests] = useState<Interest[]>(['history', 'views']);
  const [mobility, setMobility] = useState<Mobility>('full');
  const [weekday, setWeekday] = useState<number | undefined>(undefined);

  // Prefill from the cruise calendar's "Plan this day" links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const valid = (v: string | null) => (v && /^\d{2}:\d{2}$/.test(v) ? v : null);
    const a = valid(params.get('arrival'));
    const b = valid(params.get('allAboard'));
    if (a) setArrival(a);
    if (b) setAllAboard(b);
    const d = params.get('date');
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) setWeekday(new Date(`${d}T12:00:00Z`).getUTCDay());
  }, []);

  const plan = useMemo(
    () => buildPlan({ arrival, allAboard, areas, interests, mobility, weekday }),
    [arrival, allAboard, areas, interests, mobility, weekday]
  );

  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <form className="space-y-6 rounded-xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm font-semibold text-[#003366]">
            Ashore from
            <input
              type="time"
              value={arrival}
              onChange={(e) => setArrival(e.target.value || '08:00')}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-normal text-slate-800"
            />
          </label>
          <label className="text-sm font-semibold text-[#003366]">
            All aboard
            <input
              type="time"
              value={allAboard}
              onChange={(e) => setAllAboard(e.target.value || '17:30')}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-normal text-slate-800"
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-[#003366]">
          Day in port
          <select
            value={weekday ?? ''}
            onChange={(e) => setWeekday(e.target.value === '' ? undefined : Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base font-normal text-slate-800"
          >
            <option value="">Not sure yet</option>
            {WEEKDAYS.map((name, i) => (
              <option key={name} value={i}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="text-sm font-semibold text-[#003366] mb-2">Where do you want to go?</legend>
          <div className="space-y-2">
            {AREAS.map((area) => (
              <label key={area.id} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 cursor-pointer hover:border-[#003366]">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-[#003366]"
                  checked={areas.includes(area.id)}
                  onChange={() => setAreas(toggle(areas, area.id))}
                />
                <span>
                  <span className="block font-semibold text-slate-800">{area.name}</span>
                  <span className="block text-sm text-slate-600">{area.summary}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-[#003366] mb-2">What do you enjoy?</legend>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button type="button" key={i.id} className={chip(interests.includes(i.id))} onClick={() => setInterests(toggle(interests, i.id))}>
                {i.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-[#003366] mb-2">Walking</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chip(mobility === 'full')} onClick={() => setMobility('full')}>
              Happy to walk and climb
            </button>
            <button type="button" className={chip(mobility === 'limited')} onClick={() => setMobility('limited')}>
              Limited mobility
            </button>
          </div>
        </fieldset>
      </form>

      <section aria-live="polite" className="rounded-xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-[#003366]">Your port day</h2>
          <p className="text-sm text-slate-600">{plan.hoursAshore.toFixed(1)} hours ashore</p>
        </div>

        {plan.warnings.length > 0 && (
          <ul className="mb-4 space-y-2">
            {plan.warnings.map((w) => (
              <li key={w} className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-900">
                {w}
              </li>
            ))}
          </ul>
        )}

        <ol className="space-y-3">
          {plan.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-24 shrink-0 text-sm font-mono text-slate-500 pt-0.5">
                {formatTime(item.start)}–{formatTime(item.end)}
              </span>
              {item.kind === 'visit' ? (
                <div>
                  <Link href={`/attractions/${item.stop.id}`} className="font-semibold text-[#003366] hover:underline">
                    {item.stop.name}
                  </Link>
                  {item.stop.note && <p className="text-sm text-slate-600">{item.stop.note}</p>}
                </div>
              ) : (
                <p className={`text-sm ${item.kind === 'return' ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                  {item.label}
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-lg bg-[#003366] px-4 py-3 text-white">
          <p className="font-bold">Back at the terminal by {formatTime(plan.backAtTerminal)}</p>
          <p className="text-sm text-white/80">
            All aboard at {allAboard}. The plan keeps at least {RETURN_MARGIN} minutes in hand, plus a traffic margin when
            returning by road.
          </p>
        </div>
      </section>
    </div>
  );
}
