import React from "react";
import {
  Calculator,
  Sprout,
  Trees,
  Flame,
  Zap,
  Award,
  ShieldCheck,
  CalendarRange,
  Lock
} from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import { badges as badgesConfig } from "../data/badges";
import { motion } from "framer-motion";

const iconMap = {
  Calculator,
  Sprout,
  Trees,
  Flame,
  Zap,
  Award,
  ShieldCheck,
  CalendarRange
};

export default function BadgeGrid() {
  const { earnedBadges } = useCarbonCalculator();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Achievements & Badges
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Gamified carbon milestones you've unlocked.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badgesConfig.map((badge, idx) => {
          const isEarned = earnedBadges.includes(badge.id);
          const Icon = iconMap[badge.icon] || Award;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-2xl border flex flex-col items-center text-center justify-between h-44 transition-all relative overflow-hidden ${
                isEarned
                  ? "border-emerald-100 dark:border-emerald-950/20 bg-emerald-500/5 shadow-sm"
                  : "border-gray-100 dark:border-gray-800/80 bg-gray-50/30 dark:bg-gray-900/10 opacity-70"
              }`}
            >
              {/* Lock Badge Overlay */}
              {!isEarned && (
                <div className="absolute top-2 right-2 text-gray-450 dark:text-gray-650">
                  <Lock className="h-3.5 w-3.5" />
                </div>
              )}

              {/* Icon Circle */}
              <div
                className={`p-3.5 rounded-full ${
                  isEarned
                    ? `bg-gradient-to-br ${badge.color} text-white shadow-md`
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>

              {/* Title and Requirements */}
              <div className="space-y-1 z-10">
                <h4 className={`text-xs font-extrabold ${
                  isEarned ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-600"
                }`}>
                  {badge.name}
                </h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-normal font-medium max-w-[120px] mx-auto">
                  {badge.description}
                </p>
              </div>

              {/* Progress label / footer requirement */}
              <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border tracking-wider ${
                isEarned
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/15"
                  : "bg-gray-100 dark:bg-gray-800/60 text-gray-450 dark:text-gray-550 border-transparent"
              }`}>
                {isEarned ? "Unlocked" : badge.requirement}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
