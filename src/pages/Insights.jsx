import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Calculator, ArrowRight, MessageSquare, Send, Bot, ShieldCheck } from "lucide-react";
import { useCarbonCalculator } from "../context/AppContext";
import EmptyState from "../components/EmptyState";
import InsightCards from "../components/InsightCards";
import { getAIResponse } from "../services/aiAssistant";
import { formatCarbon } from "../utils/formatters";

export default function Insights() {
  const { latestCalculation, unitPreference } = useCarbonCalculator();
  
  // Chat States
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am your EcoXp AI assistant. Ask me anything about energy conservation, travel tips, diet modifications, or eco-habits!"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [suggestedAnswers, setSuggestedAnswers] = useState([]);

  if (!latestCalculation) {
    return (
      <div className="py-16">
        <EmptyState
          title="No Insights Available"
          description="We need your carbon footprint data before generating personalized insights. Run a calculation first!"
          icon={Brain}
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

  const { result, insights } = latestCalculation;

  // Handle AI Chat submissions
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { id: Date.now() + "_user", sender: "user", text: userMsg }]);
    setChatInput("");

    // Simulate thinking state
    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + "_bot",
          sender: "bot",
          text: response.answer,
          tips: response.suggestedTips
        }
      ]);
    }, 450);
  };

  const handleSuggestionClick = (query) => {
    setChatInput(query);
    // Auto-trigger send simulation
    setTimeout(() => {
      const button = document.getElementById("submit-chat-btn");
      if (button) button.click();
    }, 100);
  };

  const presetQuestions = [
    "What should I reduce first?",
    "How do I save energy at home?",
    "What habit gives the biggest impact?",
    "How do I reduce emissions on a budget?"
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-gray-100 dark:border-gray-900 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Personal Analysis
        </span>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">
          Personalized Carbon Insights
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          A granular review of your habits, warning flags, and high-impact reduction opportunities.
        </p>
      </div>

      {/* 1. Dynamic Habit Warnings & Success Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-150 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" /> Behavioral Audit
        </h3>
        <InsightCards insights={insights} />
      </div>

      {/* 2. Interactive AI Assistant chat section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Helper info / Pre-fill queries */}
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-fit lg:h-96">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-150 flex items-center gap-1.5">
              <Bot className="h-4.5 w-4.5 text-emerald-500" /> EcoXp AI Helper
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Stuck on where to start? Ask our offline helper assistant. Click any suggested prompt below to send it instantly.
            </p>
          </div>

          <div className="space-y-2 mt-6">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(q)}
                className="w-full text-left p-3 rounded-2xl bg-gray-50 dark:bg-gray-850 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800/80"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Widget Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-96">
          {/* Messages Feed */}
          <div className="flex-grow overflow-y-auto space-y-4 pr-1 mb-4 scrollbar-thin">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                  msg.sender === "user"
                    ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-650 dark:text-gray-300"
                    : "bg-emerald-500 text-white border-transparent"
                }`}>
                  {msg.sender === "user" ? "U" : <Bot className="h-4.5 w-4.5" />}
                </div>

                {/* Bubble */}
                <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-3 ${
                  msg.sender === "user"
                    ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tr-none"
                    : "bg-emerald-500/5 border-emerald-500/15 text-gray-800 dark:text-gray-200 rounded-tl-none font-medium"
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {/* Recommended tips attachments */}
                  {msg.tips && msg.tips.length > 0 && (
                    <div className="space-y-2 border-t border-emerald-500/15 pt-2 mt-2">
                      <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        Attached Recommendations:
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {msg.tips.map(tip => (
                          <div key={tip.id} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-900 dark:text-gray-100">
                            <span>{tip.title}</span>
                            <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/15">
                              Save: {tip.co2Savings} kg
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form Input */}
          <form onSubmit={handleChatSubmit} className="flex gap-2 border-t border-gray-100 dark:border-gray-850 pt-4">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask how to save electricity, reduce transport impact..."
              className="flex-grow px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              id="submit-chat-btn"
              type="submit"
              className="p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
