"use client"

import { useAuth } from "@/components/core/AuthProvider"
import { useMemo } from "react"

export function usePermission() {
  const { hasPermission, profileLoading } = useAuth()

  return useMemo(() => {
    const can = (action: string, menuName: string) => {
      if (profileLoading) return false
      return hasPermission(menuName, action)
    }

    const canCreate = (menuName: string) => can("CREATE", menuName)
    const canRead = (menuName: string) => can("READ", menuName)
    const canUpdate = (menuName: string) => can("UPDATE", menuName)
    const canDelete = (menuName: string) => can("DELETE", menuName)

    return {
      can,
      canCreate,
      canRead,
      canUpdate,
      canDelete,
      isLoading: profileLoading,
    }
  }, [hasPermission, profileLoading])
}

