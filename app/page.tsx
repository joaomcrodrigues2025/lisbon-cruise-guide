import type { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedAttractions, getStats } from '@/lib/data';
import { CURATED_CATEGORIES } from '@/lib/taxonomy';
import AttractionCard from '@/components/AttractionCard';

export const metadata: Metadata = {
  title: 'Lisbon Cruise Guide | 70 Attractions for Cruise Passengers',
  description:
    'Independent guide to Lisbon for cruise ship passengers: 70 attractions with prices, opening hours, walking times from the cruise terminal, and insider tips.',
  alternates: {
    canonical: '/',
  },
};

const FAQS = [
  {
    question: 'How far is the Lisbon cruise terminal from the city centre?',
    answer:
      'Very close. Ships dock at the Lisbon Cruise Terminal (Santa Apolónia / Jardim do Tabaco), directly below the Alfama district. You can walk into the oldest part of the city in about 10 minutes, and reach Praça do Comércio, the main riverside square, in roughly 20 to 25 minutes on foot along the waterfront.',
  },
  {
    question: 'Can I visit Sintra on a cruise stop?',
    answer:
      'Yes, if your ship is in port for at least 9 hours and you plan carefully. Sintra is about 30 km away; a realistic visit means choosing one palace, pre-booking tickets, and allowing 6 to 7 hours for the round trip. Always plan to be back in central Lisbon two hours before your all-aboard time.',
  },
  {
    question: 'Is the Lisboa Card worth it for one day?',
    answer:
      'It depends on your plans. The Lisboa Card includes public transport plus free or discounted entry to many attractions, including several in Belém. It usually pays off if you visit two or more paid monuments and use the tram or train. For a day spent mostly walking Alfama and the viewpoints, you may not need it.',
  },
  {
    question: 'What can I see in Lisbon for free?',
    answer:
      'A great deal. The miradouro viewpoints, the Alfama and Baixa districts, Praça do Comércio, the riverside promenade, and most churches are free. Belém’s monuments can be admired from outside at no cost, and window-shopping the historic streets of Chiado costs nothing at all.',
  },
  {
    question: 'How do I get from the cruise port to Belém?',
    answer:
      'Take tram 15E from Praça do Comércio (about 20 minutes’ walk or a short taxi from the terminal) towards Belém, or take a taxi or ride-hailing car directly from the port, which takes about 15 to 20 minutes depending on traffic. Allow half a day for Belém including travel.',
  },
  {
    question: 'Is Lisbon walkable from the cruise terminal?',
    answer:
      'Yes, more than almost any cruise port in Europe, but expect hills. Alfama, the cathedral, the castle and downtown are all reachable on foot. Wear comfortable shoes with grip: the traditional calçada pavements are beautiful but can be slippery, and the old town lanes are steep.',
  },
];

