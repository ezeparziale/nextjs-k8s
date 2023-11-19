/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    incrementalCacheHandlerPath:
      process.env.NODE_ENV === "production"
        ? require.resolve("./cache-handler.js")
        : undefined,
  },
  output: "standalone",
};

module.exports = nextConfig;
