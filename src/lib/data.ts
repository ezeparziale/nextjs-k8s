import "server-only"

import { Product } from "@/types/product"
import { DateTimeInfo } from "@/types/time"
import { cacheLife, cacheTag } from "next/cache"

export const getProductsWithLimit = async () => {
  "use cache"
  cacheTag("products")
  cacheLife("max")

  console.log("getProductsWithLimit - Fetching products...")

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

export const getCurrentTimestampUTC = async () => {
  "use cache"
  cacheTag("getCurrentTimestampUTC")
  cacheLife("max")

  console.log("getCurrentTimestampUTC - Fetching current UTC timestamp...")

  const res = await fetch("https://gettimeapi.dev/v1/time?timezone=UTC")

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data: DateTimeInfo = await res.json()
  console.log("Successfully fetched UTC timestamp:", data.iso8601)
  return data
}

export const getCurrentTimestampUTCSeconds = async () => {
  "use cache"
  cacheTag("getCurrentTimestampUTCSeconds")
  cacheLife("seconds")

  console.log("getCurrentTimestampUTCSeconds - Fetching current UTC timestamp...")

  const res = await fetch("https://gettimeapi.dev/v1/time?timezone=UTC")

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data: DateTimeInfo = await res.json()
  console.log("Successfully fetched UTC timestamp:", data.iso8601)
  return data
}

export const getCurrentTimestampUTCMinutes = async () => {
  "use cache"
  cacheTag("getCurrentTimestampUTCMinutes")
  cacheLife("minutes")

  console.log("getCurrentTimestampUTCMinutes - Fetching current UTC timestamp...")

  const res = await fetch("https://gettimeapi.dev/v1/time?timezone=UTC")

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data: DateTimeInfo = await res.json()
  console.log("Successfully fetched UTC timestamp:", data.iso8601)
  return data
}

export const getCurrentTimestampUTCHours = async () => {
  "use cache"
  cacheTag("getCurrentTimestampUTCHours")
  cacheLife("hours")

  console.log("getCurrentTimestampUTCHours - Fetching current UTC timestamp...")

  const res = await fetch("https://gettimeapi.dev/v1/time?timezone=UTC")

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data: DateTimeInfo = await res.json()
  console.log("Successfully fetched UTC timestamp:", data.iso8601)
  return data
}
