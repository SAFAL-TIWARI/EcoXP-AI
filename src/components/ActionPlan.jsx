import React from "react";
import { CheckCircle2, Circle, Flame, DollarSign, HelpCircle } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { formatCarbon } from "../utils/formatters";
import { motion, AnimatePresence } from "framer-motion";

export default function ActionPlan({ recommendations }) {
  const { unitPreference, addToast } = useCarbonCalculator();
  // Store completed tips IDs
  const [completedTips, setCompletedTips] = useLocalStorage("ecoxp-completed-tips", []);

  const toggleTip = (id, co2Savings) => {
    if (completedTips.includes(id)) {
      setCompletedTips(prev => prev.filter(item => item !== id));
      addToast("Action unchecked");
    } else {
      setCompletedTips(prev => [...prev, id]);
      addToast(`Action completed! Saved ${co2Savings} kg CO₂e/yr!`);
    }
  };

  const difficultyColors = {
    easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10",
    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10",
    hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/10"
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No recommendations available. Complete a carbon calculation first!
        </p>
      </div>
    );
  }

  // Calculate carbon savings
  const totalSaved = recommendations
    .filter(tip => completedTips.includes(tip.id))
    .reduce((sum, tip) => sum + tip.co2Savings, 0) / 1000; // in tonnes

  return (
    <div className="space-y-6">
      {/* Action Progress Card */}
      {totalSaved > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl text-white shadow-lg shadow-emerald-500/10"
        >
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-85">
            Carbon Savings Secured
          </h4>
          <p className="text-3xl font-extrabold mt-1 tracking-tight">
            {formatCarbon(totalSaved, unitPreference)} / yr
          </p>
          <p className="text-xs opacity-75 mt-2 leading-relaxed font-medium">
            Awesome! You have committed to actions that prevent this amount of greenhouse gases from entering the atmosphere.
          </p>
        </motion.div>
      )}

      {/* Recommendations List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {recommendations.map((tip, idx) => {
            const isDone = completedTips.includes(tip.id);

            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-5 bg-white dark:bg-gray-900 border rounded-3xl transition-all flex items-start gap-4 ${
                  isDone
                    ? "border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/5 shadow-inner"
                    : "border-gray-100 dark:border-gray-800/80 hover:shadow-md"
                }`}
              >
                {/* Check Button */}
                <button
                  onClick={() => toggleTip(tip.id, tip.co2Savings)}
                  className="flex-shrink-0 mt-1 text-gray-400 dark:text-gray-600 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors focus:outline-none"
                >
                  {isDone ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>

                {/* Details */}
                <div className="flex-grow space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-base font-bold transition-all ${
                      isDone ? "text-gray-400 dark:text-gray-500 line-through font-semibold" : "text-gray-900 dark:text-gray-150"
                    }`}>
                      {tip.title}
                    </h4>

                    {/* Tags */}
                    <div className="flex gap-1.5 ml-auto">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${difficultyColors[tip.difficulty]}`}>
                        {tip.difficulty}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10 uppercase">
                        Save: {tip.co2Savings} kg
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed ${
                    isDone ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {tip.description}
                  </p>

                  {!isDone && (
                    <div className="text-xs bg-gray-50 dark:bg-gray-850/40 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/60 text-gray-500 dark:text-gray-400 flex items-start gap-2 leading-relaxed">
                      <HelpCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-gray-700 dark:text-gray-300 font-semibold">Why it matters:</strong> {tip.whyItMatters}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
