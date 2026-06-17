import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useCarbonCalculator();

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-rose-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  const bgClasses = {
    success: "bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-950/30 shadow-emerald-500/5",
    error: "bg-white dark:bg-gray-900 border border-rose-100 dark:border-rose-950/30 shadow-rose-500/5",
    info: "bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-950/30 shadow-blue-500/5"
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start p-4 rounded-xl shadow-lg transition-all ${bgClasses[toast.type]}`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {icons[toast.type] || icons.info}
            </div>
            <div className="flex-grow mr-2">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 rounded-lg p-0.5 transition-colors focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
