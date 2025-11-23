'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <label className="flex flex-col min-w-40 h-14 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-lg bg-white">
          <div className="text-slate-500 flex items-center justify-center pl-4">
            <span className="material-symbols-outlined text-2xl">search</span>
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#003366] focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-500 px-2 text-base font-normal leading-normal"
            placeholder="Search attractions, categories, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 text-[#003366] font-semibold hover:text-[#004080] transition-colors"
          >
            Search
          </button>
        </div>
      </label>
    </form>
  );
}
