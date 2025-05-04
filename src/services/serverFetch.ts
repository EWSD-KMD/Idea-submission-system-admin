"use server";

import { decrypt, encrypt } from "@/lib/utils";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getAuthToken = async () => {
  const cookieStore = await cookies();
  console.log("cookieName", process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME)
  const authCookie = cookieStore.get(
    process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string
  );

  console.log("getAuthToken cookie", authCookie)
  if (!authCookie?.value) return null;

  try {
    const decryptedValue = decrypt(authCookie.value);
    return decryptedValue.accessToken;
  } catch (error) {
    console.error("Failed to parse auth cookie:", error);
    return null;
  }
};

export async function refreshAuthToken() {
  const cookieStore = await cookies();
  const cookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string;
  const authCookie = cookieStore.get(cookieName);
  console.log("authCookie", authCookie);

  if (!authCookie?.value) {
    console.error("Missing auth cookie");
    return { accessToken: null };
  }

  try {
    const decrypted = decrypt(authCookie.value);
    const refreshToken = decrypted.refreshToken;

    console.log("refreshToken", refreshToken);

    const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Refresh-Token": refreshToken,
      },
    });

    if (!response.ok) {
      cookieStore.delete(cookieName); // Delete the cookie if refresh fails
      console.log("cooki cookieStore.getAll()", cookieStore.getAll());
      console.error("Failed to refresh token:", response.statusText);
      return { accessToken: null };
    }

    const { data } = await response.json();

    console.log("data", data);

    const newCookieValue = encrypt(
      JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    );

    // Set new cookie
    cookieStore.set(cookieName, newCookieValue);

    return { accessToken: data.accessToken };
  } catch (error) {
    console.error("Refresh error:", error);
    return { accessToken: null };
  }
}

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  console.log("prev token", token);
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.warn("Access token expired. Attempting to refresh...");

    const { accessToken: token } = await refreshAuthToken();

    console.log("new token", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);

      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers,
      })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    console.log("data", data)
    
    return data;

    }
  }

  return response.json();
}
