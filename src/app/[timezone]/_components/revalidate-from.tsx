"use client"

import { useFormStatus } from "react-dom"
import { revalidate } from "../../_actions/server-actions"
import { Button } from "@/components/ui/button"

function RevalidateButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant="outline" type="submit" disabled={pending}>
      {pending ? "Revalidating..." : "Revalidate Cache"}
    </Button>
  )
}

export function RevalidateFrom({ timezone }: { timezone: string }) {
  return (
    <form action={revalidate}>
      <input type="hidden" name="timezone" value={timezone} />
      <RevalidateButton />
    </form>
  )
}
