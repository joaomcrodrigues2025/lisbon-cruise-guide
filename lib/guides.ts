export interface GuideSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  note?: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishedDate: string; // ISO date
  readingTime: string;
  heroImage?: string;
  heroImageAlt?: string;
  sections: GuideSection[];
  relatedAttractions?: string[]; // attraction ids
}

import { cruiseTerminalGuide } from './guides/cruise-terminal-guide';
import { itinerariesByTimeInPort } from './guides/itineraries-by-time-in-port';
import { terminalToBelem } from './guides/terminal-to-belem';
import { sintraOnACruiseStop } from './guides/sintra-on-a-cruise-stop';
import { alfamaWalkFromPort } from './guides/alfama-walk-from-port';
import { accessibleLisbonFromPort } from './guides/accessible-lisbon-from-port';
import { moneySafetyTouristTraps } from './guides/money-safety-tourist-traps';
import { rainyDayInLisbon } from './guides/rainy-day-in-lisbon';

export const guides: Guide[] = [
  cruiseTerminalGuide,
  itinerariesByTimeInPort,
  terminalToBelem,
  sintraOnACruiseStop,
  alfamaWalkFromPort,
  accessibleLisbonFromPort,
  moneySafetyTouristTraps,
  rainyDayInLisbon,
];

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
