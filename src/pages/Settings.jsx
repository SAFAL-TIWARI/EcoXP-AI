import React from "react";
import { useCarbonCalculator } from "../context/AppContext";
import { UNIT_TYPES } from "../utils/constants";
import { Trash2, ShieldCheck, Sun, Moon, Info, Settings as SettingsIcon } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function Settings() {
  const { unitPreference, setUnitPreference, resetAllData } = useCarbonCalculator();
  const { theme, toggleTheme } = useTheme();

  const handleReset = () => {
    const confirm = window.confirm(
      "Are you absolutely sure you want to delete all saved scans, habit tracking logs, streaks, and XP points? This action cannot be undone."
    );
    if (confirm) {
      resetAllData();
    }
  };

  return (
    <div className="py-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Preferences
        </span>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-7 w-7 text-emerald-500" /> Settings
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Manage system configurations, units conversion, and local storage variables.
        </p>
      </div>

      {/* Grid Settings Cards */}
      <div className="space-y-6">
        {/* Unit Preference & Theme card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            System Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Units Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-750 dark:text-gray-300">
                Measurement Unit System
              </label>
              <p className="text-[11px] text-gray-400 leading-normal mb-3 font-medium">
                Converts carbon weights and travel distances between Metric (tonnes, km) and Imperial (lbs, miles).
              </p>
              
              <div className="flex bg-gray-105 dark:bg-gray-800/60 p-1 rounded-2xl w-fit border border-gray-100 dark:border-gray-800/40">
                <button
                  onClick={() => setUnitPreference(UNIT_TYPES.METRIC)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    unitPreference === UNIT_TYPES.METRIC
                      ? "bg-white dark:bg-gray-900 text-gray-950 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Metric (kg/km)
                </button>
                <button
                  onClick={() => setUnitPreference(UNIT_TYPES.IMPERIAL)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    unitPreference === UNIT_TYPES.IMPERIAL
                      ? "bg-white dark:bg-gray-900 text-gray-950 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Imperial (lbs/mi)
                </button>
              </div>
            </div>

            {/* Theme Toggle (Larger Button) */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-750 dark:text-gray-300">
                Visual Layout Theme
              </label>
              <p className="text-[11px] text-gray-400 leading-normal mb-3 font-medium">
                Switch between high-contrast dark theme or standard clean light theme.
              </p>
              
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-250 dark:hover:bg-gray-750 text-gray-800 dark:text-gray-250 text-xs font-bold flex items-center gap-2 transition-all border border-gray-200 dark:border-gray-750"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4.5 w-4.5 text-amber-400 animate-spin" /> Switch to Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4.5 w-4.5 text-indigo-600" /> Switch to Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Local Storage Reset Option */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 text-rose-500">
              Danger Zone
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-normal mt-1 font-medium">
              Erase all calculations history, earned levels, XP milestones, and daily checkins stored on this browser.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/10 hover:shadow-rose-500/20 transition-all flex items-center gap-1.5 focus:outline-none"
          >
            <Trash2 className="h-4.5 w-4.5" /> Wipe All Browser Data
          </button>
        </div>

        {/* Privacy Note */}
        <div className="bg-emerald-500/5 dark:bg-emerald-950/5 border border-emerald-500/15 p-6 rounded-3xl space-y-3 flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">
              Privacy & Security Policy
            </h4>
            <p className="text-xs text-emerald-600/90 dark:text-emerald-500 font-medium leading-relaxed">
              EcoXp AI is built completely on-device. Your utility numbers, flight frequencies, grocery habits, and commute logs are stored securely inside your browser's local sandbox (`localStorage`). We never upload your personal lifestyle choices or metrics to remote servers, analytics databases, or third-party trackers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
