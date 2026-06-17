import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Calculator,
  Flame,
  Award,
  Globe,
  HelpCircle,
  Leaf,
  Zap,
  ArrowRight,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Bot,
  Send,
  User,
  Trophy,
  Sparkles,
  ShieldCheck,
  TrendingDown
} from "lucide-react";
import useSimulatedLoading from "../hooks/useSimulatedLoading";
import { HomeSkeleton } from "../components/SkeletonLoader";

export default function Home() {
  const isLoading = useSimulatedLoading(500);

  // 1. Quick-Estimator State
  const [diet, setDiet] = useState("average");
  const [commute, setCommute] = useState("sedan");
  const [energy, setEnergy] = useState("mixed");

  const dietEmissions = { "heavy-meat": 3.3, average: 2.0, vegetarian: 1.3, vegan: 0.8 };
  const commuteEmissions = { suv: 4.5, sedan: 2.4, transit: 0.8, active: 0.1 };
  const energyEmissions = { coal: 3.5, mixed: 1.8, solar: 0.2 };

  const totalEmissions = (
    dietEmissions[diet] +
    commuteEmissions[commute] +
    energyEmissions[energy]
  ).toFixed(1);

  const getEcoGrade = (val) => {
    const num = parseFloat(val);
    if (num < 2.0) {
      return { grade: "A+", desc: "Eco Champion", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
    }
    if (num < 3.5) {
      return { grade: "A", desc: "Green Guardian", color: "text-teal-500 bg-teal-500/10 border-teal-500/20" };
    }
    if (num < 5.0) {
      return { grade: "B", desc: "Eco Citizen", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
    }
    if (num < 7.0) {
      return { grade: "C", desc: "Average Consumer", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" };
    }
    return { grade: "F", desc: "High Emitter", color: "text-red-500 bg-red-500/10 border-red-500/20" };
  };

  const ecoInfo = getEcoGrade(totalEmissions);

  // 2. Gamification Sandbox State
  const [xp, setXp] = useState(30);
  const [level, setLevel] = useState(1);
  const [checkedHabits, setCheckedHabits] = useState([]);

  const sandboxHabits = [
    { id: "reusable", text: "Used a reusable water bottle today", xp: 15 },
    { id: "commute", text: "Biked or took transit to work/school", xp: 30 },
    { id: "appliance", text: "Unplugged vampire electronics", xp: 10 },
    { id: "meatless", text: "Opted for a vegetarian lunch", xp: 20 },
  ];

  const handleHabitToggle = (id, habitXp) => {
    const isChecked = checkedHabits.includes(id);
    let newChecked;
    let newXp;

    if (isChecked) {
      newChecked = checkedHabits.filter((h) => h !== id);
      newXp = Math.max(30, xp - habitXp);
    } else {
      newChecked = [...checkedHabits, id];
      newXp = xp + habitXp;
    }

    setCheckedHabits(newChecked);
    setXp(newXp);

    if (newXp >= 100) {
      setLevel(2);
    } else {
      setLevel(1);
    }
  };

  // 3. AI Assistant Simulator State
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "ai",
      text: "Hello! I am your offline AI assistant. Click one of the suggestions below to test how I can analyze your green habits and footprint!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const aiQuestions = [
    {
      q: "How to reduce food emissions?",
      a: "To significantly lower your food-related emissions:\n\n1. **Eat more plant-based meals**: Swapping beef for beans or lentils cuts meal emissions by up to 90%.\n2. **Reduce food waste**: Plan meals and compost scraps. Food waste accounts for 8% of global emissions.\n3. **Buy local & seasonal**: Minimizes the carbon footprint of long-distance transport (food miles)."
    },
    {
      q: "Are electric vehicles actually cleaner?",
      a: "Yes! Even on grids dominated by fossil fuels, EVs are cleaner than gas cars over their lifetime.\n\n- On standard mixed grids, an EV reduces emissions by **50% to 70%** compared to gas cars.\n- If powered by solar or renewable energy, emissions drop by **over 95%**.\n- Use the EcoXP Tracker to log your EV miles and see the reduction!"
    },
    {
      q: "Highest home energy savings?",
      a: "Top 3 actions for home carbon reduction:\n\n1. **Switch to LED bulbs**: Uses 75% less energy and lasts 25x longer.\n2. **Adjust your thermostat**: Setting it 1-2°C lower in winter or higher in summer saves up to 10% on utility bills.\n3. **Unplug standby power**: Off-load phantom energy draws from chargers and TVs, saving up to 5% annually."
    }
  ];

  const handleAiQuestion = (q, a) => {
    if (isTyping) return;

    // Add user message
    const historyWithUser = [...chatHistory, { sender: "user", text: q }];
    setChatHistory(historyWithUser);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatHistory([...historyWithUser, { sender: "ai", text: a }]);
    }, 1000);
  };

  // 4. Comparison Tab State
  const [comparisonTab, setComparisonTab] = useState("transport");
  const comparisonData = {
    transport: {
      title: "500-Mile Travel Selection",
      optionA: { name: "Domestic Economy Flight", co2: 140, style: "text-rose-500 bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/20" },
      optionB: { name: "Intercity Electric Train", co2: 15, style: "text-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/20" },
      saved: 125,
      fact: "Equivalent to planting 6 tree saplings and growing them for 10 years."
    },
    food: {
      title: "Daily Meal Choice (1 Month)",
      optionA: { name: "Standard Beef Burger Intake", co2: 220, style: "text-rose-500 bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/20" },
      optionB: { name: "100% Plant-Based Alternative", co2: 30, style: "text-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/20" },
      saved: 190,
      fact: "Equivalent to charging a standard smartphone for over 23,000 hours."
    },
    energy: {
      title: "Annual Lighting (Standard Home)",
      optionA: { name: "Traditional Incandescent lighting", co2: 110, style: "text-rose-500 bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/20" },
      optionB: { name: "Energy Star Certified LEDs", co2: 12, style: "text-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/20" },
      saved: 98,
      fact: "Equivalent to powering a standard domestic refrigerator for 6 months."
    }
  };

  const comp = comparisonData[comparisonTab];

  // 5. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);
  const faqData = [
    {
      q: "How secure is my carbon footprint data?",
      a: "EcoXP AI is built around a privacy-first local architecture. All calculation details, utility entries, travel miles, and daily habits are stored 100% on your device using your browser's localStorage. No personal data or footprint details are transmitted to external servers."
    },
    {
      q: "How does the XP and Leveling system work?",
      a: "You earn Experience Points (XP) by logging details in the Carbon Calculator, maintaining habit streaks, and checking off eco-friendly tasks. Earning 100 XP levels you up, unlocks achievements, and awards milestones."
    },
    {
      q: "What emission standards are used for calculations?",
      a: "Our calculator utilizes standard emission factors sourced from the US EPA (Environmental Protection Agency), DEFRA, and IPCC guidelines. These factors convert energy use (kWh), vehicle miles, flights, and dietary habits into precise kilograms/tonnes of CO2 equivalent (CO2e)."
    },
    {
      q: "Does the AI assistant share my chats?",
      a: "No. The AI environmental assistant utilizes local logic rules and custom prompts processed entirely on your machine. Your prompts, queries, and chatbot insights remain 100% private to your browser instance."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="space-y-28 pb-24 text-left">
      {/* 1. Hero Section */}
      <section className="relative pt-6 md:pt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] select-none pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[100px] select-none pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shadow-inner"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>Join 15,000+ Eco-Conscious Users</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-gray-50 tracking-tight leading-[1.08] max-w-2xl"
            >
              Track, Reduce, and Gamify Your{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                Carbon Footprint
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-semibold"
            >
              Understand your environmental impact, receive a personalized action plan, track green daily habits, and earn badges along the way. All on-device and private.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <Link
                to="/calculator"
                className="px-8 py-3.5 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm border-2 border-gray-950 dark:border-gray-850 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-center flex items-center justify-center gap-2 group cursor-pointer"
              >
                Start Carbon Calculator
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/learn"
                className="px-8 py-3.5 w-full sm:w-auto rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-extrabold text-sm border-2 border-gray-950 dark:border-gray-850 shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(9,9,11,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-center cursor-pointer"
              >
                Explore Learning Hub
              </Link>
            </motion.div>

            {/* Quality Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-xs font-bold text-gray-400 dark:text-gray-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>100% Privacy Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-teal-500" />
                <span>Local AI Logic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-blue-500" />
                <span>EPA standard Carbon calculations</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-emerald-500/10 dark:bg-teal-500/10 rounded-[2rem] blur-2xl pointer-events-none" />
            <div className="relative border-2 border-gray-950 dark:border-gray-800 rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_#10b981] dark:shadow-[8px_8px_0px_0px_#14b8a6] bg-white dark:bg-gray-900 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#10b981] dark:hover:shadow-[12px_12px_0px_0px_#14b8a6]">
              <img
                src="/assets/hero_image.jpeg"
                alt="EcoXP AI holographic Earth carbon emissions dashboard rendering"
                className="w-full h-auto object-cover select-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Quick-Estimator Widget Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Text Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-extrabold text-xs w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Instant Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-50 tracking-tight leading-[1.15]">
              Quick Footprint Estimator
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
              Select your daily preferences in the preview console. Our real-time calculator displays your projected annual emissions and carbon rating.
            </p>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/40 border-2 border-gray-250 dark:border-gray-800 rounded-2xl flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                <Globe className="h-5 w-5" />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                The global per capita target to halt warming is <strong className="text-emerald-500 dark:text-emerald-400">2.0 Tonnes</strong>. Current average is <strong className="text-rose-500">4.5 Tonnes</strong>.
              </p>
            </div>
          </div>

          {/* Quick-Estimator Console */}
          <div className="lg:col-span-7">
            <div className="neo-card-dark h-full flex flex-col justify-between p-6 sm:p-8 space-y-8 bg-gray-950 text-white border-2 border-gray-950">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <span className="font-extrabold text-sm tracking-wider uppercase text-emerald-400">Footprint Calculator Console</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Live Simulation</span>
                </div>

                {/* 1. Diet Toggle */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">1. Dietary Pattern</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: "heavy-meat", label: "Heavy Meat" },
                      { key: "average", label: "Balanced" },
                      { key: "vegetarian", label: "Vegetarian" },
                      { key: "vegan", label: "Vegan" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setDiet(opt.key)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl transition-all border ${
                          diet === opt.key
                            ? "bg-emerald-500 text-gray-950 border-emerald-400 shadow-inner"
                            : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-850 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Commute Toggle */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">2. Primary Travel / Commute Mode</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: "suv", label: "SUV / Gas Car" },
                      { key: "sedan", label: "Compact Sedan" },
                      { key: "transit", label: "Public Transit" },
                      { key: "active", label: "EV / Active" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setCommute(opt.key)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl transition-all border ${
                          commute === opt.key
                            ? "bg-emerald-500 text-gray-950 border-emerald-400 shadow-inner"
                            : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-850 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Utility Energy Toggle */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">3. Household Power Mix</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "coal", label: "Coal / Gas Grid" },
                      { key: "mixed", label: "Mixed Grid" },
                      { key: "solar", label: "100% Renewable" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setEnergy(opt.key)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl transition-all border ${
                          energy === opt.key
                            ? "bg-emerald-500 text-gray-950 border-emerald-400 shadow-inner"
                            : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-850 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Calculations display */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-1">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Projected Annual Footprint</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-emerald-400">{totalEmissions}</span>
                    <span className="text-sm font-bold text-gray-400">tonnes CO₂e</span>
                  </div>
                </div>

                <div className={`p-3 border rounded-xl flex items-center justify-between gap-3 ${ecoInfo.color}`}>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Eco Rating Grade</span>
                    <p className="text-xs font-bold">{ecoInfo.desc}</p>
                  </div>
                  <span className="text-2xl font-black">{ecoInfo.grade}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  to="/calculator"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-gray-950 font-black text-xs border border-emerald-400 hover:bg-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Configure Detailed Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Platform Journey (How it Works) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
            <Sprout className="h-3.5 w-3.5 animate-pulse" />
            <span>Workflow Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
            How EcoXP AI Guides You
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold max-w-md mx-auto">
            A comprehensive loop designed to convert environmental metrics into actionable, rewarding habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: "01",
              icon: Calculator,
              title: "Measure Impact",
              desc: "Record utility bills, travel miles, and dietary logs in less than 5 minutes.",
              color: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
            },
            {
              step: "02",
              icon: Bot,
              title: "AI Analysis",
              desc: "Get an offline-first breakdown of your footprint along with personalized tips.",
              color: "border-teal-500/30 text-teal-500 bg-teal-500/5"
            },
            {
              step: "03",
              icon: Flame,
              title: "Habit Tracking",
              desc: "Complete eco challenges and check off daily actions to build streaks.",
              color: "border-orange-500/30 text-orange-500 bg-orange-500/5"
            },
            {
              step: "04",
              icon: Award,
              title: "Earn XP & Levels",
              desc: "Unlock milestone achievements, level up, and earn corporate eco badges.",
              color: "border-purple-500/30 text-purple-500 bg-purple-500/5"
            }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="neo-card flex flex-col justify-between p-6 space-y-6 relative group overflow-hidden"
              >
                <div className="absolute right-4 top-2 text-6xl font-black text-gray-150 dark:text-gray-800/40 select-none font-mono group-hover:scale-110 transition-transform">
                  {item.step}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className={`h-11 w-11 rounded-xl border flex items-center justify-center ${item.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-black text-emerald-500 dark:text-teal-400 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Gamification Sandbox / XP Progress Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Interactive sandbox widget */}
          <div className="lg:col-span-7">
            <div className="neo-card h-full flex flex-col justify-between p-6 sm:p-8 space-y-8 bg-white dark:bg-gray-900 border-2">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Interactive Sandbox</span>
                    <h3 className="text-lg font-black text-gray-900 dark:text-gray-50">Gamification Sandbox</h3>
                  </div>

                  {/* Level status */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold w-fit">
                    <Trophy className="h-3.5 w-3.5" />
                    <span>Level {level} Explorer</span>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-extrabold text-gray-500 dark:text-gray-400">
                    <span>XP Tracker</span>
                    <span className="font-mono text-emerald-500 dark:text-teal-400">{xp} / 100 XP</span>
                  </div>
                  <div className="h-3.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-250 dark:border-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(100, xp)}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Checkbox list */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Check habits below to gain simulated XP:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sandboxHabits.map((habit) => {
                      const isChecked = checkedHabits.includes(habit.id);
                      return (
                        <button
                          key={habit.id}
                          onClick={() => handleHabitToggle(habit.id, habit.xp)}
                          className={`p-3 border rounded-xl flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                            isChecked
                              ? "soft-pressed bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30 text-gray-900 dark:text-gray-100"
                              : "soft-raised bg-gray-50/50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-800 text-gray-500 hover:border-gray-300 dark:hover:border-gray-750"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`h-5 w-5 rounded flex items-center justify-center border transition-all ${
                              isChecked
                                ? "bg-emerald-500 border-emerald-400 text-gray-950"
                                : "border-gray-300 dark:border-gray-700"
                            }`}>
                              {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-extrabold leading-snug">{habit.text}</span>
                          </div>
                          <span className={`text-[10px] font-black font-mono flex-shrink-0 px-1.5 py-0.5 rounded ${
                            isChecked ? "bg-emerald-500/20 text-emerald-500" : "bg-gray-150 dark:bg-gray-850 text-gray-400"
                          }`}>
                            +{habit.xp} XP
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Level Up Notification Banner */}
              <AnimatePresence>
                {level >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 rounded-2xl flex items-center justify-between gap-4 border border-amber-400 shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-950 text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black uppercase tracking-wider">Level Up! Achieved Level 2</h4>
                        <p className="text-[10px] font-bold opacity-90">Unlocked the "Eco Adventurer" achievement badge!</p>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-md bg-gray-950 text-white uppercase tracking-wider">Awarded</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Slogan Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 font-extrabold text-xs w-fit">
              <Flame className="h-3.5 w-3.5" />
              <span>Streak Gamification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-50 tracking-tight leading-[1.15]">
              Daily Habit Loop
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
              EcoXP transforms daily sustainability into an engaging game. Complete habit challenges, earn XP milestones, level up your character, and accumulate corporate badges.
            </p>
            <div className="space-y-3 pt-2">
              {[
                { title: "Habit Streaks", desc: "Build consecutive checklists to increase multiplier points." },
                { title: "Badge Cabinet", desc: "Unlock 12+ achievement awards based on verified logs." }
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 dark:text-gray-100">{item.title}</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. local AI Assistant Conversation Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Text Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs w-fit">
              <Bot className="h-3.5 w-3.5" />
              <span>Offline AI Agent</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-50 tracking-tight leading-[1.15]">
              On-Device AI Assistant
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
              Access smart suggestions locally. Get specific answers to your household, commuting, and food-related carbon queries fully offline without compromising your personal privacy.
            </p>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/40 border-2 border-gray-250 dark:border-gray-800 rounded-2xl flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                No external APIs are called for general advisory. The platform keeps your interaction patterns private to your device.
              </p>
            </div>
          </div>

          {/* Interactive Chat Console */}
          <div className="lg:col-span-7">
            <div className="neo-card h-full flex flex-col justify-between p-6 sm:p-8 space-y-6 bg-white dark:bg-gray-900 border-2">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-sm text-gray-900 dark:text-gray-100">EcoXP AI Copilot</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">Active Offline</span>
              </div>

              {/* Chat Feed */}
              <div className="h-60 overflow-y-auto border border-gray-150 dark:border-gray-800 rounded-2xl p-4 bg-gray-55/40 dark:bg-gray-950/20 space-y-4">
                {chatHistory.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 max-w-[85%] ${chat.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      chat.sender === "user" ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    }`}>
                      {chat.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed border whitespace-pre-line ${
                      chat.sender === "user"
                        ? "bg-emerald-500 text-white border-emerald-400 rounded-tr-none"
                        : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
                    }`}>
                      {chat.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[85%] mr-auto">
                    <div className="h-7 w-7 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center flex-shrink-0 animate-pulse">
                      ...
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-none border bg-emerald-500/5 border-emerald-500/15 text-gray-800 dark:text-gray-200 min-w-36 flex items-center gap-1 justify-center py-3">
                      <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Suggestion prompts */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Select a query to test AI:</span>
                <div className="flex flex-wrap gap-2">
                  {aiQuestions.map((qObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAiQuestion(qObj.q, qObj.a)}
                      disabled={isTyping}
                      className="text-left px-3 py-1.5 rounded-lg border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 hover:border-emerald-500 dark:hover:border-teal-500 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-teal-400 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {qObj.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Carbon Savings Comparison Board (Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-extrabold text-xs">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>Eco Alternatives Comparison</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
            Compare Alternatives
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold max-w-md mx-auto">
            Small swaps accumulate to massive emissions savings. Click categories below to see the carbon difference.
          </p>
        </div>

        {/* Tab Selection buttons */}
        <div className="max-w-md mx-auto flex gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 border-2 border-gray-950 dark:border-gray-700 rounded-2xl mb-8">
          {[
            { key: "transport", label: "Transport" },
            { key: "food", label: "Diet Choices" },
            { key: "energy", label: "Home Energy" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setComparisonTab(tab.key)}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                comparisonTab === tab.key
                  ? "bg-white dark:bg-gray-900 text-gray-950 dark:text-white shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] border border-gray-950 dark:border-gray-700"
                  : "text-gray-500 hover:text-gray-850 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab layout details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gray-50/50 dark:bg-gray-900/10 border border-gray-200 dark:border-gray-850 rounded-3xl p-6 sm:p-8">
          {/* Comparison bars */}
          <div className="md:col-span-7 space-y-6">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">{comp.title}</h3>

            {/* Option A bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-950 dark:text-gray-200">
                <span>{comp.optionA.name}</span>
                <span className="font-mono">{comp.optionA.co2} kg CO₂</span>
              </div>
              <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
                <div className="h-full bg-rose-500 rounded-xl transition-all duration-700" style={{ width: "100%" }} />
              </div>
            </div>

            {/* Option B bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-950 dark:text-gray-200">
                <span>{comp.optionB.name}</span>
                <span className="font-mono text-emerald-500 dark:text-teal-400">{comp.optionB.co2} kg CO₂</span>
              </div>
              <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
                <div
                  className="h-full bg-emerald-500 rounded-xl transition-all duration-700"
                  style={{ width: `${(comp.optionB.co2 / comp.optionA.co2) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Impact Fact Column */}
          <div className="md:col-span-5 p-6 bg-white dark:bg-gray-950 border-2 border-gray-950 dark:border-gray-800 rounded-2xl flex flex-col justify-between h-full space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Carbon Savings</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-emerald-500">-{comp.saved} kg</span>
                <span className="text-xs text-gray-500 font-extrabold">saved CO₂</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed font-semibold">
              {comp.fact}
            </p>

            <Link
              to="/calculator"
              className="mt-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1.5"
            >
              Analyze Your Habits
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Premium FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold text-xs">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold">
            Clear responses regarding your personal data privacy, calculation models, and AI offline capabilities.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="neo-card p-0 overflow-hidden border-2 rounded-2xl transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-black text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-800/80 text-xs font-semibold leading-relaxed text-gray-550 dark:text-gray-400 bg-gray-50/20 dark:bg-gray-900/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Impact Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden border-2 border-gray-950 dark:border-gray-850 shadow-[4px_4px_0px_0px_#10b981] dark:shadow-[4px_4px_0px_0px_#14b8a6]">
          <div className="absolute right-[-100px] top-[-50px] opacity-10 pointer-events-none">
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

      {/* 9. Polished Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-gray-950 border-2 border-gray-950 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />

          <div className="space-y-3 relative z-10 text-center md:text-left max-w-xl">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Calculations & Gamification</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Ready to take control of your footprint?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-semibold leading-relaxed">
              Find out your exact impact across utility bills, car travel, short/long flights, and dietary habits. Save your logs securely on-device.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
            <Link
              to="/calculator"
              className="px-8 py-4 w-full sm:w-auto text-center rounded-2xl bg-emerald-500 text-gray-950 font-black text-sm border-2 border-emerald-400 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
            >
              Start Carbon Calculator
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/tracker"
              className="px-8 py-4 w-full sm:w-auto text-center rounded-2xl bg-gray-900 text-white font-extrabold text-sm border-2 border-gray-800 hover:bg-gray-850 hover:text-white transition-all cursor-pointer"
            >
              View Daily Habits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
