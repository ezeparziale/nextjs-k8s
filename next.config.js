/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    incrementalCacheHandlerPath:
      process.env.NODE_ENV === "production"
        ? require.resolve("./cache-handler.js")
        : undefined,
    isrMemoryCacheSize: process.env.NODE_ENV === "production" ? 0 : undefined,
  },
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  output: "standalone",
};

module.exports = nextConfig;
