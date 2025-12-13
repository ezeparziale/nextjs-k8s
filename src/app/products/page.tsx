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
    <div className="container mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} product{data.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ButtonRevalidatePageProducts />
          <ButtonRevalidateTagProducts />
        </div>
      </header>

      <div className="rounded-lg border">
        <Table>
          <TableCaption className="py-4">
            {data.length > 0
              ? "Complete list of available products"
              : "No products available"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Product Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Cache Strategy:</strong> This page uses limit-based caching to
          demonstrate partial revalidation strategies.
        </p>
      </div>
    </div>
  )
}
