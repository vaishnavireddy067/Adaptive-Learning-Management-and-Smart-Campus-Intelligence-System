import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "avniet-lms-super-secret-key-2026-production-ready",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
