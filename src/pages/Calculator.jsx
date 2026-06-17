import React from "react";
import StepForm from "../components/StepForm";

export default function Calculator() {
  return (
    <div className="py-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-150 tracking-tight">
          Carbon Footprint Assessment
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Fill in your home utility, commute, flights, and dietary habits to estimate your annual emissions.
        </p>
      </div>

      <StepForm />
    </div>
  );
}
