import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Save, Zap, Heart, Car, Trash, Globe, ShieldCheck } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { sampleAnswers } from "../data/sampleAnswers";
import { motion, AnimatePresence } from "framer-motion";

export default function StepForm() {
  const { saveCalculation } = useCarbonCalculator();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Save partial draft data in localStorage
  const [draftInputs] = useState(() => {
    try {
      const item = window.localStorage.getItem("ecoxp-calculator-draft");
      return item ? JSON.parse(item) : sampleAnswers.average;
    } catch (error) {
      console.error("Error reading localStorage draft:", error);
      return sampleAnswers.average;
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: draftInputs,
    mode: "onChange"
  });

  const formValues = watch();

  // Keep draft updated
  useEffect(() => {
    try {
      window.localStorage.setItem("ecoxp-calculator-draft", JSON.stringify(formValues));
    } catch (error) {
      console.error("Error saving draft to localStorage:", error);
    }
  }, [formValues]);

  // Load a preset demo profile
  const handleLoadPreset = (presetKey) => {
    const data = sampleAnswers[presetKey];
    if (data) {
      reset(data);
      // Trigger a force re-save of draft
      try {
        window.localStorage.setItem("ecoxp-calculator-draft", JSON.stringify(data));
      } catch (error) {
        console.error("Error saving preset draft to localStorage:", error);
      }
    }
  };

  const onSubmit = (data) => {
    // Save report
    const reportName = data.reportName || `Report ${new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`;
    const report = saveCalculation(data, reportName);
    if (report) {
      // Clear draft after successful save
      localStorage.removeItem("ecoxp-calculator-draft");
      navigate("/results");
    }
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Get active step titles
  const stepTitles = [
    "Home & Energy",
    "Commutes & Transit",
    "Air Travel Frequency",
    "Diet & Lifestyle"
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Demo Preset Panel */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/15 border border-emerald-500/15 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300">
            Hackathon Demo Presets
          </h4>
          <p className="text-xs text-emerald-600/90 dark:text-emerald-400 font-medium">
            Instantly pre-fill the form with standard, sustainable, or heavy emissions behaviors.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => handleLoadPreset("ecoChampion")}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white font-semibold text-xs hover:bg-emerald-600 shadow-sm transition-all"
          >
            Sustainable Champion
          </button>
          <button
            type="button"
            onClick={() => handleLoadPreset("average")}
            className="px-3.5 py-1.5 rounded-xl bg-gray-150 dark:bg-gray-800 text-gray-800 dark:text-gray-250 font-semibold text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
          >
            Average Citizen
          </button>
          <button
            type="button"
            onClick={() => handleLoadPreset("highImpact")}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500 text-white font-semibold text-xs hover:bg-rose-600 shadow-sm transition-all"
          >
            High Carbon Footprint
          </button>
        </div>
      </div>

      {/* Calculator Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header Progress indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-bold text-gray-950 dark:text-white">
              {stepTitles[step - 1]}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-850 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Contents */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Household Size */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Household Size
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      {...register("householdSize", { required: true, min: 1 })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[11px] text-gray-400">Emissions from utilities are divided by this number.</p>
                  </div>

                  {/* Monthly Electricity Usage */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Electricity Usage (kWh / month)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="1200"
                        step="10"
                        {...register("electricityUsage")}
                        className="flex-grow accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white w-16 text-right">
                        {formValues.electricityUsage} kWh
                      </span>
                    </div>
                  </div>

                  {/* Electricity Source */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Grid Energy Source
                    </label>
                    <select
                      {...register("electricitySource")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="average">Standard Grid Mix (Coal/Gas/Renewables)</option>
                      <option value="clean">Clean/Renewables Contract (Solar/Wind/Nuclear)</option>
                      <option value="dirty">Coal-Heavy Grid Mix</option>
                    </select>
                  </div>

                  {/* Cooking Fuel Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Cooking Fuel Type
                    </label>
                    <select
                      {...register("cookingFuel")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="electric">Electric (Induction / Oven)</option>
                      <option value="lpg">LPG Cylinder</option>
                      <option value="naturalGas">Natural Gas</option>
                      <option value="wood">Wood / Biomass</option>
                    </select>
                  </div>

                  {/* Cooking usage amount */}
                  {formValues.cookingFuel !== "electric" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                        {formValues.cookingFuel === "lpg" ? "LPG Cylinder weight (kg / month)" : "Gas usage (cubic meters / month)"}
                      </label>
                      <input
                        type="number"
                        min="0"
                        {...register("cookingUsage")}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  )}

                  {/* Water usage */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Water Usage Habits
                    </label>
                    <select
                      {...register("waterUsage")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="low">Low (Short showers, water-saving fixtures)</option>
                      <option value="medium">Medium (Average showers/use)</option>
                      <option value="high">High (Long daily baths, hot water heavy)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Commute Distance */}
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Daily Commute by Personal Vehicle (km / day)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="5"
                        {...register("carCommute")}
                        className="flex-grow accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white w-16 text-right">
                        {formValues.carCommute} km
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Type */}
                  {Number(formValues.carCommute) > 0 && (
                    <div className="space-y-2 col-span-1 md:col-span-2">
                      <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                        Vehicle / Fuel Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {["petrol", "diesel", "hybrid", "electric", "motorcycle"].map(v => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setValue("vehicleType", v)}
                            className={`p-3.5 rounded-2xl border text-center font-bold text-xs uppercase transition-all ${
                              formValues.vehicleType === v
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-gray-100 dark:border-gray-800/80 hover:border-gray-200 dark:hover:border-gray-750 text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Public Transport */}
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Daily Commute by Public Transit (Bus, Metro, Train) (km / day)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="150"
                        step="5"
                        {...register("publicTransit")}
                        className="flex-grow accent-emerald-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white w-16 text-right">
                        {formValues.publicTransit} km
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-4">
                  Please log number of flight segments taken in the last 12 months.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Short Haul Flights */}
                  <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-850/30 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-gray-300">
                      Short Haul Flights
                    </label>
                    <p className="text-[10px] text-gray-400 leading-normal mb-3 font-medium">
                      Under 1.5 hours duration (e.g., domestic / regional).
                    </p>
                    <input
                      type="number"
                      min="0"
                      {...register("flightsShort")}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Medium Haul Flights */}
                  <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-850/30 rounded-2xl border border-gray-150 dark:border-gray-800/40">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-gray-300">
                      Medium Haul Flights
                    </label>
                    <p className="text-[10px] text-gray-400 leading-normal mb-3 font-medium">
                      1.5 to 5 hours duration (continental flights).
                    </p>
                    <input
                      type="number"
                      min="0"
                      {...register("flightsMedium")}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Long Haul Flights */}
                  <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-850/30 rounded-2xl border border-gray-150 dark:border-gray-800/40">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-gray-300">
                      Long Haul Flights
                    </label>
                    <p className="text-[10px] text-gray-400 leading-normal mb-3 font-medium">
                      Over 5 hours duration (e.g. international / transoceanic).
                    </p>
                    <input
                      type="number"
                      min="0"
                      {...register("flightsLong")}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Diet Pattern */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Dietary Pattern
                    </label>
                    <select
                      {...register("dietPattern")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="heavyMeat">Heavy Meat Eater (Daily beef, pork, or lamb)</option>
                      <option value="averageMeat">Average Meat Eater (Moderate meat/poultry)</option>
                      <option value="pescatarian">Pescatarian (Fish/poultry but no red meat)</option>
                      <option value="vegetarian">Vegetarian (No meat, dairy/eggs allowed)</option>
                      <option value="vegan">Vegan (100% plant-based, no animal products)</option>
                    </select>
                  </div>

                  {/* Food Waste */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Food Waste Frequency
                    </label>
                    <select
                      {...register("foodWaste")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="rarely">Rarely (Zero food waste, active composting)</option>
                      <option value="average">Average (Discard leftover food occasionally)</option>
                      <option value="frequently">Frequently (Throw out expired/uneaten food regularly)</option>
                    </select>
                  </div>

                  {/* Waste Habits */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Household Waste & Recycling
                    </label>
                    <select
                      {...register("wasteHabits")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="low">Low Waste (Heavy recycling, repair, and composting)</option>
                      <option value="medium">Medium Waste (Average garbage bin, moderate recycling)</option>
                      <option value="high">High Waste (Full trash bags regularly, zero recycling)</option>
                    </select>
                  </div>

                  {/* Shopping Habits */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Shopping & Goods Consumption
                    </label>
                    <select
                      {...register("shoppingHabits")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="minimalist">Minimalist (Buy secondhand, repair, only essentials)</option>
                      <option value="moderate">Moderate (Average clothes, gadgets, and goods buying)</option>
                      <option value="heavy">Heavy Consumer (Frequent brand new clothing, electronics)</option>
                    </select>
                  </div>

                  {/* Optional: Report Name */}
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-250">
                      Name this Scan Report
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. June 2026 Assessment"
                      {...register("reportName")}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-850">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-2xl text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 focus:outline-none"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back
          </button>
          
          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 rounded-2xl text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1.5 shadow-md shadow-emerald-500/10 transition-all focus:outline-none"
            >
              Continue <ArrowRight className="h-4.5 w-4.5" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white flex items-center gap-1.5 shadow-lg shadow-emerald-500/15 transition-all focus:outline-none animate-pulse"
            >
              Calculate footprint <Globe className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
