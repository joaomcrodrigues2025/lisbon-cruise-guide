import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lisbon Cruise Guide',
  description:
    'How Lisbon Cruise Guide handles personal data, cookies and third-party advertising, including Google advertising cookies, and your rights under the GDPR.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex flex-col w-full px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-[#003366] mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: 12 July 2026</p>

      <div className="space-y-6 text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-[#003366]">1. Who we are</h2>
        <p>
          This website, lisbon-cruise-guide.com (“the Site”), is published by <strong>Better Skills</strong>{' '}
          (www.better-skills.com), a company based in Portugal, which acts as the data controller for any personal
          data processed through the Site. You can reach us regarding privacy matters at{' '}
          <a href="mailto:info@lisbon-cruise-guide.com" className="text-[#003366] underline">info@lisbon-cruise-guide.com</a>.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">2. What data we process</h2>
        <p>
          The Site is an informational guide. You can browse it without creating an account and without providing any
          personal details. The data processed is limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Technical data</strong> collected automatically when you visit any website: IP address, browser
            type, device type, pages visited and approximate location. Our hosting provider (Vercel) processes this
            data to deliver the Site and maintain its security.
          </li>
          <li>
            <strong>Email correspondence</strong>: if you contact us by email, we process your email address and the
            content of your message in order to reply. We do not add you to any mailing list.
          </li>
          <li>
            <strong>Advertising and analytics data</strong> processed via cookies, as described below.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-[#003366]">3. Cookies and third-party advertising</h2>
        <p>
          The Site may display advertising served by Google AdSense and other third-party vendors. These vendors use
          cookies and similar technologies to serve and measure ads:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this Site
            and to other websites on the internet.
          </li>
          <li>
            Google’s use of advertising cookies (such as the DoubleClick cookie) enables it and its partners to serve
            ads to you based on your visits to this Site and/or other sites.
          </li>
          <li>
            You may opt out of personalised advertising by visiting{' '}
            <a href="https://adssettings.google.com" className="text-[#003366] underline" rel="noopener nofollow">
              Google Ads Settings
            </a>
            . You can also opt out of some third-party vendors’ use of cookies for personalised advertising at{' '}
            <a href="https://www.aboutads.info/choices" className="text-[#003366] underline" rel="noopener nofollow">
              www.aboutads.info/choices
            </a>
            .
          </li>
          <li>
            For more information on how Google uses data when you use our Site, see{' '}
            <a href="https://policies.google.com/technologies/partner-sites" className="text-[#003366] underline" rel="noopener nofollow">
              policies.google.com/technologies/partner-sites
            </a>
            .
          </li>
        </ul>
        <p>
          For visitors in the European Economic Area, the United Kingdom and Switzerland, personalised advertising is
          only served on the basis of your consent, which you can give or refuse via the consent banner and change at
          any time. If you refuse, you may still see non-personalised ads, which use cookies solely for frequency
          capping, fraud prevention and aggregate reporting.
        </p>
        <p>
          You can also block or delete cookies at any time through your browser settings; the Site remains fully
          usable without them.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">4. Legal bases</h2>
        <p>
          Under the EU General Data Protection Regulation (GDPR), we rely on: <strong>legitimate interest</strong> for
          the technical operation and security of the Site and for replying to messages you send us; and{' '}
          <strong>consent</strong> for advertising and analytics cookies, where required.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">5. Data sharing and retention</h2>
        <p>
          We do not sell personal data. Technical data is processed by our hosting and advertising providers as
          described above, under their own privacy policies. Email correspondence is retained only as long as needed
          to handle your enquiry and any follow-up.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">6. Your rights</h2>
        <p>
          If you are in the EU/EEA, you have the right to access, rectify or erase your personal data, to restrict or
          object to its processing, and to data portability. You may also lodge a complaint with your supervisory
          authority; in Portugal this is the CNPD (Comissão Nacional de Proteção de Dados, www.cnpd.pt). To exercise
          any of these rights, email us at{' '}
          <a href="mailto:info@lisbon-cruise-guide.com" className="text-[#003366] underline">info@lisbon-cruise-guide.com</a>.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">7. Children</h2>
        <p>
          The Site is a general-audience travel guide and does not knowingly collect personal data from children.
        </p>

        <h2 className="text-2xl font-bold text-[#003366]">8. Changes to this policy</h2>
        <p>
          We may update this policy as the Site evolves, for example when advertising or analytics services are added
          or changed. The date at the top of this page reflects the latest revision. Questions? Use the{' '}
          <Link href="/contact" className="text-[#003366] underline">contact page</Link>.
        </p>
      </div>
    </div>
  );
}
