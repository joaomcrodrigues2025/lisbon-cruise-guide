import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lisbon Attractions Map | Lisbon Cruise Guide',
  description:
    'Interactive map of Lisbon attractions for cruise passengers, with the cruise terminal marked and walking distances from the port.',
  alternates: {
    canonical: '/map',
  },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-4 text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-[#003366]">Reading the map from the ship</h2>
        <p>
          The anchor marks the Lisbon Cruise Terminal at Jardim do Tabaco, where most ships berth. Everything in the old
          town clusters within about 2 km of it: Alfama and its viewpoints rise directly behind the terminal, the Baixa and
          Praça do Comércio sit a flat 15-minute walk west along the river, and Chiado and Bairro Alto are a further climb
          beyond. Belém, with the Jerónimos Monastery and Belém Tower, is the group of markers 7 km to the west, and
          Parque das Nações with the Oceanário is the cluster to the north-east: both need a taxi, train or tram.
        </p>
        <p>
          Distances on a map flatter Lisbon. The city is built on hills, so a viewpoint that looks 500 metres away can mean
          ten minutes of stairs. Each listing gives the walking time from the terminal measured along real streets, and
          notes the steep sections. To turn the map into a timed day that gets you back on board, use the{' '}
          <Link href="/planner" className="text-[#003366] underline">port day planner</Link>, or check how busy your day
          will be in the <Link href="/cruise-calendar" className="text-[#003366] underline">cruise ship calendar</Link>.
        </p>
      </section>
    </>
  );
}
