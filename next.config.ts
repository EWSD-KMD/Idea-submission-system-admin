import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Recommended to ignore ESLint errors as well when ignoring TypeScript
    ignoreDuringBuilds: true,
  },
  // Your other Next.js config options here
};

export default nextConfig;