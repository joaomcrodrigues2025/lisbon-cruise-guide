import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Lisbon Shore Guide',
  description: 'Get in touch with Lisbon Shore Guide. List your business in our directory.',
};

export default function ContactPage() {
  return (
    <div className="relative flex flex-col w-full px-4 py-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-[#FFC72C] text-5xl">mail</span>
        <h1 className="text-4xl font-bold text-[#003366]">Contact Us</h1>
      </div>

      {/* Business Listing Section */}
      <div className="bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl p-8 md:p-12 text-white mb-8">
        <div className="flex items-start gap-4 mb-6">
          <span className="material-symbols-outlined text-[#FFC72C] text-5xl">storefront</span>
          <div>
            <h2 className="text-3xl font-bold mb-3">List Your Business</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Do you want your business to appear in this directory?
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#FFC72C] text-3xl">email</span>
            <h3 className="text-xl font-semibold">Send us an email:</h3>
          </div>
          <a
            href="mailto:comercial@better-skills.com"
            className="inline-block text-2xl font-bold text-[#FFC72C] hover:text-[#FFD54F] transition-colors break-all"
          >
            comercial@better-skills.com
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#FFC72C] text-3xl">visibility</span>
            <div>
              <h4 className="font-bold mb-1">Increased Visibility</h4>
              <p className="text-sm text-white/80">
                Reach thousands of cruise passengers visiting Lisbon
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#FFC72C] text-3xl">verified</span>
            <div>
              <h4 className="font-bold mb-1">Verified Listings</h4>
              <p className="text-sm text-white/80">
                Professional, detailed business profiles with photos
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#FFC72C] text-3xl">trending_up</span>
            <div>
              <h4 className="font-bold mb-1">Grow Your Business</h4>
              <p className="text-sm text-white/80">
                Connect with tourists looking for authentic experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* General Inquiries */}
      <div className="bg-slate-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-[#003366] mb-4">General Inquiries</h2>
        <p className="text-slate-700 mb-6">
          For general questions, feedback, or partnership opportunities, please contact us at:
        </p>
        <a
          href="mailto:comercial@better-skills.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#003366] text-white font-semibold hover:bg-[#004080] transition-colors"
        >
          <span className="material-symbols-outlined">send</span>
          Send Email
        </a>
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
