import React from "react";
import { Link } from "react-router-dom";
import { CalendarRange, Calculator, ArrowRight } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import EmptyState from "../components/EmptyState";
import HistoryList from "../components/HistoryList";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { formatCarbonValueOnly } from "../utils/formatters";
import useSimulatedLoading from "../hooks/useSimulatedLoading";
import { HistorySkeleton } from "../components/SkeletonLoader";

export default function History() {
  const { history, unitPreference } = useCarbonCalculator();
  const isLoading = useSimulatedLoading(550);

  if (!history || history.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          title="No History Logs Found"
          description="You haven't saved any carbon assessments yet. Complete a questionnaire and save it to track improvements over time!"
          icon={CalendarRange}
          actionButton={
            <Link
              to="/calculator"
              className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              Start Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return <HistorySkeleton />;
  }

  // Format trend data (oldest first for chronological line graph)
  const trendData = [...history]
    .reverse()
    .map(report => ({
      name: report.name,
      Date: new Date(report.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      Emissions: report.result?.total
    }));

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Scans Log
        </span>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
          History & Progress
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Review saved carbon assessments, observe trend lines, and measure your environmental improvement.
        </p>
      </div>

      {/* Trend Line Chart */}
      {trendData.length > 1 && (
        <div className="neo-card-dark space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Footprint Improvement Trend
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              Annual emissions in tonnes CO₂e over chronological scans.
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#37415115" />
                <XAxis
                  dataKey="Date"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [formatCarbonValueOnly(value, unitPreference), "Emissions"]}
                  contentStyle={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    borderRadius: "12px",
                    borderColor: "#10b98120"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Emissions"
                  stroke="#10b981"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                  dot={{ r: 4, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* History List Table */}
      <HistoryList />
    </div>
  );
}
