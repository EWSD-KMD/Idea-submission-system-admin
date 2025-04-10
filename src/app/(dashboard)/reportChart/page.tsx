import BrowserUsage from "./components/BrowserUsage";
import CategoryStatistics from "./components/CategoryStatistics";
import DepartmentStatistics from "./components/DepartmentStatistics";
import KeyMetrics from "./components/KeyMetrics";
import PopularIdeas from "./components/PopularIdeas";

export default function ReportsPage() {
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
        <KeyMetrics />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DepartmentStatistics />
          <CategoryStatistics />
          <BrowserUsage />
        </div>

        <PopularIdeas />
      </div>
    </div>
  );
}
