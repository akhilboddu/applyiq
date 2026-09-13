// src/pages/DashboardPage.jsx
import { useMemo } from "react";
import StatCard from "../components/ui/StatCard.jsx";
import WeeklyChart from "../components/applications/WeeklyChart.jsx";
import { toWeeklyData } from "../lib/weekly.js";
import { calculateStats } from "../lib/stats.js";
import { useApplications } from "../hooks/useApplications.js";

export default function DashboardPage() {
  const { data, isPending, isError } = useApplications();
  const applications = data ?? [];

  const chartData = useMemo(() => toWeeklyData(applications), [applications]);
  const stats = useMemo(() => calculateStats(applications), [applications]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Applications</h1>
      <p className="text-gray-400">Welcome back to ApplyIQ.</p>

      {isError && (
        <p className="mt-4 rounded border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">
          Could not load your applications.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Active" value={stats.active} />
        <StatCard label="Interviews" value={stats.interviews} />
        <StatCard label="Offers" value={stats.offers} />
      </div>

      <div className="mt-6">
        {isPending ? (
          <p className="text-sm text-gray-400">Loading chart…</p>
        ) : (
          <WeeklyChart data={chartData} />
        )}
      </div>
    </div>
  );
}
