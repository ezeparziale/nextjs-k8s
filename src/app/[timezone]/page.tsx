import { notFound } from "next/navigation"
import { CacheStateWatcher } from "./_components/cache-state-watcher"
import { Suspense } from "react"
import { RevalidateFrom } from "./_components/revalidate-from"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type TimeData = {
  unixtime: number
  datetime: string
  timezone: string
}

const timeZones = ["cet", "gmt"]

export const revalidate = 30

export async function generateStaticParams() {
  return timeZones.map((timezone) => ({ timezone }))
}

type Params = Promise<{ timezone: string }>

export default async function Page(props: { params: Params }) {
  const { timezone } = await props.params
  const data = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`, {
    next: { tags: ["time-data"] },
  })

  if (!data.ok) {
    notFound()
  }

  const timeData: TimeData = await data.json()

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
            {timeData.timezone} Time {timeData.datetime}
          </div>
          <Suspense fallback={null}>
            <CacheStateWatcher
              revalidateAfter={revalidate * 1000}
              time={timeData.unixtime * 1000}
            />
          </Suspense>
          <RevalidateFrom />
        </main>
      </div>
    </>
  )
}
