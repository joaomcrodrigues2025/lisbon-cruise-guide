import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use | Lisbon Cruise Guide',
  description:
    'Terms of use for lisbon-cruise-guide.com: accuracy of travel information, limitation of liability, intellectual property and acceptable use.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="relative flex flex-col w-full px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-[#003366] mb-2">Terms of Use</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: 12 July 2026</p>

      <div className="space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-[#003366]">1. About these terms</h2>
        <p>
          lisbon-cruise-guide.com (“the Site”) is an independent travel guide published by Better Skills
          (www.better-skills.com), Portugal. By using the Site you accept these terms. If you do not accept them,
          please do not use the Site.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">2. Travel information and accuracy</h2>
        <p>
          The Site provides travel information for general guidance only. Opening hours, admission prices, transport
          schedules, and attraction availability <strong>change frequently and without notice</strong>. While we
          research listings carefully and update them periodically, we cannot guarantee that any detail is current at
          the moment you read it. Always confirm critical information, particularly opening days, last-admission times
          and prices, directly with the official venue or operator before planning your visit.
        </p>
        <p>
          Timing guidance for cruise passengers (walking times, suggested buffers before all-aboard) is offered in
          good faith based on typical conditions. You remain solely responsible for returning to your ship on time.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">3. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Better Skills accepts no liability for any loss, cost, injury or
          inconvenience arising from the use of information on this Site, including but not limited to missed ship
          departures, closed attractions, price differences or transport disruptions. Nothing in these terms excludes
          liability that cannot be excluded under applicable law.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">4. Third-party links</h2>
        <p>
          The Site links to external websites, including official attraction sites and booking platforms. We are not
          responsible for the content, accuracy or practices of third-party websites or platforms.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">5. Advertising</h2>
        <p>
          The Site may display third-party advertising, which is how it remains free to read. Advertisements do not
          constitute endorsements. See our{' '}
          <Link href="/privacy-policy" className="text-[#003366] underline">privacy policy</Link> for how advertising
          cookies are handled.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">6. Intellectual property</h2>
        <p>
          The editorial content of the Site (texts, curation and structure) belongs to Better Skills unless otherwise
          indicated. You may quote brief extracts with attribution and a link. Wholesale reproduction of listings or
          guides, whether by copying or automated scraping, is not permitted without written consent.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">7. Acceptable use</h2>
        <p>
          You agree not to misuse the Site, including attempting to disrupt its operation, scraping it at scale, or
          using its content to train commercial products without permission.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">8. Governing law</h2>
        <p>
          These terms are governed by Portuguese law, and any disputes are subject to the jurisdiction of the
          Portuguese courts.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">9. Contact</h2>
        <p>
          Questions about these terms can be sent via the{' '}
          <Link href="/contact" className="text-[#003366] underline">contact page</Link> or to{' '}
          <a href="mailto:info@lisbon-cruise-guide.com" className="text-[#003366] underline">info@lisbon-cruise-guide.com</a>.
        </p>
      </div>
    </div>
  );
}
