"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Fragment } from "react";
import { NavLink } from "./nav-link";
import { Separator } from "../ui/separator";
import { sideNav } from "@/constants/side-nav";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-x-2 py-2 ">
          {/* <Image
            src="vercel.svg"
            width={100}
            height={100}
            alt="Vercel"
            className="size-8"
          /> */}
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <Image
                src="/logo.svg"
                fill
                alt="Univision Logo"
                className="object-contain"
              />
            </div>
            <p className="truncate text-lg text-primary font-semibold leading-tight group-data-[collapsible=icon]:hidden">
              UNIVISION PORTAL
            </p>
          </div>
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
  );
}
