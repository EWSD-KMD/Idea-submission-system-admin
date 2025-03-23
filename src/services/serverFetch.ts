"use server"

import { decrypt } from "@/lib/utils"
import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const getAuthToken = async() => {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string)
  if (!authCookie?.value) return null

  try {
    const decryptedValue = decrypt(authCookie.value)
    return decryptedValue.accessToken
  } catch (error) {
    console.error("Failed to parse auth cookie:", error)
    return null
  }
}

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken()

  const headers = new Headers(options.headers)
  headers.set("Content-Type", "application/json")
  headers.set("Accept", "application/json")

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  })

  return response.json()
}