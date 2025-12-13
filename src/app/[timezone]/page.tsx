import { notFound } from "next/navigation"
import { CacheStateWatcher } from "./_components/cache-state-watcher"
import { Suspense } from "react"
import { RevalidateFrom } from "./_components/revalidate-from"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DateTimeInfo } from "@/types/time"
import { cacheLife, cacheTag } from "next/cache"
import { ClockIcon, Globe2Icon, CalendarIcon } from "lucide-react"

const timeZones = ["CET", "UTC"]

const REVALIDATE_SECONDS = 30

export async function generateStaticParams() {
  return timeZones.map((timezone) => ({ timezone }))
}

async function getTime(timezone: string) {
  "use cache"
  cacheTag("time-data", `time-data:${timezone}`)
  cacheLife({ stale: REVALIDATE_SECONDS })

  console.log("Fetching time data...")

  const res = await fetch(`https://gettimeapi.dev/v1/time?timezone=${timezone}`)

  if (!res.ok) {
    notFound()
  }

  const data: DateTimeInfo = await res.json()

  return data
}

export default async function Page({
  params,
}: {
  params: Promise<{ timezone: string }>
}) {
  const { timezone } = await params

  const data = await getTime(timezone)

  return (
    <div className="container mx-auto flex  max-w-4xl flex-col items-center justify-center px-4">
      <nav className="mb-4 flex flex-wrap gap-2">
        {timeZones.map((timeZone) => (
          <Button
            key={timeZone}
            variant={timeZone === timezone ? "default" : "outline"}
            asChild
          >
            <Link href={`/${timeZone}`}>
              <Globe2Icon className="size-4" />
              {timeZone.toUpperCase()}
            </Link>
          </Button>
        ))}
      </nav>

      <main className="w-full space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="flex items-center justify-center gap-3 border-b pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ClockIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.timezone}</h1>
            <p className="text-sm text-muted-foreground">
              {data.abbr} • Offset {data.offset}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Current Time</p>
            <p className="font-mono text-5xl font-bold tracking-tight">{data.time}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CalendarIcon className="size-4" />
            <p className="text-lg">{data.date}</p>
          </div>
        </div>

        <div className="grid gap-4 border-t pt-6 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Unix Timestamp</p>
            <p className="font-mono text-sm font-semibold">{data.timestamp}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">ISO 8601 Format</p>
            <p className="font-mono text-sm font-semibold">{data.iso8601}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Timezone</p>
            <p className="text-sm font-semibold">{data.timezone}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Abbreviation</p>
            <p className="text-sm font-semibold">{data.abbr}</p>
          </div>
        </div>

        <Suspense fallback={null}>
          <div className="border-t pt-6">
            <CacheStateWatcher
              revalidateAfter={REVALIDATE_SECONDS * 1000}
              time={data.timestamp * 1000}
            />
          </div>
        </Suspense>

        <div className="border-t pt-4">
          <RevalidateFrom timezone={timezone} />
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex gap-3">
            <ClockIcon className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                Cache Strategy: {REVALIDATE_SECONDS}s Revalidation
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This page is statically generated and revalidates every{" "}
                {REVALIDATE_SECONDS} seconds. Use the buttons above to manually
                revalidate the cache.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
