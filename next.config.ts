import type { NextConfig } from "next";
import { CATEGORY_ALIASES } from "./lib/taxonomy";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tags/:tag*",
        destination: "/attractions",
        permanent: true,
      },
      ...Object.entries(CATEGORY_ALIASES).map(([alias, canonical]) => ({
        source: `/categories/${alias}`,
        destination: `/categories/${canonical}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
