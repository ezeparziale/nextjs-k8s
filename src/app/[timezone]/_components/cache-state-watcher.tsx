"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ClockIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react"

type CacheStateWatcherProps = { time: number; revalidateAfter: number }

export function CacheStateWatcher({ time, revalidateAfter }: CacheStateWatcherProps) {
  const [cacheState, setCacheState] = useState<"fresh" | "stale">("fresh")
  const [countDown, setCountDown] = useState(0)

  useEffect(() => {
    let id = -1

    function check(): void {
      const now = Date.now()
      const remainingTime = Math.max(0, (time + revalidateAfter - now) / 1000)

      setCountDown(remainingTime)

      if (now > time + revalidateAfter) {
        setCacheState("stale")
        return
      }

      setCacheState("fresh")
      id = requestAnimationFrame(check)
    }

    id = requestAnimationFrame(check)

    return () => {
      cancelAnimationFrame(id)
    }
  }, [revalidateAfter, time])

  const isFresh = cacheState === "fresh"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              isFresh ? "bg-green-100 dark:bg-green-950" : "bg-red-100 dark:bg-red-950",
            )}
          >
            {isFresh ? (
              <CheckCircle2Icon className="size-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircleIcon className="size-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Cache Status</p>
            <p
              className={cn(
                "text-lg font-bold capitalize",
                isFresh
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400",
              )}
            >
              {cacheState}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">
            {isFresh ? "Stale in" : "Stale since"}
          </p>
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4 text-muted-foreground" />
            <p
              className={cn(
                "font-mono text-2xl font-bold",
                isFresh ? "text-foreground" : "text-red-600 dark:text-red-400",
              )}
            >
              {countDown.toFixed(1)}s
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
