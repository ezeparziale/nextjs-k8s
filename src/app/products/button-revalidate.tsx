"use client"

import {
  revalidatePageProducts,
  revalidateProducts,
} from "@/app/_actions/server-actions"
import { Button } from "@/components/ui/button"

export function ButtonRevalidatePageProducts() {
  async function handleClick() {
    await revalidatePageProducts()
  }

  return <Button onClick={handleClick}>Revalidate page products</Button>
}

export function ButtonRevalidateTagProducts() {
  async function handleClick() {
    await revalidateProducts()
  }

  return <Button onClick={handleClick}>Revalidate tag products</Button>
}
