import React from "react";
import { motion } from "framer-motion";

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = null, // { value: '12%', isPositive: true/false }
  colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  className = ""
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {value}
        </h4>
        
        <div className="flex items-center gap-1.5">
          {trend && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                trend.isPositive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              }`}
            >
              {trend.value}
            </span>
          )}
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
