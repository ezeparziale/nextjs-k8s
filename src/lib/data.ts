import "server-only"

import { Product } from "@/types/product"
import { DateTimeInfo } from "@/types/time"
import { unstable_cache as cache } from "next/cache"

export const getProductsWithLimit = cache(
  async () => {
    console.log("Fetching products...")

    const limit = Math.floor(Math.random() * 20) + 1

    try {
      const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`, {
        next: {
          tags: ["products"],
        },
        cache: "force-cache",
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data: Product[] = await res.json()
      console.log(`Successfully fetched ${data.length} products`)
      return data
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  },
  ["products"],
  {
    tags: ["products"],
  },
)

export const getCurrentTimestampCET = cache(
  async () => {
    console.log("Fetching current CET timestamp...")

    const res = await fetch("https://worldtimeapi.org/api/timezone/CET", {
      next: {
        tags: ["getCurrentTimestampCET"],
      },
      cache: "force-cache",
    })

    const data: DateTimeInfo = await res.json()
    console.log("Successfully fetched CET timestamp:", data.datetime)
    return data
  },
  ["getCurrentTimestampCET"],
  {
    tags: ["getCurrentTimestampCET"],
  },
)

export const getCurrentTimestampGMT = cache(
  async () => {
    console.log("Fetching current GMT timestamp...")

    const res = await fetch("https://worldtimeapi.org/api/timezone/GMT", {
      next: {
        tags: ["getCurrentTimestampGMT"],
      },
      cache: "force-cache",
    })

    const data: DateTimeInfo = await res.json()
    console.log("Successfully fetched GMT timestamp:", data.datetime)
    return data
  },
  ["getCurrentTimestampGMT"],
  {
    tags: ["getCurrentTimestampGMT"],
  },
)
