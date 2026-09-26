import schedule from './cruise-schedule.json';

export interface CruiseCall {
  ship: string;
  line: string;
  arrival: string; // local time, "YYYY-MM-DDTHH:MM"
  departure: string;
}

export interface CruiseDay {
  date: string; // "YYYY-MM-DD"
  calls: CruiseCall[];
}

export const SCHEDULE_SOURCE: string = schedule.source;
export const SCHEDULE_FETCHED_AT: string = schedule.fetchedAt;

// All-aboard is usually 30 minutes before departure; the ship's daily programme is the authority
export const ALL_ABOARD_BEFORE_DEPARTURE = 30;

export function getUpcomingCruiseDays(from: Date = new Date()): CruiseDay[] {
  const today = from.toISOString().slice(0, 10);
  const byDay = new Map<string, CruiseCall[]>();
  for (const call of schedule.calls as CruiseCall[]) {
    // A ship in port overnight appears on every day it is alongside
    const first = call.arrival.slice(0, 10);
    const last = call.departure.slice(0, 10);
    for (let d = new Date(`${first}T12:00:00Z`); d.toISOString().slice(0, 10) <= last; d.setUTCDate(d.getUTCDate() + 1)) {
      const key = d.toISOString().slice(0, 10);
      if (key < today) continue;
      byDay.set(key, [...(byDay.get(key) ?? []), call]);
    }
  }
  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, calls]) => ({ date, calls: calls.sort((a, b) => a.arrival.localeCompare(b.arrival)) }));
}

export function crowdLevel(day: CruiseDay): { label: string; tone: 'low' | 'mid' | 'high' } {
  if (day.calls.length >= 3) return { label: 'Very busy', tone: 'high' };
  if (day.calls.length === 2) return { label: 'Busy', tone: 'mid' };
  return { label: 'Quiet', tone: 'low' };
}

export function allAboardTime(call: CruiseCall): string {
  const [h, m] = call.departure.slice(11, 16).split(':').map(Number);
  const minutes = Math.max(0, h * 60 + m - ALL_ABOARD_BEFORE_DEPARTURE);
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}
