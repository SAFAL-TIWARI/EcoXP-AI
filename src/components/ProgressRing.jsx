import React from "react";
import { motion } from "framer-motion";

export default function ProgressRing({
  value,
  maxVal = 15, // standard maximum scale (above this is extremely high)
  title = "Annual Footprint",
  unit = "t CO₂e",
  color = "#10b981", // default emerald
  className = ""
}) {
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  // Calculate percentage of progress capped between 0 and 100
  const percentage = Math.min(Math.max((value / maxVal) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 select-none drop-shadow-md"
      >
        {/* Background Circle */}
        <circle
          className="text-gray-100 dark:text-gray-800 transition-colors"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        
        {/* Progress Circle with Animation */}
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Centered Labels */}
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">
          {value.toFixed(1)}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {unit}
        </span>
      </div>
    </div>
  );
}
