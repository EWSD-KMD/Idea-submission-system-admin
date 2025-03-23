"use server"
import { serverFetch } from "./serverFetch";
import { LoginType } from "@/schemas/loginSchema";

export async function userLogin(data: LoginType) {
  const response = await serverFetch("api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log("response", response);
  return response
}
