/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cache-handler.mjs")
      : undefined,
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
};

export default nextConfig;
