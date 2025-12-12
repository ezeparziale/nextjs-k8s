"use server"

import { revalidatePath, updateTag } from "next/cache"

export async function revalidate() {
  updateTag("time-data")
}

export async function revalidatePageTime() {
  revalidatePath("/time", "page")
}

export async function revalidateAll() {
  revalidatePath("/", "layout")
}

export async function revalidatePageProducts() {
  revalidatePath("/products", "page")
}

export async function revalidateProducts() {
  updateTag("products")
}

export async function revalidateTimeGMT() {
  updateTag("getCurrentTimestampGMT")
}
