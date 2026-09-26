import { Attraction } from './types';

// Straight-line distance in metres between two attractions
export function distanceBetween(a: Attraction, b: Attraction): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const { latitude: lat1, longitude: lon1 } = a.location.coordinates;
  const { latitude: lat2, longitude: lon2 } = b.location.coordinates;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371000 * Math.asin(Math.sqrt(h));
}
