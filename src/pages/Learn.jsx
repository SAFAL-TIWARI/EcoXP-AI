import React from "react";
import { BookOpen, HelpCircle, Activity, Globe, Leaf, HelpCircle as QuestionIcon, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import useSimulatedLoading from "../hooks/useSimulatedLoading";
import { LearnSkeleton } from "../components/SkeletonLoader";

export default function Learn() {
  const isLoading = useSimulatedLoading(500);

  if (isLoading) {
    return <LearnSkeleton />;
  }
  const modules = [
    {
      icon: Globe,
      title: "What is a Carbon Footprint?",
      content: "A carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide and methane) emitted directly or indirectly by our daily actions. From the electricity powering your lights, to the production of the shirt you bought, to the combustion engine in your car—almost every activity leaves a trace in the atmosphere.",
      color: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
    },
    {
      icon: ShieldAlert,
      title: "Why it Matters Today",
      content: "Accumulated greenhouse gases trap heat in the earth's atmosphere, driving rapid global temperature rise, severe weather, coral bleaching, and biodiversity loss. Stabilizing the climate requires limiting warming to 1.5°C, which demands cutting global emissions in half by 2030 and reaching net-zero by 2050.",
      color: "from-rose-500/10 to-orange-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
    },
    {
      icon: Activity,
      title: "Primary Carbon Drivers",
      content: "For typical individuals, emissions stem from four major sectors: \n\n1. **Home Utility:** Electricity grid mixes and cooking gas burning.\n2. **Transportation:** Petrol/diesel combustion and airline flight segments.\n3. **Diet & Agriculture:** Red meat farming and landfill methane from organic food waste.\n4. **Industry & Shopping:** Embedded carbon from industrial manufacturing and transport of new consumer goods.",
      color: "from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
    },
    {
      icon: Leaf,
      title: "Core Reduction Strategies",
      content: "You don't need a massive budget to make a difference. \n\n* **Energy:** Tweak climate controls, unplug standby electronics, wash clothes with cold water.\n* **Transit:** Walk/bike for short trips (<3 km), use public transit, or carpool.\n* **Food:** Eat vegetarian/vegan on selected days, plan groceries to prevent throwing away uneaten food.\n* **Consumption:** Shop secondhand first, and repair broken items instead of buying new.",
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
    }
  ];

  const myths = [
    {
      myth: "Electric Vehicles (EVs) are just as dirty as petrol cars because of grid electricity.",
      fact: "Fact: While EV manufacturing emissions are slightly higher, they operate with 3-4 times higher efficiency than combustion cars. Even on coal-heavy grids, their lifetime emissions are significantly lower, and they become cleaner as the grid integrates solar and wind."
    },
    {
      myth: "Recycling is the best way to reduce my personal footprint.",
      fact: "Fact: Recycling is helpful but has a relatively minor carbon impact compared to diet shifts, avoiding flight segments, or using public transit. The hierarchy is: Reduce first, Reuse second, and Recycle only as a last resort."
    },
    {
      myth: "Carbon footprints are created by corporations, so individual actions don't matter.",
      fact: "Fact: Corporate emissions exist to supply consumer demands. Systematic shifts in consumer behavior (eating less meat, using transit, selecting solar energy) send rapid signals to supply chains and drive policy changes."
    }
  ];

  return (
    <div className="py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Climate Literacy
        </span>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
          Education Hub
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Short, visual, and beginner-friendly modules on carbon footprints, greenhouse gases, and climate myths.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="neo-card-dark flex flex-col space-y-4"
            >
              <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl w-fit shadow-sm border border-gray-100 dark:border-gray-800">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {m.title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 font-medium whitespace-pre-line">
                {m.content}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Myths & Facts Section */}
      <div className="neo-card-dark space-y-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-amber-500" /> Climate Myths vs. Facts
        </h3>

        <div className="space-y-6 divide-y divide-gray-100 dark:divide-gray-850">
          {myths.map((item, idx) => (
            <div key={idx} className={`pt-6 ${idx === 0 ? "pt-0" : ""} space-y-2`}>
              <div className="flex items-start gap-2.5">
                <span className="text-xs font-black uppercase text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/15 mt-0.5 flex-shrink-0">
                  Myth
                </span>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-snug">
                  "{item.myth}"
                </p>
              </div>

              <div className="flex items-start gap-2.5 pl-4 border-l-2 border-emerald-500">
                <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15 mt-0.5 flex-shrink-0">
                  Fact
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
