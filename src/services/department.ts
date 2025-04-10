"use server"
import { DepartmentResponse } from "@/types/department";
import { serverFetch } from "./serverFetch";
import { DepartmentType } from "@/schemas/departmentFormSchema";

export async function getAllDepartments() {
  const response: DepartmentResponse = await serverFetch("api/departments");
  return response
}

export async function createDepartment(data: DepartmentType) {
  const response = await serverFetch("api/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response
}

export async function updateDepartment(id: number, data: DepartmentType) {
  const response = await serverFetch(`api/departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response
}