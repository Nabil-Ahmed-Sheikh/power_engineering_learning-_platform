import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  // Every page is pre-rendered at build time, but if anything ever renders
  // at request time (e.g. on Vercel), the serverless function needs the
  // seeded SQLite file traced into its bundle.
  outputFileTracingIncludes: {
    "/*": ["data/learning.db"],
  },
};

export default nextConfig;
