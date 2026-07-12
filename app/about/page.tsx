import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Lisbon Cruise Guide | Who We Are',
  description:
    'Lisbon Cruise Guide is an independent editorial guide to Lisbon for cruise ship passengers, published by Better Skills and edited by João Rodrigues.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="relative flex flex-col w-full px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-[#003366] mb-8">About Lisbon Cruise Guide</h1>

      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          Lisbon Cruise Guide exists to answer one question well: <strong>what should you do with a single day in Lisbon
          when your ship sails at six?</strong> General travel guides assume you have a week and a hotel in the centre.
          Cruise passengers have a fixed gangway time, a terminal on the eastern edge of the old town, and no appetite
          for wasted hours. Every page on this site is written with that constraint in mind.
        </p>

        <h2 className="text-2xl font-bold text-[#003366] pt-4">What we cover</h2>
        <p>
          The guide documents 70 attractions in and around Lisbon. For each one we publish the walking distance and time
          from the cruise terminal at Santa Apolónia / Jardim do Tabaco, realistic visit durations, admission prices,
          opening patterns, accessibility notes, and practical tips specific to shore visits, such as when to go to beat
          tour-group crowds and how much buffer to leave before all-aboard.
        </p>

        <h2 className="text-2xl font-bold text-[#003366] pt-4">How the information is compiled</h2>
        <p>
          Listings are researched from official attraction websites, Portuguese tourism sources and on-the-ground
          knowledge of Lisbon, then organised around cruise logistics. Prices, opening hours and transport details
          change frequently in a busy tourist city, so we review listings periodically; even so, always confirm
          critical details, especially opening days and last-admission times, with the official venue before building
          your day around them. Visitor ratings shown on attraction pages are indicative figures drawn from major
          public review platforms, credited where they appear; we do not collect our own reviews.
        </p>

        <h2 className="text-2xl font-bold text-[#003366] pt-4">Who is behind the site</h2>
        <p>
          Lisbon Cruise Guide is published by <strong>Better Skills</strong> (
          <a href="https://www.better-skills.com" className="text-[#003366] underline hover:text-[#004080]" rel="noopener">
            www.better-skills.com
          </a>
          ), a Portuguese training and consulting company, and edited by <strong>João Rodrigues</strong>, a partner at
          Better Skills based in Portugal. Being locally based matters for a guide like this: the walking times were
          not estimated from a map.
        </p>

        <h2 className="text-2xl font-bold text-[#003366] pt-4">Corrections</h2>
        <p>
          If you spot an error, an outdated price or a closed attraction, we genuinely want to know. Write to us via
          the <Link href="/contact" className="text-[#003366] underline hover:text-[#004080]">contact page</Link> and
          we will review and correct the listing.
        </p>

        <h2 className="text-2xl font-bold text-[#003366] pt-4">Advertising and independence</h2>
        <p>
          The guide is free to read. It may display advertising to cover its costs, and businesses can enquire about
          being listed, but editorial descriptions are not for sale: inclusion in the guide does not imply payment,
          and payment does not buy a favourable write-up. See our{' '}
          <Link href="/terms" className="text-[#003366] underline hover:text-[#004080]">terms of use</Link> and{' '}
          <Link href="/privacy-policy" className="text-[#003366] underline hover:text-[#004080]">privacy policy</Link>{' '}
          for the details.
        </p>
      </div>
    </div>
  );
}
