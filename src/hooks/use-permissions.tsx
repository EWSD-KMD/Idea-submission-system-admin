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
  // Only extract what we need from useAuth
  const { hasPermission, profileLoading } = useAuth()
  
  // Use ref to store the latest hasPermission function
  const hasPermissionRef = useRef(hasPermission)
  hasPermissionRef.current = hasPermission

  // Use ref for loading state to avoid dependency in can function
  const loadingRef = useRef(profileLoading)
  loadingRef.current = profileLoading

  // Stable can function that doesn't change between renders
  const can = useCallback((action: PermissionAction | string, menuName: string) => {
    if (loadingRef.current) return false
    return hasPermissionRef.current(menuName, action)
  }, []) // No dependencies - uses refs instead

  // Create stable permission methods
  const permissionMethods = useMemo(() => {
    const methods = {
      can,
      canCreate: (menuName: string) => can("CREATE", menuName),
      canRead: (menuName: string) => can("READ", menuName),
      canUpdate: (menuName: string) => can("UPDATE", menuName),
      canDelete: (menuName: string) => can("DELETE", menuName),
      canExport: (menuName: string) => can("EXPORT", menuName),
      canDisable: (menuName: string) => can("DISABLE", menuName),
      canFullyDisable: (menuName: string) => can("FULLY_DISABLE", menuName),
      canEnable: (menuName: string) => can("ENABLE", menuName),
      isLoading: profileLoading
    }
    return methods
  }, [can, profileLoading]) // Only recreate when profileLoading changes

  return permissionMethods
}