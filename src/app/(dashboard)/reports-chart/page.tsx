"use server";

import { ReportChartResponse } from "@/types/reports-chart";
import BrowserUsage from "./components/BrowserUsage";
import CategoryStatistics from "./components/CategoryStatistics";
import DepartmentStatistics from "./components/DepartmentStatistics";
import KeyMetrics from "./components/KeyMetrics";
import PopularIdeas from "./components/PopularIdeas";
import { getReportChartData } from "@/services/report-chart";

export default async function ReportsPage() {
  const response = (await getReportChartData()) as ReportChartResponse;
  console.log("response", response);

  const { overview, departmentStats, categoryStats, popularIdeas } =
    response.data;

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Reports Dashboard
        </h1>
        <p className="text-muted-foreground">
          View detailed statistics and analytics about your system.
        </p>
      </div>

      <div className="space-y-6">
        <KeyMetrics
          totalIdeas={overview.totalIdeas}
          interactions={overview.interactions}
          totalComments={overview.totalComments}
          activeUsers={overview.activeUsers}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DepartmentStatistics
            data={departmentStats.map((dept) => ({
              name: dept.name,
              ideas: dept.totalPosts,
            }))}
          />
          <CategoryStatistics
            data={categoryStats.map((cat) => ({
              name: cat.name,
              ideas: cat.totalPosts,
            }))}
          />
          <BrowserUsage />
        </div>

        <PopularIdeas popularIdeas={popularIdeas} />
      </div>
    </div>
  );
}
