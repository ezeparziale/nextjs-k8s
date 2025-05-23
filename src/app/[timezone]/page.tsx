import { notFound } from "next/navigation"
import { CacheStateWatcher } from "./_components/cache-state-watcher"
import { Suspense } from "react"
import { RevalidateFrom } from "./_components/revalidate-from"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DateTimeInfo } from "@/types/time"

const timeZones = ["CET", "GMT"]

export const revalidate = 30

export async function generateStaticParams() {
  return timeZones.map((timezone) => ({ timezone }))
}

export default async function Page({ params }: { params: { timezone: string } }) {
  const { timezone } = params

  const res = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`, {
    next: { tags: ["time-data"] },
  })

  if (!res.ok) {
    notFound()
  }

  const data: DateTimeInfo = await res.json()

  return (
    <>
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
            {data.timezone} Time {data.datetime}
          </div>
          <Suspense fallback={null}>
            <CacheStateWatcher
              revalidateAfter={revalidate * 1000}
              time={data.unixtime * 1000}
            />
          </Suspense>
          <RevalidateFrom />
        </main>
      </div>
    </>
  )
}
