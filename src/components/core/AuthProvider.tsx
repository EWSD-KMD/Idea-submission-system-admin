"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie, removeCookie, setCookie } from "@/lib/utils"

// Define the auth context type
interface AuthContextType {
  accessToken: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (data: { accessToken: string; refreshToken: string }) => void
  logout: () => void
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

const cookieName = process.env.AUTH_COOKIE_NAME || "auth"

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authState, setAuthState] = useState<{
    accessToken: string | null
  }>({
    accessToken: null,
  })

  // Initialize auth state from cookie
  useEffect(() => {
    const authData = getCookie(cookieName)
    if (authData) {
      setAuthState({
        accessToken: authData.accessToken || null,
      })
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (data: { accessToken: string; refreshToken: string;}) => {
    setCookie(cookieName, data)
    setAuthState({
      accessToken: data.accessToken,
    })
    router.push("/")
  }

  // Logout function
  const logout = () => {
    removeCookie(cookieName)
    setAuthState({
      accessToken: null,
    })
    router.push("/login")
  }

  const value = {
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.accessToken,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

