import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Lisbon Cruise Guide',
  description:
    'Contact the Lisbon Cruise Guide team with questions, corrections or feedback about our Lisbon shore guide, or enquire about listing your business.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="relative flex flex-col w-full px-4 py-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-[#FFC72C] text-5xl">mail</span>
        <h1 className="text-4xl font-bold text-[#003366]">Contact Us</h1>
      </div>

      {/* Reader Contact */}
      <div className="bg-slate-50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#003366] mb-4">Questions, Corrections & Feedback</h2>
        <p className="text-slate-700 mb-4 leading-relaxed">
          Spotted an outdated price, a changed opening time or a closed attraction? Planning a cruise stop and can’t
          find an answer on the site? We read every message and use your reports to keep the guide accurate for the
          next passenger.
        </p>
        <p className="text-slate-700 mb-6 leading-relaxed">
          Lisbon Cruise Guide is published by Better Skills, a company based in Portugal, and edited by João Rodrigues.
          You can read more about how the guide is made on our{' '}
          <Link href="/about" className="text-[#003366] underline hover:text-[#004080]">about page</Link>.
        </p>
        <a
          href="mailto:comercial@better-skills.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#003366] text-white font-semibold hover:bg-[#004080] transition-colors"
        >
          <span className="material-symbols-outlined">send</span>
          comercial@better-skills.com
        </a>
        <p className="text-sm text-slate-500 mt-4">
          We aim to reply within a few working days. Please mention the attraction or page in question so we can act
          quickly on corrections.
        </p>
      </div>

      {/* Business Listing Section */}
      <div className="bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl p-8 text-white">
        <div className="flex items-start gap-4 mb-4">
          <span className="material-symbols-outlined text-[#FFC72C] text-4xl">storefront</span>
          <div>
            <h2 className="text-2xl font-bold mb-2">For Businesses</h2>
            <p className="text-white/90 leading-relaxed">
              Run a tour, restaurant or attraction in Lisbon that serves cruise passengers? Get in touch at the same
              address to enquire about being included in the guide. Note that editorial descriptions are independent:
              inclusion is not paid, and payment does not buy a favourable review.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#003366] font-semibold hover:text-[#004080] transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
