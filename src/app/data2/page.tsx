import Link from "next/link"
import ButtonRevalidate from "./_components/button-revalidate"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCurrentTimestampCET } from "@/lib/data"

export default async function DataPage() {
  const data = await getCurrentTimestampCET()

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link href={"/data"}>Data</Link>
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Get current timestamp
        </h2>
        <ButtonRevalidate />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Timezone</TableHead>
            <TableHead>Abbr</TableHead>
            <TableHead>Offset</TableHead>
            <TableHead>ISO8601</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{data.timestamp}</TableCell>
            <TableCell>{data.date}</TableCell>
            <TableCell>{data.time}</TableCell>
            <TableCell>{data.timezone}</TableCell>
            <TableCell>{data.abbr}</TableCell>
            <TableCell>{data.offset}</TableCell>
            <TableCell>{data.iso8601}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
