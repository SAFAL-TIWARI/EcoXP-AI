export const EMISSION_CATEGORIES = {
  energy: {
    id: "energy",
    name: "Home Energy",
    color: "#3b82f6", // Blue
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-500 dark:text-blue-400",
    borderClass: "border-blue-500/20",
    description: "Emissions from home electricity and cooking fuel."
  },
  transport: {
    id: "transport",
    name: "Transportation",
    color: "#f59e0b", // Amber
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-500 dark:text-amber-400",
    borderClass: "border-amber-500/20",
    description: "Emissions from daily commutes, public transit, and flights."
  },
  food: {
    id: "food",
    name: "Diet & Food",
    color: "#10b981", // Emerald
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-500 dark:text-emerald-400",
    borderClass: "border-emerald-500/20",
    description: "Emissions based on diet patterns and food waste."
  },
  waste: {
    id: "waste",
    name: "Waste & Recycling",
    color: "#8b5cf6", // Purple
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-500 dark:text-purple-400",
    borderClass: "border-purple-500/20",
    description: "Emissions from household waste generation and recycling habits."
  },
  shopping: {
    id: "shopping",
    name: "Consumption",
    color: "#ec4899", // Pink
    bgClass: "bg-pink-500/10",
    textClass: "text-pink-500 dark:text-pink-400",
    borderClass: "border-pink-500/20",
    description: "Emissions from purchasing new clothes, electronics, and goods."
  }
};

export const UNIT_TYPES = {
  METRIC: "metric", // kg, km, t CO2e
  IMPERIAL: "imperial", // lbs, miles, t CO2e
};

export const TARGET_CARBON_GOAL = 2.0; // t CO2e/year target per capita
export const GLOBAL_AVERAGE_FOOTPRINT = 4.5; // t CO2e/year
