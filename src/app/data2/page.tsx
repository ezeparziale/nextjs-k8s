import Link from "next/link"
import ButtonRevalidate from "./_components/button-revalidate"
import { getCurrentTimestampCET } from "../_actions/server-actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function DataPage() {
  const data = await getCurrentTimestampCET()

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
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
            <TableHead className="w-[100px]">Datetime</TableHead>
            <TableHead className="w-[100px]">Timezone</TableHead>
            <TableHead className="w-[100px]">Utc_datetime</TableHead>
            <TableHead className="w-[100px]">Utc_offset</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{data.datetime}</TableCell>
            <TableCell className="font-medium">{data.timezone}</TableCell>
            <TableCell className="font-medium">{data.utc_datetime}</TableCell>
            <TableCell className="font-medium">{data.utc_offset}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
