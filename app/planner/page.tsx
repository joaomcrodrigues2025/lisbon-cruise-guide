import type { Metadata } from 'next';
import Link from 'next/link';
import PortDayPlanner from '@/components/PortDayPlanner';

export const metadata: Metadata = {
  title: 'Lisbon Port Day Planner for Cruise Passengers | Lisbon Cruise Guide',
  description:
    'Enter your time ashore and all-aboard time and get a realistic, timed Lisbon itinerary from the cruise terminal, with walking times, lunch and a safe margin to get back to the ship.',
  alternates: {
    canonical: '/planner',
  },
};

const faqs = [
  {
    q: 'How much buffer does the planner leave before all-aboard?',
    a: 'Every plan has you back at the terminal at least 45 minutes before the all-aboard time printed in your ship’s daily programme. When the last stop is Belém, Parque das Nações or Sintra, it adds a further 20 minutes for traffic on the riverside avenue, which slows noticeably from late afternoon.',
  },
  {
    q: 'Where do the walking times come from?',
    a: 'Times from the ship are measured along real pedestrian routes from the Lisbon Cruise Terminal at Jardim do Tabaco. Between stops, the planner uses the distance between the two places with a 30% allowance for real streets, and slows the pace on hills and when you choose limited mobility.',
  },
  {
    q: 'Why does it leave out places I ticked?',
    a: 'Some areas are simply not safe on a short call. Belém needs about four hours ashore, Parque das Nações the same, and Sintra a full eight. If the numbers do not work, the planner drops the area and tells you why rather than squeezing it in.',
  },
  {
    q: 'Should I trust it over my ship’s instructions?',
    a: 'No. Your ship’s all-aboard time and the port agent’s advice always come first. Use the plan as a realistic starting point, check opening days (several monuments close on Mondays) and keep an eye on the clock.',
  },
];

export default function PlannerPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="max-w-3xl mb-8">
        <h1 className="text-4xl font-bold text-[#003366] mb-4">Lisbon Port Day Planner</h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Tell us when you can step ashore and when you must be back on board, pick the parts of Lisbon you want to see,
          and the planner builds a timed day from the cruise terminal: what to visit, in what order, when to eat and when
          to start heading back. It favours fewer places done properly over a sprint, and it will not plan a day that
          risks the gangway.
        </p>
      </header>

      <PortDayPlanner />

      <section className="max-w-3xl mt-12 space-y-4 text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-[#003366]">How the planner builds your day</h2>
        <p>
          It starts 20 minutes after your ashore time, because getting off a large ship is never instant. It then visits
          the farthest area first, while you are fresh and the traffic is light, and finishes in the old town next to the
          terminal, so the last leg back is a short walk rather than a taxi through rush hour. Within each area, stops are
          chosen by your interests and laid out in walking order, and a lunch break is added when the day runs through
          midday without a food stop.
        </p>
        <p>
          The visit times are what a cruise passenger realistically needs, not the maximum a monument could fill: 90 minutes
          for the Jerónimos Monastery or São Jorge Castle, 20 minutes for a viewpoint. For the reasoning behind each
          combination, read our{' '}
          <Link href="/guides/lisbon-itineraries-4-6-8-hours" className="text-[#003366] underline">
            itineraries for 4, 6 or 8 hours in port
          </Link>
          , and for the Sintra question in detail,{' '}
          <Link href="/guides/sintra-cruise-stop" className="text-[#003366] underline">
            is Sintra doable on a cruise stop
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold text-[#003366] pt-4">Questions</h2>
        <dl className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-slate-800">{f.q}</dt>
              <dd className="mt-1">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
