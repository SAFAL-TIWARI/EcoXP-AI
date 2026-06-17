import React from "react";

// Base pulsing block component
export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl ${className}`} />
  );
}

// 1. Home Page Skeleton
export function HomeSkeleton() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header Area (Two Columns) */}
      <div className="pt-12 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <Skeleton className="h-7 w-64 rounded-full" />
          <Skeleton className="h-16 w-11/12 md:w-3/4" />
          <Skeleton className="h-12 w-9/12 md:w-1/2" />
          <div className="space-y-3 pt-2">
            <Skeleton className="h-4 w-10/12 md:w-2/3" />
            <Skeleton className="h-4 w-8/12 md:w-1/2" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Skeleton className="h-12 w-full sm:w-52 rounded-2xl" />
            <Skeleton className="h-12 w-full sm:w-48 rounded-2xl" />
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <Skeleton className="h-96 w-full rounded-[2rem]" />
        </div>
      </div>

      {/* Explainer Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <Skeleton className="h-8 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-3xl space-y-4 shadow-sm">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <Skeleton className="h-5 w-2/3" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-36 w-full rounded-3xl" />
      </div>
    </div>
  );
}

// 2. Calculator Page Skeleton
export function CalculatorSkeleton() {
  return (
    <div className="py-8 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-6">
        <Skeleton className="h-9 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-11/12 mx-auto" />
      </div>

      {/* Presets Panel */}
      <div className="p-5 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4.5 w-40" />
          <Skeleton className="h-3 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-28 rounded-xl" />
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-8 w-28 rounded-xl" />
        </div>
      </div>

      {/* Main Questionnaire Box */}
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 sm:p-8 space-y-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-3.5 w-48" />
            </div>
          ))}
        </div>

        {/* Form Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-850">
          <Skeleton className="h-10 w-24 rounded-2xl" />
          <Skeleton className="h-10 w-28 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// 3. Results Page Skeleton
export function ResultsSkeleton() {
  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-900 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-60" />
          <Skeleton className="h-3 w-40" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* Circle Progress + Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left Circular Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 h-80 flex flex-col items-center justify-center space-y-4">
          <Skeleton className="h-36 w-36 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-3 w-36" />
        </div>

        {/* KPI Metrics Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-8 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart & Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-3xl h-80 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-56 w-full" />
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-3xl h-80 space-y-4">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-3.5 pt-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-24 w-full rounded-3xl" />
        <Skeleton className="h-24 w-full rounded-3xl" />
      </div>
    </div>
  );
}

// 4. Insights Page Skeleton
export function InsightsSkeleton() {
  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-3 w-72" />
      </div>

      {/* Audit cards grid */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-5 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl flex gap-4">
              <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
              <div className="space-y-2 flex-grow">
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4.5 w-16" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assistant Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 h-[400px] flex flex-col justify-between">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          <div className="space-y-2.5 mt-8">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-10 w-full rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 h-[400px] flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto mb-4">
            <div className="flex gap-3 max-w-[80%]">
              <Skeleton className="h-8 w-8 rounded-xl flex-shrink-0" />
              <Skeleton className="h-16 w-64 rounded-2xl rounded-tl-none" />
            </div>
            <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
              <Skeleton className="h-8 w-8 rounded-xl flex-shrink-0" />
              <Skeleton className="h-12 w-48 rounded-2xl rounded-tr-none" />
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-850">
            <Skeleton className="h-10 flex-grow rounded-2xl" />
            <Skeleton className="h-10 w-10 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Habits Tracker Page Skeleton
export function TrackerSkeleton() {
  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-60" />
        <Skeleton className="h-3 w-72" />
      </div>

      {/* Streak and XP cards Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-3xl" />
          <div className="p-6 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl h-48 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-2.5 w-full rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 space-y-6 h-[400px]">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3.5 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="p-4 bg-gray-50/50 dark:bg-gray-900/10 border border-gray-100 dark:border-gray-800/80 rounded-2xl flex gap-3">
                <Skeleton className="h-5 w-5 rounded mt-0.5 flex-shrink-0" />
                <div className="space-y-1.5 flex-grow">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenges */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-36" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28 w-full rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. Learn Page Skeleton
export function LearnSkeleton() {
  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-3 w-72" />
      </div>

      {/* Grid Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-6 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl space-y-4 shadow-sm h-56 flex flex-col justify-between">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-5 w-40" />
            <div className="space-y-2.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>

      {/* Myth vs Fact */}
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-3xl space-y-6">
        <Skeleton className="h-5 w-48" />
        <div className="space-y-6 pt-2">
          {[1, 2].map(i => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3.5 w-full pl-4 border-l-2 border-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 7. History Page Skeleton
export function HistorySkeleton() {
  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-3 w-72" />
      </div>

      {/* Trend Graph Box */}
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-3xl h-72 space-y-4">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3.5 w-60" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>

      {/* History List Container */}
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 space-y-6">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3.5 w-64" />
        </div>
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-850">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex justify-between items-center py-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 8. Settings Page Skeleton
export function SettingsSkeleton() {
  return (
    <div className="py-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-3 w-64" />
      </div>

      {/* System Preferences Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 space-y-6">
        <Skeleton className="h-5 w-36" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {[1, 2].map(i => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-10 w-36 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 space-y-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-10 w-44 rounded-2xl" />
      </div>
    </div>
  );
}

// 9. AI Chat Typing Indicator Skeleton
export function ChatTypingSkeleton() {
  return (
    <div className="flex gap-3 max-w-[85%] mr-auto">
      <div className="h-8 w-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
        ...
      </div>
      <div className="p-3.5 rounded-2xl rounded-tl-none border bg-emerald-500/5 border-emerald-500/15 text-gray-800 dark:text-gray-200 min-w-36 flex items-center gap-1.5 justify-center py-4">
        <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
