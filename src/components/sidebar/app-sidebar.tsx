'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Fragment } from "react"
import { NavLink } from "./nav-link"
import { Separator } from "../ui/separator"
import { sideNav } from "@/constants/side-nav"
import Image from "next/image"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-x-2 py-2 ps-4">
        <Image
            src="vercel.svg"
            width={100}
            height={100}
            alt="Vercel"
            className="size-8"
          />
          <p className="truncate text-left text-md font-semibold leading-tight  group-data-[co700llapsible=icon]:hidden">
            ADMIN PORTAL
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(sideNav).map(([key, items], index) => (
          <Fragment key={key}>
            <NavLink items={items} />
            {index < Object.entries(sideNav).length - 1 && (
              <Separator className="mx-auto w-[85%]" />
            )}
          </Fragment>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
