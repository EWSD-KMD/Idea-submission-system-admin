"use server"
import { UserType } from "@/schemas/userFormSchema";
import { serverFetch } from "./serverFetch";

export async function getAllUsers() {
  const response = await serverFetch("api/users");
  return response
  
}
export async function createUser(data: UserType) {
  console.log("data", data)
  const response = await serverFetch("api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log("response", response);
  return response
}
