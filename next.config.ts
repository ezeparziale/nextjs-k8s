import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheHandler: import.meta.dirname + "/cache-handler.mjs",
  cacheMaxMemorySize: 0, // disable default in-memory caching
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  cacheComponents: true,
}

export default nextConfig
