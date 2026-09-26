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
import { lisbonToursForCruisePassengers } from './guides/lisbon-tours-for-cruise-passengers';
import { belemInThreeHours } from './guides/belem-in-three-hours';
import { cascaisOnAPortDay } from './guides/cascais-on-a-port-day';
import { firstTimeLisbonCruiseMistakes } from './guides/first-time-lisbon-cruise-mistakes';
import { lisboaCardForCruisePassengers } from './guides/lisboa-card-for-cruise-passengers';
import { lisbonAirportToCruiseTerminal } from './guides/lisbon-airport-to-cruise-terminal';
import { lisbonEveningOvernightCall } from './guides/lisbon-evening-overnight-call';
import { lisbonFoodNearCruiseTerminal } from './guides/lisbon-food-near-cruise-terminal';
import { lisbonOnAMonday } from './guides/lisbon-on-a-monday';
import { lisbonViewpointsRoute } from './guides/lisbon-viewpoints-route';
import { lisbonWeatherByMonthCruise } from './guides/lisbon-weather-by-month-cruise';
import { lisbonWithKidsCruise } from './guides/lisbon-with-kids-cruise';
import { prePostCruiseLisbon } from './guides/pre-post-cruise-lisbon';

export const guides: Guide[] = [
  cruiseTerminalGuide,
  itinerariesByTimeInPort,
  terminalToBelem,
  sintraOnACruiseStop,
  alfamaWalkFromPort,
  accessibleLisbonFromPort,
  moneySafetyTouristTraps,
  rainyDayInLisbon,
  lisbonToursForCruisePassengers,
  belemInThreeHours,
  cascaisOnAPortDay,
  firstTimeLisbonCruiseMistakes,
  lisboaCardForCruisePassengers,
  lisbonAirportToCruiseTerminal,
  lisbonEveningOvernightCall,
  lisbonFoodNearCruiseTerminal,
  lisbonOnAMonday,
  lisbonViewpointsRoute,
  lisbonWeatherByMonthCruise,
  lisbonWithKidsCruise,
  prePostCruiseLisbon,
];

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
