import { getCurrentTimestampUTC } from "@/lib/data"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = await getCurrentTimestampUTC()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Layout Cache:
            </span>
            <span className="rounded-md bg-primary/10 px-2 py-1 font-mono text-sm font-semibold text-primary">
              {data.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{data.date}</span>
            <span>{data.time} UTC</span>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-auto border-t py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          Last layout render: {data.iso8601}
        </div>
      </footer>
    </div>
  )
}
