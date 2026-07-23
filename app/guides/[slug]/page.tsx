import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import { getAttractionBySlug } from '@/lib/data';
import AttractionCard from '@/components/AttractionCard';
import RichText from '@/components/RichText';

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: 'article',
      url: `/guides/${slug}`,
      ...(guide.heroImage ? { images: [guide.heroImage] } : {}),
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = (
    await Promise.all((guide.relatedAttractions || []).slice(0, 4).map((id) => getAttractionBySlug(id)))
  ).filter((a) => a !== null);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedDate,
    author: {
      '@type': 'Person',
      name: guide.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lisbon Cruise Guide',
      url: 'https://lisbon-cruise-guide.com',
    },
    mainEntityOfPage: `https://lisbon-cruise-guide.com/guides/${guide.slug}`,
  };

  return (
    <article className="relative flex min-h-screen w-full flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {guide.heroImage && (
        <div className="relative h-72 md:h-96 w-full overflow-hidden">
          <Image
            src={guide.heroImage}
            alt={guide.heroImageAlt || guide.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        </div>
      )}

      <div className="px-4 py-10 max-w-3xl mx-auto w-full">
        <nav className="text-sm text-slate-500 mb-6">
          <Link href="/guides" className="hover:text-[#003366] underline underline-offset-2">Shore Guides</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span>{guide.title}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-[#003366] leading-tight">{guide.title}</h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-sm text-slate-500 border-b border-slate-200 pb-6">
          <span className="font-medium text-slate-700">By {guide.author}</span>
          <span aria-hidden>·</span>
          <span>Published {formatDate(guide.publishedDate)}</span>
          <span aria-hidden>·</span>
          <span>{guide.readingTime}</span>
        </div>

        <div className="mt-8 space-y-10">
          {guide.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-2xl font-bold text-[#003366] mb-4">{section.heading}</h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-lg leading-relaxed text-slate-700 mb-4">
                  <RichText text={p} />
                </p>
              ))}
              {section.list && (
                <ul className="space-y-3 my-4">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#FFC72C] text-xl mt-0.5 flex-shrink-0">anchor</span>
                      <span className="text-lg leading-relaxed text-slate-700">
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <div className="mt-4 rounded-xl border-l-4 border-[#FFC72C] bg-[#FFC72C]/10 p-4">
                  <p className="text-base leading-relaxed text-slate-700">
                    <RichText text={section.note} />
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="px-4 py-10 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#003366] mb-6">Attractions mentioned in this guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((attraction) => (
                <AttractionCard key={attraction!.id} attraction={attraction!} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
