"use client"

import { useAuth } from "@/components/core/AuthProvider"
import { useMemo, useCallback, useRef } from "react"

type PermissionAction = 
  | "CREATE"
  | "READ"
  | "UPDATE"
  | "DELETE"
  | "EXPORT"
  | "DISABLE"
  | "FULLY_DISABLE"
  | "ENABLE"

export function usePermission() {
  const { hasPermission, profileLoading } = useAuth()
  
  const hasPermissionRef = useRef(hasPermission)
  hasPermissionRef.current = hasPermission

  const loadingRef = useRef(profileLoading)
  loadingRef.current = profileLoading

  const can = useCallback((action: PermissionAction | string, menuName: string) => {
    if (loadingRef.current) return false
    return hasPermissionRef.current(menuName, action)
  }, []) 

  const permissionMethods = useMemo(() => {
    const methods = {
      can,
      canCreate: (menuName: string) => can("CREATE", menuName),
      canRead: (menuName: string) => can("READ", menuName),
      canUpdate: (menuName: string) => can("UPDATE", menuName),
      canDelete: (menuName: string) => can("DELETE", menuName),
      canExport: (menuName: string) => can("EXPORT", menuName),
      canDisable: (menuName: string) => can("DISABLE", menuName),
      canHide: (menuName: string) => can("HIDE", menuName),
      canFullyDisable: (menuName: string) => can("FULLY_DISABLE", menuName),
      canEnable: (menuName: string) => can("ENABLE", menuName),
      isLoading: profileLoading
    }
    return methods
  }, [can, profileLoading]) // Only recreate when profileLoading changes

  return permissionMethods
}