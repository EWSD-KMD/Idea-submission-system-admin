"use client"

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import Image from "next/image"
import { NavLink } from "./nav-link"
import { Skeleton } from "@/components/ui/skeleton"
import { Home, Shield, Settings, LayoutDashboard, FileText, type LucideIcon } from "lucide-react"
import { useAuth } from "../core/AuthProvider"

const menuToRouteMap: Record<string, { route: string; icon: LucideIcon }> = {
  Dashboard: { route: "/dashboard", icon: LayoutDashboard },
  Admin: { route: "/users", icon: Home },
  Role: { route: "/roles", icon: Shield },
  Menu: { route: "/menus", icon: Shield },
  Permission: { route: "/permissions", icon: Shield },
  Settings: { route: "/settings", icon: Settings },
  Reports: { route: "/reports", icon: FileText },
}

const defaultIcon = Home

export function AppSidebar() {
  const { userProfile, profileLoading } = useAuth()

  const generateSidebarItems = () => {
    if (!userProfile || !userProfile.role || !userProfile.role.menus) {
      return []
    }

    return userProfile.role.menus.map((menu) => {
      const mapping = menuToRouteMap[menu.name] || {
        route: `/${menu.name.toLowerCase()}`,
        icon: defaultIcon,
      }

      return {
        name: menu.name,
        url: mapping.route,
        icon: mapping.icon,
      }
    })
  }

  const sidebarItems = generateSidebarItems()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-x-2 py-2">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <Image src="/logo.svg" fill alt="Univision Logo" className="object-contain" />
            </div>
            <p className="truncate text-lg text-primary font-semibold leading-tight group-data-[collapsible=icon]:hidden">
              UNIVISION PORTAL
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {profileLoading ? (
          <div className="space-y-4 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : sidebarItems.length > 0 ? (
          <NavLink items={sidebarItems} />
        ) : (
          <div className="px-4 py-2 text-sm text-muted-foreground">No menu items available</div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}

