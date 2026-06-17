import React from "react";

export function Spinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4"
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-emerald-500 border-r-transparent border-b-emerald-500 border-l-transparent ${sizeClasses[size]} ${className}`}
      role="status"
    />
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
  );
}

export default function Loader({ fullPage = false }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-950 transition-colors">
        <Spinner size="lg" className="mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          Loading EcoXP AI...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Spinner size="md" />
    </div>
  );
}
