"use client"

import { revalidateData2 } from "@/app/_actions/server-actions"
import { Button } from "@/components/ui/button"

export default function ButtonRevalidate() {
  async function handleClick() {
    await revalidateData2()
  }

  return <Button onClick={handleClick}>Revalidate page</Button>
}
