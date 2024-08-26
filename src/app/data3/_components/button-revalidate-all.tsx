"use client"

import { revalidateAll } from "@/app/_actions/server-actions"
import { Button } from "@/components/ui/button"

export default function ButtonRevalidateAll() {
  async function handleClick() {
    await revalidateAll()
  }

  return <Button onClick={handleClick}>Revalidate all</Button>
}
