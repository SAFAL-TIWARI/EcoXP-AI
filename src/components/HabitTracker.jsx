import React from "react";
import { Flame, CheckSquare, Square, Trophy, CheckCircle, Zap } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";

export default function HabitTracker() {
  const { completedHabits, streak, toggleHabit, userXP } = useCarbonCalculator();
  
  const todayStr = new Date().toISOString().split("T")[0];
  const todayChecked = completedHabits[todayStr] || [];

  const habitsList = [
    {
      id: "no_car_day",
      title: "Car-Free Commute",
      description: "Walked, biked, or took public transit instead of solo driving.",
      impact: "8 kg CO₂e saved",
      xp: 10
    },
    {
      id: "saved_electricity",
      title: "Conserved Home Energy",
      description: "Turned off standby, adjusted climate control, or adjusted lighting.",
      impact: "3 kg CO₂e saved",
      xp: 10
    },
    {
      id: "plant_based_meal",
      title: "Plant-Based Meals",
      description: "Substituted meat/dairy with grains, greens, or legumes today.",
      impact: "5 kg CO₂e saved",
      xp: 10
    },
    {
      id: "reusable_bottle",
      title: "Ditched Disposable Plastics",
      description: "Used reusable mugs, shopping bags, or metal drinkware.",
      impact: "1 kg CO₂e saved",
      xp: 10
    },
    {
      id: "reduced_food_waste",
      title: "Zero Food Waste",
      description: "Finished leftovers, planned meals, or composted scrap materials.",
      impact: "2 kg CO₂e saved",
      xp: 10
    },
    {
      id: "recycled_properly",
      title: "Smart Waste Recycling",
      description: "Cleaned and sorted cardboard, glass, and plastics properly.",
      impact: "2 kg CO₂e saved",
      xp: 10
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Streak and XP summary */}
      <div className="space-y-6">
        {/* Streak card */}
        <div className="p-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl text-white border-2 border-gray-950 dark:border-gray-850 shadow-[4px_4px_0px_0px_#09090b] dark:shadow-[4px_4px_0px_0px_#ffffff] relative overflow-hidden flex flex-col justify-between h-48">
          <div className="absolute right-[-10px] bottom-[-20px] opacity-15">
            <Flame className="h-40 w-40" />
          </div>
          
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-bold uppercase tracking-wider opacity-85">
              Daily Streak
            </span>
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
          
          <div className="z-10">
            <h3 className="text-5xl font-black tracking-tight">
              {streak} {streak === 1 ? "Day" : "Days"}
            </h3>
            <p className="text-xs opacity-85 mt-1.5 leading-relaxed font-semibold">
              {streak > 0
                ? "Keep the fire burning! Log at least one green habit every day."
                : "Start logging habits today to begin your streak!"}
            </p>
          </div>
        </div>

        {/* XP Progress Card */}
        <div className="neo-card-dark h-48 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
              Your Level Progress
            </span>
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          
          <div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase">
                LVL {Math.floor(userXP / 100) + 1}
              </span>
              <span className="text-sm font-extrabold text-gray-850 dark:text-gray-150">
                {userXP % 100} / 100 XP
              </span>
            </div>
            
            {/* Experience bar */}
            <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-850 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${userXP % 100}%` }}
              />
            </div>
          </div>
          
          <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed font-medium">
            Earn +10 XP for every daily habit logged, and up to +150 XP by completing weekly challenges!
          </p>
        </div>
      </div>

      {/* Right Column: Daily Checklist */}
      <div className="lg:col-span-2 neo-card-dark space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-150">
            Daily Green Actions
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Complete and log these simple habits daily to secure carbon reductions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habitsList.map(habit => {
            const isChecked = todayChecked.includes(habit.id);

            return (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                  isChecked
                    ? "soft-pressed border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/5"
                    : "soft-raised border-transparent bg-white dark:bg-gray-900/60 hover:bg-gray-50/50 dark:hover:bg-gray-850/5"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-650 hover:text-emerald-500 transition-colors">
                  {isChecked ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 dark:border-gray-700 rounded" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <h4 className={`text-sm font-bold transition-all ${
                    isChecked ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-900 dark:text-gray-200"
                  }`}>
                    {habit.title}
                  </h4>
                  <p className={`text-xs ${
                    isChecked ? "text-gray-400/80 dark:text-gray-650" : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {habit.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/15">
                      {habit.impact}
                    </span>
                    <span className="text-[9px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/15 flex items-center gap-0.5">
                      <Zap className="h-2.5 w-2.5" /> +{habit.xp} XP
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
