"use server"

import { revalidatePath, updateTag } from "next/cache"

export async function revalidate(formData: FormData) {
  const timezone = formData.get("timezone") as string

  if (!timezone) {
    throw new Error("Timezone is required")
  }

  updateTag(`time-data:${timezone}`)
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

export async function revalidateTimeUTC() {
  updateTag("getCurrentTimestampUTC")
}
