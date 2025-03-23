"use server"
import { RoleResponse } from "@/types/role";
import { serverFetch } from "./serverFetch";

export async function getAllRoles() {
  const response: RoleResponse = await serverFetch("api/roles");
  return response
  
}
export async function createRole(data: string) {
  const response = await serverFetch("api/roles", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response
}
