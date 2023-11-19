import { notFound } from "next/navigation";
import { CacheStateWatcher } from "../components/cache-state-watcher";
import { Suspense } from "react";
import { RevalidateFrom } from "../components/revalidate-from";
import Link from "next/link";

type TimeData = {
  unixtime: number;
  datetime: string;
  timezone: string;
};

const timeZones = ["cet", "gmt"];

export const revalidate = 10;

export async function generateStaticParams() {
  return timeZones.map((timezone) => ({ timezone }));
}

export default async function Page({
  params,
}: {
  params: { timezone: string };
}) {
  const { timezone } = params;
  const data = await fetch(
    `https://worldtimeapi.org/api/timezone/${timezone}`,
    {
      next: { tags: ["time-data"] },
    }
  );

  if (!data.ok) {
    notFound();
  }

  const timeData: TimeData = await data.json();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <header>
          {timeZones.map((timeZone) => (
            <Link
              key={timeZone}
              className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto"
              href={`/${timeZone}`}
            >
              {timeZone.toUpperCase()} Time
            </Link>
          ))}
        </header>
        <main className="p-6 border rounded-lg shadow flex flex-col items-center">
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
  );
}
