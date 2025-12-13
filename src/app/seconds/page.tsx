import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCurrentTimestampUTCSeconds } from "@/lib/data"
import { ClockIcon } from "lucide-react"

export default async function SecondsPage() {
  const data = await getCurrentTimestampUTCSeconds()

  const timeFields = [
    { label: "Timestamp", value: data.timestamp, icon: true },
    { label: "Date", value: data.date },
    { label: "Time", value: data.time },
    { label: "Timezone", value: data.timezone },
    { label: "Abbreviation", value: data.abbr },
    { label: "Offset", value: data.offset },
    { label: "ISO 8601", value: data.iso8601 },
  ]

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ClockIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Real-time Timestamp</h1>
            <p className="text-sm text-muted-foreground">
              Updates every second (Cache: 1s)
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-lg border bg-linear-to-br from-primary/5 to-primary/10 p-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Current Unix Timestamp
          </p>
          <p className="font-mono text-5xl font-bold tracking-tight">
            {data.timestamp}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.date} at {data.time} UTC
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Detailed Information</h2>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {timeFields.map((field) => (
                  <TableHead key={field.label}>{field.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {timeFields.map((field) => (
                  <TableCell
                    key={field.label}
                    className={field.icon ? "font-mono font-medium" : ""}
                  >
                    {field.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Format</h3>
          <p className="font-mono text-sm">{data.iso8601}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Timezone</h3>
          <p className="text-sm">
            {data.timezone} ({data.abbr})
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">UTC Offset</h3>
          <p className="font-mono text-sm">{data.offset}</p>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
        <div className="flex gap-3">
          <ClockIcon className="size-5 shrink-0 text-blue-600 dark:text-blue-400" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Cache Strategy: 1 Second Revalidation
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This page demonstrates real-time data fetching with minimal cache
              duration. The timestamp updates approximately every second on page
              refresh.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
