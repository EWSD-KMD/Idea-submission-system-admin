"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";

export function UserProfile() {
  const router = useRouter();

  const { logout } = useAuth()

  
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="inline-flex items-center gap-x-1.5 rounded-full border border-border px-4 py-2">
          <p className="text-brand-900 pr-1 text-sm font-bold">
            Nann Shwe Li
          </p>
          <ChevronDown className="size-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button onClick={handleLogout} variant="ghost" className="w-full">
            LogOut
            <LogOut />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
