"use client"

import { useFormStatus } from "react-dom"
import { revalidate } from "../../_actions/server-actions"
import { Button } from "@/components/ui/button"

function RevalidateButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant={"outline"} type="submit" disabled={pending} className="mt-3">
      Revalidate
    </Button>
  )
}

export function RevalidateFrom() {
  return (
    <form action={revalidate}>
      <RevalidateButton />
    </form>
  )
}
