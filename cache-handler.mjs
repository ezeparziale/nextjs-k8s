import { createClient } from "redis"
import { LRUCache } from "lru-cache"

export default class CacheHandler {
  constructor(options) {
    this.options = options
    this.cacheClient = null
    this.useCache = false
    this.connectionPromise = null

    // Initialize in-memory LRU cache if enabled
    // 50MB max size, based on length of values
    if (process.env.CACHE_USE_LRU_FALLBACK === "true") {
      this.localCache = new LRUCache({
        max: 50000000,
        length: (value, key) => {
          return (value?.value?.length || 0) + (key?.length || 0)
        },
      })
    } else {
      this.localCache = null
    }

    if (process.env.CACHE_AVAILABLE === "true" && process.env.CACHE_URL) {
      this.connectionPromise = this.connectCache()
    }
  }

  async connectCache() {
    try {
      this.cacheClient = createClient({
        url: process.env.CACHE_URL,
        socket: {
          connectTimeout: 5000,
          reconnectStrategy: (retries) => {
            if (retries > 3) {
              console.error("Max Cache reconnection attempts reached")
              this.useCache = false
              return new Error("Max retries reached")
            }
            return Math.min(retries * 100, 3000)
          },
        },
      })

      this.cacheClient.on("error", (err) => {
        console.error("Cache Client Error", err)
        this.useCache = false
      })

      this.cacheClient.on("ready", () => {
        console.log("Cache Client Connected")
        this.useCache = true
      })

      await this.cacheClient.connect()
    } catch (error) {
      console.error("Failed to connect to Cache:", error)
      this.useCache = false
    }
  }

  async get(key) {
    if (this.connectionPromise) {
      await this.connectionPromise
    }

    if (this.useCache) {
      try {
        const data = await this.cacheClient.get(key)
        if (data) {
          return JSON.parse(data)
        }
        return null
      } catch (error) {
        console.error("Cache get error, falling back to local cache:", error)
        await this.cacheClient.del(key)
        return null
      }
    }

    if (this.localCache) {
      console.log("Got from local cache:", this.localCache.get(key))
      return this.localCache.get(key)
    }

    console.log("No cache available")
    return null
  }

  async set(key, data, ctx) {
    if (this.connectionPromise) {
      await this.connectionPromise
    }

    const entry = {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    }

    if (this.localCache) {
      this.localCache.set(key, entry)
    }

    if (this.useCache) {
      try {
        const value = JSON.stringify(entry)
        await this.cacheClient.set(key, value)

        if (ctx.tags && ctx.tags.length > 0) {
          for (const tag of ctx.tags) {
            await this.cacheClient.sAdd(`tags:${tag}`, key)
          }
        }
      } catch (error) {
        console.error("Cache set error:", error)
      }
    }
  }

  async revalidateTag(tags) {
    if (this.connectionPromise) {
      await this.connectionPromise
    }

    tags = [tags].flat()

    if (this.useCache) {
      try {
        for (const tag of tags) {
          const keys = await this.cacheClient.sMembers(`tags:${tag}`)
          if (keys.length > 0) {
            await this.cacheClient.del(keys)
            await this.cacheClient.del(`tags:${tag}`)
          }
        }
      } catch (error) {
        console.error("Cache revalidateTag error:", error)
      }
    }

    if (this.localCache) {
      for (const [key, value] of this.localCache.entries()) {
        if (value.tags?.some((tag) => tags.includes(tag))) {
          this.localCache.delete(key)
        }
      }
    }
  }

  // If you want to have temporary in memory cache for a single request that is reset
  // before the next request you can leverage this method
  resetRequestCache() {}
}
