import React from "react";
import { AlertTriangle, CheckCircle, Lightbulb, ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { EMISSION_CATEGORIES } from "../utils/constants";
import { motion } from "framer-motion";

export default function InsightCards({ insights }) {
  const icons = {
    warning: <AlertTriangle className="h-5 w-5 text-rose-500" />,
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    info: <Lightbulb className="h-5 w-5 text-blue-500" />
  };

  const bgClasses = {
    warning: "bg-rose-500/5 dark:bg-rose-950/5 border-rose-500/10 dark:border-rose-950/20",
    success: "bg-emerald-500/5 dark:bg-emerald-950/5 border-emerald-500/10 dark:border-emerald-950/20",
    info: "bg-blue-500/5 dark:bg-blue-950/5 border-blue-500/10 dark:border-blue-950/20"
  };

  if (!insights || insights.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No insights available yet. Complete a carbon footprint calculation to see personalized reviews.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, idx) => {
        const catConfig = EMISSION_CATEGORIES[insight.category];

        return (
          <motion.div
            key={insight.id || idx}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            className={`p-5 rounded-3xl border flex gap-4 ${bgClasses[insight.type] || bgClasses.info}`}
          >
            {/* Left Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {icons[insight.type] || icons.info}
            </div>

            {/* Content */}
            <div className="flex-grow space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-gray-950 dark:text-white">
                  {insight.title}
                </h4>
                {catConfig && (
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider border ${catConfig.bgClass} ${catConfig.textClass} ${catConfig.borderClass}`}>
                    {catConfig.name}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {insight.description}
              </p>

              {/* Action Link for Low hanging fruit */}
              {insight.actionId && (
                <div className="pt-2">
                  <Link
                    to="/calculator"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
                  >
                    <span>View in Action Plan</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
