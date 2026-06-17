import React from "react";
import { EMISSION_CATEGORIES } from "../utils/constants";
import { formatCarbon } from "../utils/formatters";
import { useCarbonCalculator } from "../context/AppContext";
import { motion } from "framer-motion";

export default function ResultBreakdown({ categories, total }) {
  const { unitPreference } = useCarbonCalculator();

  return (
    <div className="neo-card-dark space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Emission Breakdown
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Detailed breakdown by lifestyle category.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(categories).map(([key, value]) => {
          const category = EMISSION_CATEGORIES[key];
          if (!category) return null;

          const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {category.name}
                </span>
                <span className="font-bold text-gray-950 dark:text-white">
                  {formatCarbon(value, unitPreference)} ({percentage}%)
                </span>
              </div>
              
              {/* Animated progress bar */}
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed font-medium">
                {category.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
