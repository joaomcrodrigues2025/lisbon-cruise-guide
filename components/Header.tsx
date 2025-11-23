'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-[#f6f7f8]/80 px-4 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[#FFC72C] text-3xl">anchor</span>
        <span className="text-lg font-bold text-[#003366] tracking-wide">Lisbon Shore</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/search"
          className="flex size-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">search</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex size-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors ${
                isActive('/') ? 'bg-slate-100 font-semibold' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/attractions"
              className={`px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors ${
                isActive('/attractions') ? 'bg-slate-100 font-semibold' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              All Attractions
            </Link>
            <Link
              href="/map"
              className={`px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors ${
                isActive('/map') ? 'bg-slate-100 font-semibold' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Map
            </Link>
            <Link
              href="/search"
              className={`px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors ${
                isActive('/search') ? 'bg-slate-100 font-semibold' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
