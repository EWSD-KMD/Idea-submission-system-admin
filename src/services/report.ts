"use server"

import { ReportResponse } from "@/types/report";
import { serverFetch } from "./serverFetch";

export async function getAllReports() {
  const response: ReportResponse = await serverFetch("api/admin/report");
  return response
}

export async function disableOrEnableUser(id: number, data: { disabledInd: boolean}) {
  const response = await serverFetch(`api/admin/user/${id}/disabled`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

  return response
}

export async function fullyDisableOrEnableUser(id: number, data : {disabledInd: boolean}) {
  const response = await serverFetch(`api/admin/user/${id}/fullyDisabled`, {
    method: "PUT",
    body: JSON.stringify(data),
})

return response
  
}