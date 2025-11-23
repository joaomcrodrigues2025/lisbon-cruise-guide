'use client';

import Link from 'next/link';

interface FilterChipsProps {
  categories: string[];
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
        {categories.map((category) => {
          const displayName = category
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <Link
              key={category}
              href={`/categories/${category}`}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-colors ${
                activeCategory === category
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
