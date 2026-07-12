import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lisbon Attractions Map | Lisbon Cruise Guide',
  description:
    'Interactive map of 70 Lisbon attractions for cruise passengers, with the cruise terminal marked and walking distances from the port.',
  alternates: {
    canonical: '/map',
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
