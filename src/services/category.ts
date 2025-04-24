"use server";

import { CategoryType } from "@/schemas/categoryFormSchema";
import { serverFetch } from "./serverFetch";
import { CategoryResponse } from "@/types/category";

export async function getAllCategories() {
  const response: CategoryResponse = await serverFetch("api/categories");
  return response;
}
export async function createCategory(data: CategoryType) {
  const response = await serverFetch("api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

export async function updateCategory(id: number, data: CategoryType) {
  const response = await serverFetch(`api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteCategory(id: number) {
  const response = await serverFetch(`api/categories/${id}`, {
    method: "DELETE",
  });
  return response;
}
