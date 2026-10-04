import type { NextConfig } from "next";
import { CATEGORY_ALIASES, MERGED_CATEGORIES, canonicalizeCategory } from "./lib/taxonomy";
import { DAY_TRIP_GUIDE, DAY_TRIP_LISTINGS, MERGED_LISTINGS, RETIRED_LISTINGS } from "./lib/retired-listings";

const categoryDestination = (slug: string) => {
  const canonical = canonicalizeCategory(slug);
  return canonical ? `/categories/${canonical}` : "/attractions";
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tags/:tag*",
        destination: "/attractions",
        permanent: true,
      },
      ...[...Object.keys(CATEGORY_ALIASES), ...Object.keys(MERGED_CATEGORIES)].map((slug) => ({
        source: `/categories/${slug}`,
        destination: categoryDestination(slug),
        permanent: true,
      })),
      ...RETIRED_LISTINGS.map((id) => ({
        source: `/attractions/${id}`,
        destination: "/guides/lisbon-tours-for-cruise-passengers",
        permanent: true,
      })),
      ...DAY_TRIP_LISTINGS.map((id) => ({
        source: `/attractions/${id}`,
        destination: DAY_TRIP_GUIDE,
        permanent: true,
      })),
      ...Object.entries(MERGED_LISTINGS).map(([from, to]) => ({
        source: `/attractions/${from}`,
        destination: `/attractions/${to}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
