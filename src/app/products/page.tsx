import {
  ButtonRevalidatePageProducts,
  ButtonRevalidateTagProducts,
} from "./button-revalidate"
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

export default async function ProductsPage() {
  const data = await getProductsWithLimit()

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-8">
      <div className="flex justify-between items-center gap-3 mb-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Get products with limit param
        </h2>
        <div className="flex gap-3 shrink-0">
          <ButtonRevalidatePageProducts />
          <ButtonRevalidateTagProducts />
        </div>
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
