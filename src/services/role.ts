"use server"
import { RoleResponse } from "@/types/role";
import { serverFetch } from "./serverFetch";
import { RoleType } from "@/schemas/roleFormSchema";

export async function getAllRoles() {
  const response: RoleResponse = await serverFetch("api/roles");
  return response
  
}
export async function createRole(data: RoleType) {
  const response = await serverFetch("api/roles", {
    method: "POST",
    body: JSON.stringify(data),
  });

  console.log("response", response);
  return response
}

export async function updateRole(id: number, data: RoleType) {
  const response = await serverFetch(`api/roles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response
}
