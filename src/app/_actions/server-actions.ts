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
