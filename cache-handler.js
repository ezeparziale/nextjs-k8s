const { IncrementalCache } = require("@neshca/cache-handler");
const { createHandler } = require("@neshca/cache-handler/redis-stack");
const { createClient } = require("redis");

function createRedisClient(url) {
  const client = createClient({
    url,
  });

  client.on("error", (error) => {
    console.error("Redis error:", error.message);
  });

  return client;
}

async function connect(client) {
  try {
    await client.connect();
  } catch (error) {
    console.error("Redis connection error:", error.message);
  }
}

const client = createRedisClient(
  process.env.REDIS_URL ?? "redis://localhost:6379"
);

connect(client).then(() => {
  console.log("Redis connected");
});

if (process.env.SERVER_STARTED) {
  IncrementalCache.onCreation(
    createHandler({
      client,
    })
  );
}

module.exports = IncrementalCache;
