"use server";

import { serverFetch } from "./serverFetch";
import { MenuType } from "@/schemas/menuFormSchema";
import { MenuResponse } from "@/types/menu";

export async function getAllMenus(searchParams:Promise<Record<string, string>>) {
  const {limit , page} = await searchParams;

  const perPage= limit || 10;
  const pageNo = page || 1;
  const response: MenuResponse = await serverFetch(`api/menus?page=${pageNo}&limit=${perPage}`);
  return response;
}
export async function createMenu(data: MenuType) {
  const response = await serverFetch("api/menus", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

export async function updateMenu(id: number, data: MenuType) {
  const response = await serverFetch(`api/menus/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteMenu(id: number) {
  const response = await serverFetch(`api/menus/${id}`, {
    method: "DELETE",
  });
  return response;
}
