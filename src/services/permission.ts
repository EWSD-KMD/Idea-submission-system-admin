"use server"
import { PermissionType } from "@/schemas/permissionFormSchema";
import { serverFetch } from "./serverFetch";
import { PermissionResponse } from "@/types/permission";

export async function getAllPermissions() {
  const response: PermissionResponse = await serverFetch("api/permissions");
  return response
  
}
export async function createPermission(data: PermissionType) {
  const response = await serverFetch("api/permissions", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response
}

export async function updatePermission(id: number, data: PermissionType) {
  const response = await serverFetch(`api/permissions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response
}
