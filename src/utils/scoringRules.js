import { GLOBAL_AVERAGE_FOOTPRINT, TARGET_CARBON_GOAL } from "./constants";

/**
 * Classifies a carbon footprint score into Low, Moderate, or High impact.
 * @param {number} scoreInTonnes - Carbon footprint in metric tonnes CO2e/year
 */
export const getImpactLevel = (scoreInTonnes) => {
  if (scoreInTonnes < 3.0) {
    return {
      level: "Low",
      colorClass: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
      chartColor: "#10b981",
      description: "Excellent job! Your footprint is in line with or approaching climate-safe targets.",
    };
  } else if (scoreInTonnes <= 8.0) {
    return {
      level: "Moderate",
      colorClass: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
      chartColor: "#f59e0b",
      description: "Your footprint is near the national or global average. There are clear opportunities to reduce it.",
    };
  } else {
    return {
      level: "High",
      colorClass: "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20",
      chartColor: "#f43f5e",
      description: "Your footprint is significantly higher than global averages and climate goals. Review the action plan to identify major savings.",
    };
  }
};

/**
 * Generates an evaluation string comparing the user's score to reference targets.
 */
export const getComparisonPercentage = (scoreInTonnes) => {
  const diff = scoreInTonnes - GLOBAL_AVERAGE_FOOTPRINT;
  const pct = Math.abs((diff / GLOBAL_AVERAGE_FOOTPRINT) * 100).toFixed(0);

  if (diff < 0) {
    return {
      text: `${pct}% lower than the global average (${GLOBAL_AVERAGE_FOOTPRINT} t CO₂e)`,
      isLower: true,
      percentage: pct,
    };
  } else if (diff === 0) {
    return {
      text: `exactly equal to the global average (${GLOBAL_AVERAGE_FOOTPRINT} t CO₂e)`,
      isLower: false,
      percentage: 0,
    };
  } else {
    return {
      text: `${pct}% higher than the global average (${GLOBAL_AVERAGE_FOOTPRINT} t CO₂e)`,
      isLower: false,
      percentage: pct,
    };
  }
};

/**
 * Calculates a 'Reduction Potential' score (0-100) based on emissions and choices
 */
export const getReductionPotentialScore = (scoreInTonnes, activeTipsCount) => {
  // If carbon footprint is already very low, reduction potential is lower (it's harder to cut more)
  // If carbon footprint is high, there is a large room for improvement
  if (scoreInTonnes <= TARGET_CARBON_GOAL) {
    return 15; // Hard to reduce further
  }
  const rawPotential = (scoreInTonnes - TARGET_CARBON_GOAL) * 8 + activeTipsCount * 2;
  return Math.min(Math.max(Math.round(rawPotential), 20), 95);
};
