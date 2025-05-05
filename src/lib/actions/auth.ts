// src/lib/actions/auth.ts
"use server";

import { decrypt, encrypt } from "@/lib/utils";
import { cookies } from "next/headers";

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!);
  
  if (!authCookie?.value) return null;

  try {
    return decrypt(authCookie.value).accessToken;
  } catch (error) {
    console.error("Failed to parse auth cookie:", error);
    return null;
  }
};

export const refreshAuthToken = async () => {
  const cookieStore = await cookies();
  const cookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!;
  const authCookie = cookieStore.get(cookieName);

  if (!authCookie?.value) {
    return { accessToken: null, error: "MISSING_AUTH_COOKIE" };
  }

  try {
    const decrypted = decrypt(authCookie.value);
    console.log("decrypted", decrypted)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Refresh-Token": decrypted.refreshToken,
      },
    });

    console.log("response in utils", response)

    if (!response.ok) {
      console.log("fail")
    }

    const { data } = await response.json();
    const newCookieValue = encrypt(JSON.stringify(data));

    cookieStore.set(cookieName, newCookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { accessToken: data.accessToken };
  } catch (error) {
    console.error("Refresh error:", error);
    return { accessToken: null, error: "REFRESH_ERROR" };
  }
};