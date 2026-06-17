import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { calculateFootprint } from "../services/calculatorEngine";
import { getRecommendations } from "../services/recommendationEngine";
import { getInsights } from "../services/insightsEngine";
import { badges as badgesConfig } from "../data/badges";
import { generateId } from "../utils/helpers";
import { UNIT_TYPES } from "../utils/constants";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global States
  const [userInputs, setUserInputs] = useLocalStorage("ecoxp-inputs", null);
  const [latestCalculation, setLatestCalculation] = useLocalStorage("ecoxp-latest", null);
  const [history, setHistory] = useLocalStorage("ecoxp-history", []);
  
  // Format: { "2026-06-17": ["no_car_day", "led_bulbs"] }
  const [completedHabits, setCompletedHabits] = useLocalStorage("ecoxp-completed-habits", {});
  const [streak, setStreak] = useLocalStorage("ecoxp-streak", 0);
  const [lastActiveDate, setLastActiveDate] = useLocalStorage("ecoxp-last-active", "");
  
  const [completedChallenges, setCompletedChallenges] = useLocalStorage("ecoxp-completed-challenges", []);
  const [earnedBadges, setEarnedBadges] = useLocalStorage("ecoxp-earned-badges", []);
  const [unitPreference, setUnitPreference] = useLocalStorage("ecoxp-unit-pref", UNIT_TYPES.METRIC);
  const [userXP, setUserXP] = useLocalStorage("ecoxp-xp", 0);
  const [theme, setTheme] = useLocalStorage("ecoxp-theme", "dark");

  // Notifications
  const [toasts, setToasts] = useState([]);

  // Apply class-based dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const addToast = (message, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Calculate Streak based on completed habits log
  useEffect(() => {
    updateStreak();
  }, [completedHabits]);

  const updateStreak = () => {
    const dates = Object.keys(completedHabits).filter(
      dateStr => completedHabits[dateStr] && completedHabits[dateStr].length > 0
    );

    if (dates.length === 0) {
      setStreak(0);
      return;
    }

    // Sort dates in descending order (latest first)
    const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a));
    
    const todayStr = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // If there is no activity today or yesterday, streak is broken
    const hasActivityToday = completedHabits[todayStr] && completedHabits[todayStr].length > 0;
    const hasActivityYesterday = completedHabits[yesterdayStr] && completedHabits[yesterdayStr].length > 0;

    if (!hasActivityToday && !hasActivityYesterday) {
      setStreak(0);
      return;
    }

    // Count consecutive days starting from the latest active day
    let currentStreak = 0;
    let checkDate = hasActivityToday ? new Date() : yesterday;

    while (true) {
      const checkStr = checkDate.toISOString().split("T")[0];
      if (completedHabits[checkStr] && completedHabits[checkStr].length > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  // Perform a carbon footprint calculation
  const saveCalculation = (inputs, reportName = null) => {
    try {
      const calculation = calculateFootprint(inputs);
      const recommendations = getRecommendations(inputs, calculation.categories);
      const insights = getInsights(calculation.categories, inputs);

      const reportId = generateId();
      const newReport = {
        id: reportId,
        name: reportName || `Report ${new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}`,
        inputs,
        result: calculation,
        recommendations,
        insights,
        timestamp: Date.now()
      };

      setUserInputs(inputs);
      setLatestCalculation(newReport);
      
      // Add to history
      const updatedHistory = [newReport, ...history];
      setHistory(updatedHistory);

      addToast("Carbon footprint calculated successfully!");

      // Trigger badges check
      checkBadges(updatedHistory, completedHabits, completedChallenges, streak, calculation.total);

      return newReport;
    } catch (error) {
      console.error("Calculation failed:", error);
      addToast("Failed to calculate carbon footprint. Please check inputs.", "error");
      return null;
    }
  };

  // Delete a past report from history
  const deleteReport = (id) => {
    const updatedHistory = history.filter(report => report.id !== id);
    setHistory(updatedHistory);
    
    // If deleted report is the latest, update it to the next available one
    if (latestCalculation && latestCalculation.id === id) {
      setLatestCalculation(updatedHistory.length > 0 ? updatedHistory[0] : null);
    }
    
    addToast("Calculation report deleted", "info");
    checkBadges(updatedHistory, completedHabits, completedChallenges, streak, latestCalculation?.result?.total);
  };

  // Rename a saved report
  const renameReport = (id, newName) => {
    const updatedHistory = history.map(report => {
      if (report.id === id) {
        return { ...report, name: newName };
      }
      return report;
    });
    setHistory(updatedHistory);

    if (latestCalculation && latestCalculation.id === id) {
      setLatestCalculation({ ...latestCalculation, name: newName });
    }

    addToast("Report renamed successfully!");
  };

  // Toggle daily habit completion
  const toggleHabit = (habitId, dateStr = new Date().toISOString().split("T")[0]) => {
    setCompletedHabits(prev => {
      const dayHabits = prev[dateStr] ? [...prev[dateStr]] : [];
      let updated;
      
      if (dayHabits.includes(habitId)) {
        updated = dayHabits.filter(id => id !== habitId);
        addToast("Habit removed", "info");
      } else {
        updated = [...dayHabits, habitId];
        setUserXP(xp => xp + 10); // Reward XP
        addToast("Habit completed! +10 XP");
      }

      const newHabits = { ...prev, [dateStr]: updated };

      // Async trigger check for badges
      setTimeout(() => {
        checkBadges(history, newHabits, completedChallenges, streak, latestCalculation?.result?.total);
      }, 100);

      return newHabits;
    });
  };

  // Complete an eco-challenge
  const completeChallenge = (challengeId, challengeXP = 50) => {
    if (completedChallenges.includes(challengeId)) return;

    const updated = [...completedChallenges, challengeId];
    setCompletedChallenges(updated);
    setUserXP(xp => xp + challengeXP);
    addToast(`Challenge Completed! +${challengeXP} XP`);

    // Check badges
    checkBadges(history, completedHabits, updated, streak, latestCalculation?.result?.total);
  };

  // Check and unlock new badges
  const checkBadges = (
    currentHistory = history,
    currentHabits = completedHabits,
    currentChallenges = completedChallenges,
    currentStreak = streak,
    latestScore = latestCalculation?.result?.total
  ) => {
    const newEarned = [...earnedBadges];
    let unlockedAny = false;

    // Count total completed habits across all days
    const totalHabitsChecked = Object.values(currentHabits).reduce(
      (sum, habitsList) => sum + (habitsList ? habitsList.length : 0),
      0
    );

    badgesConfig.forEach(badge => {
      if (newEarned.includes(badge.id)) return; // Already earned

      let qualifies = false;

      switch (badge.id) {
        case "first_calculation":
          qualifies = currentHistory.length >= 1;
          break;
        case "green_habits_beginner":
          qualifies = totalHabitsChecked >= 5;
          break;
        case "green_habits_master":
          qualifies = totalHabitsChecked >= 25;
          break;
        case "streak_3day":
          qualifies = currentStreak >= 3;
          break;
        case "streak_7day":
          qualifies = currentStreak >= 7;
          break;
        case "challenge_complete_1":
          qualifies = currentChallenges.length >= 1;
          break;
        case "low_carbon_score":
          qualifies = latestScore !== undefined && latestScore < 4.0;
          break;
        case "history_comparer":
          qualifies = currentHistory.length >= 3;
          break;
        default:
          break;
      }

      if (qualifies) {
        newEarned.push(badge.id);
        unlockedAny = true;
        // Schedule toast for badge
        setTimeout(() => {
          addToast(`🏆 Unlocked Badge: ${badge.name}!`, "success");
        }, 800);
      }
    });

    if (unlockedAny) {
      setEarnedBadges(newEarned);
    }
  };

  // Reset all local storage data
  const resetAllData = () => {
    setUserInputs(null);
    setLatestCalculation(null);
    setHistory([]);
    setCompletedHabits({});
    setStreak(0);
    setLastActiveDate("");
    setCompletedChallenges([]);
    setEarnedBadges([]);
    setUserXP(0);
    setUnitPreference(UNIT_TYPES.METRIC);
    setTheme("dark");
    addToast("All progress and local data have been reset.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        userInputs,
        latestCalculation,
        history,
        completedHabits,
        streak,
        completedChallenges,
        earnedBadges,
        unitPreference,
        setUnitPreference,
        userXP,
        toasts,
        addToast,
        removeToast,
        saveCalculation,
        deleteReport,
        renameReport,
        toggleHabit,
        completeChallenge,
        resetAllData,
        checkBadges,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCarbonCalculator = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useCarbonCalculator must be used within an AppProvider");
  }
  return context;
};
