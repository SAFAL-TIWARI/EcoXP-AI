import React from "react";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No data available",
  description = "Get started by taking action or completing your profile.",
  icon: Icon = FolderOpen,
  actionButton = null
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/20 max-w-md mx-auto">
      <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-500 rounded-full mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>
      {actionButton}
    </div>
  );
}
