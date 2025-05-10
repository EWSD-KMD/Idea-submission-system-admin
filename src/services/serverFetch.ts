// src/services/serverFetch.ts
import { getAuthToken } from "@/lib/actions/auth";

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const headers = new Headers(options.headers);
  
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  // if (response.status === 401) {
  //   const refreshResult = await refreshAuthToken();
    
  //   if (refreshResult.accessToken) {
  //     headers.set("Authorization", `Bearer ${refreshResult.accessToken}`);
      
  //     response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`, {
  //       ...options,
  //       headers,
  //     });
  //   }

  //   console.log("response server ", response)
    
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
  // }

  return response.json();
}