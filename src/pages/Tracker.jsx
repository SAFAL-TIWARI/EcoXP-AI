import React from "react";
import { Award, Zap, Check, CheckCircle2, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import HabitTracker from "../components/HabitTracker";
import BadgeGrid from "../components/BadgeGrid";
import { challenges as challengesConfig } from "../data/challenges";
import useSimulatedLoading from "../hooks/useSimulatedLoading";
import { TrackerSkeleton } from "../components/SkeletonLoader";

export default function Tracker() {
  const { completedChallenges, completeChallenge } = useCarbonCalculator();
  const isLoading = useSimulatedLoading(550);

  const handleCompleteChallenge = (id, xp) => {
    completeChallenge(id, xp);
  };

  const difficultyColors = {
    easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10",
    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10",
    hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/10"
  };

  if (isLoading) {
    return <TrackerSkeleton />;
  }

  return (
    <div className="py-8 space-y-10">
      {/* Page Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Green Ledger
        </span>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
          Habits & Challenges
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Commit to green daily habits, take on weekly challenges, and unlock badges for consistency.
        </p>
      </div>

      {/* 1. Daily Habits Tracker Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-150 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" /> Daily Habits Checklist
        </h3>
        <HabitTracker />
      </section>

      {/* 2. Weekly / Special Challenges */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-150 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" /> Active Challenges
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-1">
            Complete these specific tasks to earn large XP bonuses and climb levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challengesConfig.map((challenge) => {
            const isCompleted = completedChallenges.includes(challenge.id);

            return (
              <div
                key={challenge.id}
                className={
                  isCompleted
                    ? "p-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/5 soft-pressed flex items-start gap-4 justify-between"
                    : "neo-card-dark p-5 flex items-start gap-4 justify-between transition-all duration-200"
                }
              >
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`text-sm font-bold ${
                      isCompleted ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-900 dark:text-gray-200"
                    }`}>
                      {challenge.title}
                    </h4>
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10">
                      Save: {challenge.co2Impact} kg CO₂e
                    </span>
                  </div>
                  
                  <p className={`text-xs ${
                    isCompleted ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"
                  } leading-relaxed`}>
                    {challenge.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCompleteChallenge(challenge.id, challenge.xp)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 border border-gray-950 dark:border-gray-800 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
                    >
                      <Zap className="h-3.5 w-3.5" /> Claim +{challenge.xp} XP
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Badges System Grid */}
      <section>
        <BadgeGrid />
      </section>
    </div>
  );
}
