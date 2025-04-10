"use server";

import { getAllIdeas } from "@/services/idea";
import BrowserUsage from "./components/BrowserUsage";
import CategoryStatistics from "./components/CategoryStatistics";
import DepartmentStatistics from "./components/DepartmentStatistics";
import KeyMetrics from "./components/KeyMetrics";
import PopularIdeas from "./components/PopularIdeas";
import { getAllUsers } from "@/services/user";
import { getAllDepartments } from "@/services/department";
import { getAllCategories } from "@/services/category";

export default async function ReportsPage() {
  const [totalIdeas, totalUsers, departments, categories] = await Promise.all([
    getAllIdeas(),
    getAllUsers(),
    getAllDepartments(),
    getAllCategories(),
  ]);

  const departmentStats = departments.data?.departments.map((dept) => ({
    name: dept.name,
    ideas: dept._count.ideas,
  }));

  console.log("departmentStats", await getAllDepartments());

  const categoryStats = categories.data?.categories.map((cat) => ({
    name: cat.name,
    ideas: cat._count.ideas,
  }));

  console.log("totalIdeas", totalIdeas);

  const metrics = {
    totalIdeas: totalIdeas?.data?.total,
    totalUsers: totalUsers?.data?.total,
  };

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
          totalIdeas={metrics.totalIdeas}
          totalUsers={metrics.totalUsers}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DepartmentStatistics data={departmentStats} />
          <CategoryStatistics data={categoryStats} />
          <BrowserUsage />
        </div>

        <PopularIdeas />
      </div>
    </div>
  );
}
