import "server-only"

import { Product } from "@/types/product"
import { DateTimeInfo } from "@/types/time"
import { cacheLife, cacheTag } from "next/cache"

export const getProductsWithLimit = async () => {
  "use cache"
  cacheTag("products")
  cacheLife("max")

  console.log("Fetching products...")

  const limit = Math.floor(Math.random() * 20) + 1

  try {
    const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`)

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
}

export const getCurrentTimestampGMT = async () => {
  "use cache"
  cacheTag("getCurrentTimestampGMT")
  cacheLife("max")

  console.log("Fetching current GMT timestamp...")

  const res = await fetch("https://gettimeapi.dev/v1/time?timezone=UTC")

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data: DateTimeInfo = await res.json()
  console.log("Successfully fetched GMT timestamp:", data.iso8601)
  return data
}
