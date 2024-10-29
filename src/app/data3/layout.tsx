import { getCurrentTimestampGMT } from "@/lib/data"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = await getCurrentTimestampGMT()

  return (
    <>
      <div>Layout {data.datetime}</div>
      <div>{children}</div>
    </>
  )
}
