import { notFound } from "next/navigation"
import { CacheStateWatcher } from "./_components/cache-state-watcher"
import { Suspense } from "react"
import { RevalidateFrom } from "./_components/revalidate-from"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DateTimeInfo } from "@/types/time"
import { cacheLife, cacheTag } from "next/cache"

const timeZones = ["CET", "GMT"]

const REVALIDATE_SECONDS = 30

export async function generateStaticParams() {
  return timeZones.map((timezone) => ({ timezone }))
}

async function getTime(timezone: string) {
  "use cache"
  cacheTag("time-data")
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
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
          <header>
            {timeZones.map((timeZone) => (
              <Button key={timeZone} className="mx-1" asChild>
                <Link href={`/${timeZone}`}>{timeZone.toUpperCase()} Time</Link>
              </Button>
            ))}
          </header>
          <main className="p-6 border rounded-md flex flex-col items-center">
            <div className="">
              {data.timezone} Time {data.iso8601}
            </div>
            <Suspense fallback={null}>
              <CacheStateWatcher
                revalidateAfter={REVALIDATE_SECONDS * 1000}
                time={data.timestamp * 1000}
              />
            </Suspense>
            <RevalidateFrom />
          </main>
        </div>
      </Suspense>
    </>
  )
}
