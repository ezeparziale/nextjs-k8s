import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheHandlers: {
    default: require.resolve("./cache-handler.mjs"),
    remote: require.resolve("./cache-handler.mjs"),
  },
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
}

export default nextConfig
