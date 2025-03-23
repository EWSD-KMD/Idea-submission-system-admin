"use server"
import { DepartmentResponse } from "@/types/department";
import { serverFetch } from "./serverFetch";
import { DepartmentType } from "@/schemas/departmentFormSchema";

export async function getAllDepartments() {
  const response: DepartmentResponse = await serverFetch("api/departments");
  return response
}

export async function createDepartment(data: DepartmentType) {
  console.log("data", data)
  const response = await serverFetch("api/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log("response", response);
  return response
}
