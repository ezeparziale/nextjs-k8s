import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-stack";
import { createClient } from "redis";

CacheHandler.onCreation(async () => {
  const client = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
  });

  client.on("error", (error) => {
    console.error("Redis error:", error.message);
  });

  let redisHandler;

  if (process.env.REDIS_AVAILABLE) {
    await client.connect();

    redisHandler = await createRedisHandler({
      client,
      timeoutMs: 5000,
    });
  }

  const localHandler = createLruHandler();

  return {
    handlers: [redisHandler, localHandler],
  };
});

export default CacheHandler;
