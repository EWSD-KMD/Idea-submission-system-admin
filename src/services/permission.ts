"use server";
import { PermissionType } from "@/schemas/permissionFormSchema";
import { serverFetch } from "./serverFetch";
import { PermissionResponse } from "@/types/permission";

export async function getAllPermissions(searchParams:Promise<Record<string, string>>) {
  const {limit , page} = await searchParams;

  const perPage= limit || 10;
  const pageNo = page || 1;
  const response: PermissionResponse = await serverFetch(`api/permissions?page=${pageNo}&limit=${perPage}`);
  return response;
}
export async function createPermission(data: PermissionType) {
 
  const response = await serverFetch(`api/permissions`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

export async function getPermissions() {
  const response: PermissionResponse = await serverFetch(`api/permissions?page=1&limit=1000`);

  return response
}

export async function updatePermission(id: number, data: PermissionType) {
  const response = await serverFetch(`api/permissions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
}

export async function deletePermission(id: number) {
  const response = await serverFetch(`api/permissions/${id}`, {
    method: "DELETE",
  });
  return response;
}
