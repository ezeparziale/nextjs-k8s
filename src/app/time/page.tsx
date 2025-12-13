import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  getCurrentTimestampUTC,
  getCurrentTimestampUTCHours,
  getCurrentTimestampUTCMinutes,
  getCurrentTimestampUTCSeconds,
} from "@/lib/data"
import {
  ButtonRevalidateAll,
  ButtonRevalidatePage,
  ButtonUpdateTag,
} from "./button-revalidate"
import { type DateTimeInfo } from "@/types/time"

const CACHE_SECTIONS = [
  {
    title: "Rarely changes (Cache: MAX)",
    getData: getCurrentTimestampUTC,
  },
  {
    title: "Multiple daily updates (Cache: Hours)",
    getData: getCurrentTimestampUTCHours,
  },
  {
    title: "Frequently updated (Cache: Minutes)",
    getData: getCurrentTimestampUTCMinutes,
  },
  {
    title: "Real-time data (Cache: Seconds)",
    getData: getCurrentTimestampUTCSeconds,
  },
] as const

export default async function TimePage() {
  const [dataMax, dataHours, dataMinutes, dataSeconds] = await Promise.all([
    getCurrentTimestampUTC(),
    getCurrentTimestampUTCHours(),
    getCurrentTimestampUTCMinutes(),
    getCurrentTimestampUTCSeconds(),
  ])

  const dataSets = [dataMax, dataHours, dataMinutes, dataSeconds]

  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Cache Strategy Comparison</h1>
        <div className="flex flex-wrap gap-2">
          <ButtonRevalidatePage />
          <ButtonUpdateTag />
          <ButtonRevalidateAll />
        </div>
      </header>

      {CACHE_SECTIONS.map((section, index) => (
        <section key={section.title} className="space-y-4">
          <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">
            {section.title}
          </h2>
          <TimeTable data={dataSets[index]} />
        </section>
      ))}
    </div>
  )
}

function TimeTable({ data }: { data: DateTimeInfo }) {
  const fields = [
    { label: "Timestamp", value: data.timestamp, highlight: true },
    { label: "Date", value: data.date },
    { label: "Time", value: data.time },
    { label: "Timezone", value: data.timezone },
    { label: "Abbr", value: data.abbr },
    { label: "Offset", value: data.offset },
    { label: "ISO8601", value: data.iso8601 },
  ]

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {fields.map((field) => (
              <TableHead key={field.label}>{field.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {fields.map((field) => (
              <TableCell
                key={field.label}
                className={field.highlight ? "font-medium" : ""}
              >
                {field.value}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
