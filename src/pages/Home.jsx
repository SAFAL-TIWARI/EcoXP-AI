import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Calculator, Flame, Award, Globe, HelpCircle, Leaf, Zap, ArrowRight, Star } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const featureCards = [
    {
      icon: Calculator,
      title: "Guided Calculator",
      description: "Estimate your household utility, travel, flight, and diet emissions in less than 5 minutes.",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: Leaf,
      title: "Action Plan",
      description: "Receive custom recommendations to reduce footprint based on your highest emission sources.",
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20"
    },
    {
      icon: Flame,
      title: "Daily Habit Tracker",
      description: "Complete and check off green daily tasks to build streaks, unlock levels, and earn XP.",
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20"
    },
    {
      icon: Award,
      title: "Badge Achievements",
      description: "Unlock beautiful milestone awards for consistency, carbon-saving limits, and challenges.",
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5 select-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] dark:bg-teal-500/5 select-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shadow-inner"
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>Join 15,000+ Eco-Conscious Users</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-gray-50 tracking-tight leading-[1.08] max-w-3xl mx-auto"
          >
            Track, Reduce, and Gamify Your{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Carbon Footprint
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed"
          >
            Understand your environmental impact, receive a personalized action plan, track green daily habits, and earn badges along the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/calculator"
              className="px-8 py-3.5 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all text-center flex items-center justify-center gap-2 group"
            >
              Start Carbon Calculator
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/learn"
              className="px-8 py-3.5 w-full sm:w-auto rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold text-sm transition-all text-center border border-gray-200 dark:border-gray-700"
            >
              Explore Learning Hub
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Visual Explainer Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
            Understand your footprint in minutes
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium max-w-md mx-auto">
            Small daily actions sum up to global changes. Here is how EcoXP AI helps you lead a sustainable lifestyle.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featureCards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-4"
              >
                <div className={`p-3 rounded-2xl border w-fit ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. Small Impact Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-emerald-500/10">
          <div className="absolute right-[-100px] top-[-50px] opacity-10">
            <Globe className="h-96 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20 relative z-10">
            <div className="space-y-1 py-4 md:py-0">
              <h3 className="text-4xl font-black">2.0 Tonnes</h3>
              <p className="text-xs opacity-75 font-semibold uppercase tracking-wider">
                Target Per Capita Emissions
              </p>
            </div>
            <div className="space-y-1 py-4 md:py-0">
              <h3 className="text-4xl font-black">4.5 Tonnes</h3>
              <p className="text-xs opacity-75 font-semibold uppercase tracking-wider">
                Current Global Average
              </p>
            </div>
            <div className="space-y-1 py-4 md:py-0">
              <h3 className="text-4xl font-black">-15% Carbon</h3>
              <p className="text-xs opacity-75 font-semibold uppercase tracking-wider">
                Average User reduction in 30 days
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
