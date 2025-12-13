"use client"

import { Clock12Icon, Clock3Icon, HomeIcon, ListIcon, TimerIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "CET",
    url: "/CET",
    icon: Clock3Icon,
  },
  {
    title: "UTC",
    url: "/UTC",
    icon: Clock12Icon,
  },
  {
    title: "Products",
    url: "/products",
    icon: ListIcon,
  },
  {
    title: "Time",
    url: "/time",
    icon: TimerIcon,
  },
  {
    title: "Seconds",
    url: "/seconds",
    icon: TimerIcon,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
