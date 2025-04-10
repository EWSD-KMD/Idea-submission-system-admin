"use server";

import {
  AcademicYearResponse,
  getCurrentAcademicYearResponse,
} from "@/types/academic-year";
import { serverFetch } from "./serverFetch";
import { AcademicYearType } from "@/schemas/academicYearFormSchema";

export async function getAllAcademicYears() {
  const response: AcademicYearResponse = await serverFetch("api/academicYears");
  return response;
}
export async function getCurrentAcademicYear() {
  const response: getCurrentAcademicYearResponse = await serverFetch(
    "api/admin/masterSetting"
  );
  return response;
}

export async function setCurrentAcademicYear(data: {
  currentAcademicYearId: number;
}) {
  const response = await serverFetch(`api/admin/masterSetting/1`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return response;
}

export async function createAcademicYear(data: AcademicYearType) {
  const response = await serverFetch("api/academicYears", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

export async function updateAcademicYear(id: number, data: AcademicYearType) {
  const response = await serverFetch(`api/academicYears/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteAcademicYear(id: number) {
  const response = await serverFetch(`api/academicYears/${id}`, {
    method: "DELETE",
  });
  return response;
}
