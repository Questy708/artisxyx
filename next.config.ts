import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // NOTE: Secrets (ADMIN_PASSWORD, ADMIN_SECRET, DATABASE_URL) must NOT be
  // declared here. Next.js inlines `env` values into the CLIENT bundle at
  // build time — that would leak the admin password to anyone viewing source.
  // Server-only secrets are read at runtime via `process.env` from the
  // deployment environment (Netlify > Site settings > Environment variables).
};

export default nextConfig;
