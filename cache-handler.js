const { IncrementalCache } = require("@neshca/cache-handler");
const createRedisCache = require("@neshca/cache-handler/redis-stack").default;
const createLruCache = require("@neshca/cache-handler/local-lru").default;
const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

client.on("error", (error) => {
  console.error("Redis error:", error.message);
});

IncrementalCache.onCreation(async () => {
  let redisCache, localCache;

  const useTtl = true;

  if (process.env.REDIS_AVAILABLE) {
    await client.connect();

    redisCache = await createRedisCache({
      client,
      useTtl,
    });

    localCache = createLruCache({
      useTtl,
    });
  }

  const cache = [redisCache, localCache];

  return {
    cache,
    useFileSystem: false,
  };
});

module.exports = IncrementalCache;
