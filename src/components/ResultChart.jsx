import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import { EMISSION_CATEGORIES, GLOBAL_AVERAGE_FOOTPRINT } from "../utils/constants";
import { formatCarbonValueOnly } from "../utils/formatters";
import { useCarbonCalculator } from "../context/AppContext";

export default function ResultChart({ categories }) {
  const { unitPreference } = useCarbonCalculator();
  const [activeChart, setActiveChart] = useState("pie"); // 'pie' or 'bar'

  // Format categories data for Recharts
  const chartData = Object.entries(categories).map(([key, val]) => ({
    name: EMISSION_CATEGORIES[key]?.name || key,
    value: val,
    color: EMISSION_CATEGORIES[key]?.color || "#10b981",
    key
  })).filter(item => item.value > 0);

  // Reference comparison data for Bar Chart
  const comparisonData = chartData.map(item => {
    // Arbitrary reasonable target weights based on a 2-ton total goal
    const targets = {
      energy: 0.6,
      transport: 0.6,
      food: 0.5,
      waste: 0.1,
      shopping: 0.2
    };
    return {
      name: item.name,
      "Your Emissions": item.value,
      "Green Target": targets[item.key] || 0.3
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-xl shadow-lg">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            {payload[0].name}
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {formatCarbonValueOnly(payload[0].value, unitPreference)} CO₂e
          </p>
          {payload[0].payload.percent && (
            <p className="text-xs text-emerald-500 font-medium">
              {(payload[0].payload.percent * 100).toFixed(0)}% of total
            </p>
          )}
        </div>
      );
    };
    return null;
  };

  return (
    <div className="neo-card-dark space-y-6">
      {/* Chart Selector Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Emission Visualizations
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Toggle views to analyze category distribution or target comparisons.
          </p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800/60 p-1 rounded-xl self-stretch sm:self-auto">
          <button
            onClick={() => setActiveChart("pie")}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChart === "pie"
                ? "bg-white dark:bg-gray-900 text-gray-850 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveChart("bar")}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChart === "bar"
                ? "bg-white dark:bg-gray-900 text-gray-850 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Target Comparison
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full flex items-center justify-center">
        {chartData.length === 0 ? (
          <p className="text-sm text-gray-400">No emissions calculated yet.</p>
        ) : activeChart === "pie" ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#37415115" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Your Emissions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Green Target" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend list for Pie Chart */}
      {activeChart === "pie" && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {chartData.map(entry => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
