import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ALL_ABOARD_BEFORE_DEPARTURE,
  SCHEDULE_FETCHED_AT,
  SCHEDULE_SOURCE,
  allAboardTime,
  crowdLevel,
  getUpcomingCruiseDays,
  type CruiseCall,
  type CruiseDay,
} from '@/lib/cruise-schedule';

// Re-render daily so past cruise days drop off
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Lisbon Cruise Ship Calendar: Which Ships Are in Port | Lisbon Cruise Guide',
  description:
    'Day-by-day calendar of cruise ships calling at Lisbon, with arrival and departure times, how busy each day is likely to be, and a one-click port day plan for your ship.',
  alternates: {
    canonical: '/cruise-calendar',
  },
};

const toneClass: Record<string, string> = {
  low: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  mid: 'bg-amber-50 text-amber-900 border-amber-200',
  high: 'bg-rose-50 text-rose-800 border-rose-200',
};

const dayLabel = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });

const monthLabel = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

const isMonday = (date: string) => new Date(`${date}T12:00:00Z`).getUTCDay() === 1;

function CallRow({ call, date }: { call: CruiseCall; date: string }) {
  const arrivesToday = call.arrival.startsWith(date);
  const leavesToday = call.departure.startsWith(date);
  const sameDay = arrivesToday && leavesToday;
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
      <span>
        <span className="font-semibold text-slate-800">{call.ship}</span>{' '}
        <span className="text-sm text-slate-500">{call.line}</span>
      </span>
      <span className="text-sm text-slate-600">
        {arrivesToday ? `in ${call.arrival.slice(11, 16)}` : 'in port overnight'}
        {' · '}
        {leavesToday ? `out ${call.departure.slice(11, 16)}` : 'stays overnight'}
        {sameDay && (
          <>
            {' · '}
            <Link
              href={`/planner?arrival=${call.arrival.slice(11, 16)}&allAboard=${allAboardTime(call)}&date=${date}`}
              className="text-[#003366] font-medium underline decoration-[#FFC72C] decoration-2 underline-offset-2"
            >
              Plan this day
            </Link>
          </>
        )}
      </span>
    </li>
  );
}

export default function CruiseCalendarPage() {
  const days = getUpcomingCruiseDays();
  const months = new Map<string, CruiseDay[]>();
  for (const day of days) {
    const key = day.date.slice(0, 7);
    months.set(key, [...(months.get(key) ?? []), day]);
  }
  const updated = new Date(SCHEDULE_FETCHED_AT).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <header className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold text-[#003366]">Lisbon Cruise Ship Calendar</h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Which ships are in Lisbon on the day you call, and how crowded the old town is likely to be. When three or four
          ships share a day, several thousand extra visitors head for the same castle, tram and viewpoints between 10:00
          and 15:00; knowing that in advance is the difference between queuing and walking straight in.
        </p>
        <p className="text-sm text-slate-500">
          Source: the published schedule of the{' '}
          <a href={SCHEDULE_SOURCE} rel="noopener" className="underline">
            Lisbon Cruise Terminal
          </a>
          , last updated {updated}. The terminal publishes about three months ahead, and times change with weather and
          operations: your ship&apos;s daily programme is always the authority.
        </p>
      </header>

      <section className="mb-10 rounded-xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] space-y-3 text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-[#003366]">How to use it</h2>
        <p>
          <strong>Quiet</strong> means one ship in port, <strong>Busy</strong> two, and <strong>Very busy</strong> three or
          more. On busy days, start with the sights the crowds reach last: go west to Belém first, or climb to the castle
          at opening time before the tour coaches arrive, and leave the riverside squares for the afternoon.
        </p>
        <p>
          &ldquo;Plan this day&rdquo; opens the <Link href="/planner" className="text-[#003366] underline">port day planner</Link>{' '}
          with your ship&apos;s times filled in, assuming all-aboard {ALL_ABOARD_BEFORE_DEPARTURE} minutes before departure.
          Mondays are flagged because the Jerónimos Monastery, Belém Tower, the Fado Museum and several other museums close
          that day; our{' '}
          <Link href="/guides/lisbon-cruise-port-day-monday" className="text-[#003366] underline">Monday port day guide</Link>{' '}
          lists what stays open.
        </p>
      </section>

      {days.length === 0 && <p className="text-slate-700">No upcoming calls are published at the moment.</p>}

      {[...months.entries()].map(([month, monthDays]) => (
        <section key={month} className="mb-10">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">{monthLabel(`${month}-01`)}</h2>
          <ol className="space-y-3">
            {monthDays.map((day) => {
              const crowd = crowdLevel(day);
              return (
                <li key={day.date} className="rounded-xl bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-800">{dayLabel(day.date)}</h3>
                    <span className="flex flex-wrap gap-2">
                      {isMonday(day.date) && (
                        <Link
                          href="/guides/lisbon-cruise-port-day-monday"
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-semibold text-slate-700 hover:border-[#003366]"
                        >
                          Monday: several museums closed
                        </Link>
                      )}
                      <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${toneClass[crowd.tone]}`}>
                        {crowd.label} · {day.calls.length} {day.calls.length === 1 ? 'ship' : 'ships'}
                      </span>
                    </span>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {day.calls.map((call) => (
                      <CallRow key={`${call.ship}-${call.arrival}`} call={call} date={day.date} />
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
