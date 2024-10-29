import Link from "next/link"
import ButtonRevalidate from "./_components/button-revalidate"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getProductsWithLimit } from "@/lib/data"

export default async function DataPage() {
  const data = await getProductsWithLimit()

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
      <Link href={"/data"}>Data</Link>
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Get products with limit param
        </h2>
        <ButtonRevalidate />
      </div>

      <Table>
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Products</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
