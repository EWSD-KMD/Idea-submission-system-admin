import { ReportChartResponse } from "@/types/reports-chart";
import { serverFetch } from "./serverFetch";

export async function getReportChartData() {
  const response: ReportChartResponse = await serverFetch("api/admin/stats");
  return response;
}
