import { tips } from "../data/tips";

/**
 * Generates a personalized list of carbon reduction recommendations.
 * 
 * @param {Object} inputs - Questionnaire answers
 * @param {Object} categories - Calculated carbon values by category
 */
export const getRecommendations = (inputs, categories) => {
  const {
    electricityUsage = 0,
    carCommute = 0,
    vehicleType = "none",
    dietPattern = "averageMeat",
    foodWaste = "average",
    wasteHabits = "medium",
    shoppingHabits = "moderate"
  } = inputs;

  // Track recommended tips
  const recommendedTips = [];

  // Helper to add tip if not already added
  const addTipById = (id, priorityScore = 0) => {
    const tip = tips.find(t => t.id === id);
    if (tip && !recommendedTips.some(t => t.id === id)) {
      recommendedTips.push({
        ...tip,
        priorityScore // Higher means more relevant
      });
    }
  };

  // 1. Analyze Home Energy
  if (electricityUsage > 300) {
    addTipById("thermostat_tweak", 3);
    addTipById("led_bulbs", 2);
    addTipById("unplug_vampire", 1);
    addTipById("efficient_appliances", 2);
    addTipById("solar_panels", 1);
  } else if (electricityUsage > 100) {
    addTipById("led_bulbs", 1);
    addTipById("unplug_vampire", 1);
  }

  // 2. Analyze Transport
  if (carCommute > 20) {
    if (vehicleType === "petrol" || vehicleType === "diesel") {
      addTipById("ev_switch", 3);
      addTipById("public_transit", 3);
      addTipById("carpool_commute", 2);
      addTipById("eco_driving", 1);
    } else if (vehicleType === "hybrid") {
      addTipById("public_transit", 2);
      addTipById("carpool_commute", 1);
    }
  }
  if (carCommute > 0 && carCommute <= 10) {
    addTipById("active_commute", 2);
  }

  // 3. Analyze Food
  if (dietPattern === "heavyMeat") {
    addTipById("meatless_mondays", 3);
    addTipById("vegan_transition", 2);
  } else if (dietPattern === "averageMeat" || dietPattern === "pescatarian") {
    addTipById("meatless_mondays", 2);
  }
  if (foodWaste === "frequently") {
    addTipById("reduce_food_waste", 3);
  } else if (foodWaste === "average") {
    addTipById("reduce_food_waste", 1);
  }

  // 4. Analyze Waste
  if (wasteHabits === "high" || wasteHabits === "medium") {
    addTipById("compost_organics", 2);
    addTipById("recycle_smart", 2);
    addTipById("ditch_single_use", 1);
  }

  // 5. Analyze Shopping
  if (shoppingHabits === "heavy") {
    addTipById("buy_secondhand", 3);
    addTipById("repair_possessions", 2);
  } else if (shoppingHabits === "moderate") {
    addTipById("buy_secondhand", 1);
  }

  // If we don't have enough recommendations, fill in with general easy ones
  if (recommendedTips.length < 5) {
    const generalTips = ["led_bulbs", "unplug_vampire", "meatless_mondays", "ditch_single_use"];
    generalTips.forEach(id => addTipById(id, 0));
  }

  // Sort by priorityScore (descending) and then co2Savings (descending)
  return recommendedTips.sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    return b.co2Savings - a.co2Savings;
  });
};
