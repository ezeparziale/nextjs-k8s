import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nextjs + Redis cache + Kubernetes",
  description: "NextJS app with 2 pods sharing cache on redis",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <Suspense fallback={<Skeleton />}>
              <div className="flex flex-1 flex-col p-5">{children}</div>
            </Suspense>
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
