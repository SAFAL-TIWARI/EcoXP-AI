import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Award, ArrowRight, ShieldCheck, HelpCircle, Activity, Share2, Printer } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import EmptyState from "../components/EmptyState";
import ProgressRing from "../components/ProgressRing";
import ResultChart from "../components/ResultChart";
import ResultBreakdown from "../components/ResultBreakdown";
import ActionPlan from "../components/ActionPlan";
import MetricCard from "../components/MetricCard";
import { getImpactLevel, getComparisonPercentage, getReductionPotentialScore } from "../utils/scoringRules";
import { formatCarbon } from "../utils/formatters";
import useSimulatedLoading from "../hooks/useSimulatedLoading";
import { ResultsSkeleton } from "../components/SkeletonLoader";

export default function Results() {
  const { latestCalculation, unitPreference } = useCarbonCalculator();
  const isLoading = useSimulatedLoading(600);

  if (!latestCalculation) {
    return (
      <div className="py-16">
        <EmptyState
          title="No Calculation Report Found"
          description="It looks like you haven't calculated your carbon footprint yet. Run your first assessment to view details here!"
          icon={Calculator}
          actionButton={
            <Link
              to="/calculator"
              className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              Start Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return <ResultsSkeleton />;
  }

  const { result, recommendations, name, timestamp } = latestCalculation;
  const { total, categories, biggestCategory, confidence } = result;

  const impact = getImpactLevel(total);
  const comparison = getComparisonPercentage(total);
  const potentialScore = getReductionPotentialScore(total, recommendations.length);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 space-y-8 print:py-0">
      {/* 1. Header with details & actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-900 pb-6 print:border-none">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Assessment Complete
          </span>
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
            {name}
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Calculated on {new Date(timestamp).toLocaleDateString(undefined, { dateStyle: "long" })}
          </p>
        </div>
        
        {/* Action Controls */}
        <div className="flex gap-2.5 print:hidden">
          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-650 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5 text-xs font-bold border-2 border-gray-950 dark:border-gray-800 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            <Printer className="h-4 w-4" /> Print / Export PDF
          </button>
          <Link
            to="/calculator"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center gap-1.5 border-2 border-gray-950 dark:border-gray-800 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            New Assessment
          </Link>
        </div>
      </div>

      {/* 2. Top Summary: Circular progress and KPI Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Circular Gauge */}
        <div className="neo-card-dark flex flex-col items-center justify-center text-center h-80 space-y-4">
          <ProgressRing value={total} color={impact.chartColor} />
          <div>
            <span className={`inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${impact.colorClass}`}>
              {impact.level} Impact
            </span>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2 max-w-[200px] leading-normal font-medium">
              {impact.description}
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard
            title="Total Annual Emissions"
            value={formatCarbon(total, unitPreference)}
            subtitle={comparison.text}
            icon={Activity}
            trend={{ value: comparison.percentage + "%", isPositive: comparison.isLower }}
            colorClass="text-emerald-500 bg-emerald-500/10 border-emerald-500/15"
          />

          <MetricCard
            title="Largest Contributor"
            value={categories[biggestCategory] ? `${formatCarbon(categories[biggestCategory], unitPreference)}` : "None"}
            subtitle={`Attributed to lifestyle category: ${biggestCategory}`}
            icon={HelpCircle}
            colorClass="text-rose-500 bg-rose-500/10 border-rose-500/15"
          />

          <MetricCard
            title="Confidence Index"
            value={`${confidence}%`}
            subtitle="Based on granular model variables matching factors"
            icon={ShieldCheck}
            colorClass="text-blue-500 bg-blue-500/10 border-blue-500/15"
          />

          <MetricCard
            title="Personal Reduction Score"
            value={`${potentialScore} / 100`}
            subtitle="Higher score indicates larger room for optimization"
            icon={Award}
            colorClass="text-purple-500 bg-purple-500/10 border-purple-500/15"
          />
        </div>
      </div>

      {/* 3. Charts & Data Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultChart categories={categories} />
        <ResultBreakdown categories={categories} total={total} />
      </div>

      {/* 4. Action Plan Recommendations */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-gray-150 tracking-tight">
            Personalized Action Plan
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Based on your highest emissions inputs, check off these recommendations to reduce carbon.
          </p>
        </div>
        
        <ActionPlan recommendations={recommendations} />
      </div>
    </div>
  );
}
