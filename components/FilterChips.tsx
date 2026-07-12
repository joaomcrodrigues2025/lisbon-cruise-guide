'use client';

import Link from 'next/link';

interface FilterChipsProps {
  categories: Array<{ slug: string; label: string }>;
  activeCategory?: string;
}

export default function FilterChips({ categories, activeCategory }: FilterChipsProps) {
  return (
    <div className="p-4">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <Link
          href="/attractions"
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-colors ${
            !activeCategory
              ? 'bg-[#003366] text-white'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
          }`}
        >
          <p className="text-sm font-medium">All</p>
        </Link>
        {categories.map(({ slug, label }) => {
          const displayName = label.replace(/^\w/, (c) => c.toUpperCase());

          return (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-colors ${
                activeCategory === slug
                  ? 'bg-[#003366] text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              <p className="text-sm font-medium whitespace-nowrap">{displayName}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