export default async function HomePage() {
  const featuredAttractions = await getFeaturedAttractions(6);
  const stats = await getStats();

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="relative flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Hero Section */}
      <div
        className="relative flex h-screen min-h-[600px] w-full flex-col"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.7) 100%), url('/images/lisbon-hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative flex flex-1 flex-col justify-center items-center p-6 text-white sm:p-8">
          <div className="flex flex-col items-center text-center max-w-3xl">
            <h1 className="text-white tracking-tight text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-4" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6)' }}>
              Welcome to Lisbon
            </h1>
            <p className="mt-2 text-white text-lg md:text-xl font-semibold leading-normal max-w-2xl" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 3px 12px rgba(0, 0, 0, 0.7)' }}>
              Your guide to an unforgettable day in the city, optimized for cruise ship passengers
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFC72C]">{stats.totalAttractions}</div>
                <div className="text-sm text-white/80">Attractions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFC72C]">{stats.freeAttractions}</div>
                <div className="text-sm text-white/80">Free Entry</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFC72C]">{stats.wheelchairAccessible}</div>
                <div className="text-sm text-white/80">Accessible</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
              <Link
                href="/attractions"
                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-[#003366] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#004080] transition-colors"
              >
                <span className="truncate">Explore All Attractions</span>
              </Link>
              <Link
                href="/map"
                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-[#FFC72C] text-[#003366] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#FFD54F] transition-colors"
              >
                <span className="truncate">View Map</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Intro */}
      <div className="px-4 py-12 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-[#003366] mb-6">A Cruise Passenger’s Guide to Lisbon</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Most travel guides assume you have a week in Lisbon. You have eight hours, a gangway that closes at a fixed time,
            and a city of seven hills between you and the highlights. This guide is built for exactly that situation.
          </p>
          <p>
            Every one of the {stats.totalAttractions} attractions covered here is described from a cruise passenger’s point of view:
            how far it is from the terminal in metres and minutes, how long the visit realistically takes, whether the walk involves
            hills or steps, and how to combine it with nearby sights so your day flows instead of zigzagging. We flag which places
            are free, which need pre-booked tickets, and which are better admired from the outside when time is short.
          </p>
          <p>
            Lisbon rewards cruise visitors more than almost any port in Europe. The ship docks practically in the old town,
            the historic centre is compact, and a single well-planned day can include a medieval quarter, a world-class monument,
            a viewpoint over the rooftops and the best custard tart of your life. Use the categories below to build your day,
            or browse the full list and map.
          </p>
        </div>
      </div>

      {/* Arriving at the Port */}
      <div className="bg-slate-50 px-4 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-[#003366] mb-6">Arriving at the Lisbon Cruise Port</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Cruise ships dock at the Lisbon Cruise Terminal on the Santa Apolónia and Jardim do Tabaco quays, on the north bank
              of the Tagus directly beneath the Alfama district. This is one of the best-placed cruise terminals in Europe:
              step outside and the oldest neighbourhood in the city rises immediately in front of you.
            </p>
            <p>
              <strong>On foot:</strong> Alfama’s lanes begin about 10 minutes from the gangway, the cathedral is roughly 15 minutes away,
              and Praça do Comércio, the grand riverside square where downtown begins, is a flat 20 to 25 minute walk along the waterfront.
              You can fill an entire port day without ever boarding a vehicle.
            </p>
            <p>
              <strong>To Belém:</strong> for the Jerónimos Monastery, Belém Tower and the famous pastéis de nata, take a taxi or app car
              directly from the terminal (15–20 minutes), or walk to Praça do Comércio and ride tram 15E west. Allow half a day for
              Belém including travel time.
            </p>
            <p>
              <strong>Taxis and tuk-tuks:</strong> both wait outside the terminal. Taxis run on meters or fixed airport-style rates;
              with tuk-tuks, agree the price and duration before you set off. A tuk-tuk hill tour is a legitimately good way to
              cover Alfama’s steep viewpoints if stairs are a concern.
            </p>
            <p>
              <strong>Getting back:</strong> plan to be within 30 minutes of the ship two hours before all-aboard. Lisbon traffic is
              usually kind, but afternoon congestion on the riverside road is real. If you are cutting it fine from Belém or Sintra,
              a taxi beats the tram every time.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Attractions Section */}
      <div className="px-4 py-12 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-[#003366] mb-2">Featured Attractions</h2>
        <p className="text-slate-600 mb-8">Top-rated attractions perfect for cruise passengers</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/attractions"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#003366] text-white font-semibold hover:bg-[#004080] transition-colors"
          >
            View All {stats.totalAttractions} Attractions
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-slate-50 px-4 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-[#003366] mb-2">Explore by Category</h2>
          <p className="text-slate-600 mb-8">Find attractions by type</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CURATED_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-slate-200 group"
              >
                <span className="material-symbols-outlined text-4xl text-[#003366] mb-2 group-hover:text-[#004080] transition-colors">
                  {category.icon}
                </span>
                <span className="text-sm font-semibold text-center text-slate-700 group-hover:text-[#003366] transition-colors">
                  {category.displayPlural.replace(/^\w/, (c) => c.toUpperCase())}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Cruise Passenger Info Section */}
      <div className="px-4 py-12 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl p-8 md:p-12 text-white">
          <div className="flex items-start gap-4 mb-6">
            <span className="material-symbols-outlined text-[#FFC72C] text-5xl">directions_boat</span>
            <div>
              <h2 className="text-3xl font-bold mb-2">Perfect for Cruise Passengers</h2>
              <p className="text-white/90 text-lg">
                All attractions include distances from the cruise port, walking times, and insider tips
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#FFC72C] text-3xl">map</span>
              <div>
                <h3 className="font-bold mb-1">Easy to Navigate</h3>
                <p className="text-sm text-white/80">
                  Clear directions from the cruise port to every attraction
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#FFC72C] text-3xl">schedule</span>
              <div>
                <h3 className="font-bold mb-1">Time Optimized</h3>
                <p className="text-sm text-white/80">
                  Know exactly how long each visit takes including travel
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#FFC72C] text-3xl">tips_and_updates</span>
              <div>
                <h3 className="font-bold mb-1">Insider Tips</h3>
                <p className="text-sm text-white/80">
                  Expert advice specifically for cruise ship passengers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 py-12 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-[#003366] mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#003366] mb-2">{faq.question}</h3>
              <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
