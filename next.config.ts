import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains: ["image.tmdb.org"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
