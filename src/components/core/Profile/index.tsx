"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "../AuthProvider"

export function UserProfile() {
  const { userProfile, logout, profileLoading } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="inline-flex items-center gap-x-1.5 rounded-full border border-border px-4 py-2">
          {profileLoading ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <p className="text-brand-900 pr-1 text-sm font-bold">{userProfile?.name || "Guest"}</p>
          )}
          <ChevronDown className="size-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {userProfile && (
          <>
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Email</span>
              <span>{userProfile.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Role</span>
              <span>{userProfile.role.name}</span>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button onClick={handleLogout} variant="ghost" className="w-full">
            <span className="flex-1 text-left">Logout</span>
            <LogOut className="size-4" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

