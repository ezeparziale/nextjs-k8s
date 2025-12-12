"use client"

import {
  revalidateAll,
  revalidatePageTime,
  revalidateTimeGMT,
} from "@/app/_actions/server-actions"
import { Button } from "@/components/ui/button"

export function ButtonRevalidatePage() {
  async function handleClick() {
    await revalidatePageTime()
  }

  return <Button onClick={handleClick}>Revalidate page</Button>
}

export function ButtonUpdateTag() {
  async function handleClick() {
    await revalidateTimeGMT()
  }

  return <Button onClick={handleClick}>Revalidate tag</Button>
}

export function ButtonRevalidateAll() {
  async function handleClick() {
    await revalidateAll()
  }

  return <Button onClick={handleClick}>Revalidate all</Button>
}
