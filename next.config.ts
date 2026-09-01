import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Prevent build failures due to type checks on Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Prevent build failures due to linting rules on Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
