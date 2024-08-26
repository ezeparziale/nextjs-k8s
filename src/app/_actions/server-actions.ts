"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export async function revalidate() {
  revalidateTag("time-data")
}

export async function revalidateData() {
  revalidatePath("/data", "page")
}

export async function revalidateData2() {
  revalidatePath("/data2", "page")
}

export async function revalidateData3() {
  revalidatePath("/data3", "page")
}

export async function revalidateAll() {
  revalidatePath("/", "layout")
}

export async function getProductsWithLimit() {
  console.log("Downloading data..")

  const limit = Math.floor(Math.random() * 20) + 1

  const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`, {
    method: "GET",
    next: {
      tags: ["products"],
    },
  })
  return res.json()
}

export async function getCurrentTimestampCET() {
  console.log("Downloading data..")

  const res = await fetch(`https://worldtimeapi.org/api/timezone/cet`, {
    method: "GET",
    next: {
      tags: ["getCurrentTimestampCET"],
    },
  })
  return res.json()
}

export async function getCurrentTimestampGMT() {
  console.log("Downloading data..")

  const res = await fetch(`https://worldtimeapi.org/api/timezone/gmt`, {
    method: "GET",
    next: {
      tags: ["getCurrentTimestampGMT"],
    },
  })
  return res.json()
}
