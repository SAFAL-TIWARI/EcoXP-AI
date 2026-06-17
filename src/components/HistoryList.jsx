import React, { useState } from "react";
import { Trash2, Edit3, Eye, Calendar, FileText, Check } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import { formatDate } from "../utils/helpers";
import { formatCarbon } from "../utils/formatters";
import { useNavigate } from "react-router-dom";
import { EMISSION_CATEGORIES } from "../utils/constants";

export default function HistoryList() {
  const { history, deleteReport, renameReport, setLatestCalculation, unitPreference } = useCarbonCalculator();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleOpen = (report) => {
    // Set this report as active latest, then navigate to results
    setLatestCalculation(report);
    navigate("/results");
  };

  const handleRenameStart = (report) => {
    setEditingId(report.id);
    setEditName(report.name);
  };

  const handleRenameSave = (id) => {
    if (editName.trim()) {
      renameReport(id, editName.trim());
      setEditingId(null);
    }
  };

  if (!history || history.length === 0) {
    return null; // Parent page will handle empty state
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-150">
          Saved Reports
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          Manage and review your historical carbon footprint scans.
        </p>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800/80">
        {history.map((report) => {
          const cat = EMISSION_CATEGORIES[report.result?.biggestCategory];

          return (
            <div
              key={report.id}
              className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-850/10 transition-colors"
            >
              {/* Report Info */}
              <div className="space-y-1.5 flex-grow">
                {editingId === report.id ? (
                  <div className="flex items-center gap-2 max-w-sm">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={() => handleRenameSave(report.id)}
                      className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-150">
                      {report.name}
                    </h4>
                    <button
                      onClick={() => handleRenameStart(report)}
                      className="p-0.5 text-gray-400 hover:text-gray-650 transition-colors"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(report.timestamp)}
                  </span>
                  {cat && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      Peak source: {cat.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Emissions & Action buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <p className="text-base font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">
                    {formatCarbon(report.result?.total, unitPreference)}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
                    Footprint Score
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpen(report)}
                    className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all"
                    title="Open Report"
                  >
                    <Eye className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => deleteReport(report.id)}
                    className="p-2 text-rose-600 hover:bg-rose-500/10 rounded-xl transition-all"
                    title="Delete Report"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
