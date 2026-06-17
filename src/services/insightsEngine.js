import { EMISSION_CATEGORIES } from "../utils/constants";
import { tips } from "../data/tips";

/**
 * Generates plain-English insights from calculations and questionnaire responses.
 * 
 * @param {Object} categories - Calculated carbon values by category
 * @param {Object} inputs - User questionnaire answers
 */
export const getInsights = (categories, inputs) => {
  const insights = [];

  // Find biggest category
  let maxVal = 0;
  let biggestCat = null;
  Object.entries(categories).forEach(([cat, val]) => {
    if (val > maxVal) {
      maxVal = val;
      biggestCat = cat;
    }
  });

  const catName = EMISSION_CATEGORIES[biggestCat]?.name || biggestCat;

  // Add primary insight about the biggest category
  if (biggestCat === "transport") {
    const isFlightHeavy = (Number(inputs.flightsShort) + Number(inputs.flightsMedium) + Number(inputs.flightsLong)) > 3;
    const isCommuteHeavy = Number(inputs.carCommute) > 20 && (inputs.vehicleType === "petrol" || inputs.vehicleType === "diesel");

    if (isFlightHeavy && isCommuteHeavy) {
      insights.push({
        id: "transport_heavy_both",
        title: "Transportation is your dominant impact area",
        description: `Both your daily commute and frequent flights contribute heavily to your footprint. Reducing solo driving and substituting short flights with train travel will yield significant savings.`,
        type: "warning",
        category: "transport"
      });
    } else if (isFlightHeavy) {
      insights.push({
        id: "flights_heavy",
        title: "Frequent flying is elevating your footprint",
        description: `Flights produce intense bursts of carbon emissions. Even cutting just one flight or choosing virtual meetings can reduce your annual emissions by a metric tonne or more.`,
        type: "warning",
        category: "transport"
      });
    } else {
      insights.push({
        id: "commute_heavy",
        title: "Daily car commute is a major source",
        description: `Your daily commute in a ${inputs.vehicleType} vehicle accumulates high emissions over the year. Try carpooling or active transit (biking/walking) on selected days.`,
        type: "warning",
        category: "transport"
      });
    }
  } else if (biggestCat === "energy") {
    const isElecHeavy = Number(inputs.electricityUsage) > 350;
    const isFuelWoodOrCoal = inputs.cookingFuel === "wood";

    if (isElecHeavy) {
      insights.push({
        id: "electricity_heavy",
        title: "High household electricity consumption",
        description: `Your monthly grid electricity usage (${inputs.electricityUsage} kWh) accounts for a large portion of your footprint. Tweaking heating/cooling and replacing old bulbs are fast remedies.`,
        type: "warning",
        category: "energy"
      });
    } else if (isFuelWoodOrCoal) {
      insights.push({
        id: "biomass_cooking",
        title: "Biomass cooking fuels have high impact",
        description: `Using wood/biomass for cooking produces high combustion emissions. Upgrading to LPG or clean induction cooking improves indoor air quality and lowers carbon.`,
        type: "warning",
        category: "energy"
      });
    } else {
      insights.push({
        id: "energy_general",
        title: "Home energy is your top emission source",
        description: `Powering and heating/cooling your home contributes the most to your footprint. Improving insulation and switching off standby power are great starting points.`,
        type: "warning",
        category: "energy"
      });
    }
  } else if (biggestCat === "food") {
    if (inputs.dietPattern === "heavyMeat" || inputs.dietPattern === "averageMeat") {
      insights.push({
        id: "meat_heavy_diet",
        title: "High dietary carbon footprint",
        description: `A diet rich in red meat carries a high carbon footprint due to land-use and methane. Transitioning to 'Meatless Mondays' or substituting red meat with poultry or fish has an immediate impact.`,
        type: "warning",
        category: "food"
      });
    }
    if (inputs.foodWaste === "frequently") {
      insights.push({
        id: "food_waste_heavy",
        title: "Food waste creates high landfill methane",
        description: `Regularly discarding food releases methane in landfills. Planning meals in advance or composting leftovers can eliminate this source.`,
        type: "warning",
        category: "food"
      });
    }
  } else if (biggestCat === "shopping" && inputs.shoppingHabits === "heavy") {
    insights.push({
      id: "heavy_consumption",
      title: "Manufacturing emissions from shopping",
      description: `Frequent purchases of new apparel and electronics contain high 'embodied carbon' from industrial production. Emphasizing second-hand items and repairing current possessions helps cut this down.`,
      type: "warning",
      category: "shopping"
    });
  }

  // Find Low-hanging Fruit: Easy difficulty tip in the biggest category or general
  const easyTips = tips.filter(t => t.difficulty === "easy");
  const biggestCatEasyTip = easyTips.find(t => t.category === biggestCat);
  const selectedLowHangingTip = biggestCatEasyTip || easyTips[0];

  if (selectedLowHangingTip) {
    insights.push({
      id: "low_hanging_fruit",
      title: `Low-Hanging Fruit: ${selectedLowHangingTip.title}`,
      description: `You can easily save about ${selectedLowHangingTip.co2Savings} kg CO2e per year by implementing this tip. It's classified as "${selectedLowHangingTip.difficulty}" to complete and costs "${selectedLowHangingTip.cost}".`,
      type: "success",
      category: selectedLowHangingTip.category,
      actionId: selectedLowHangingTip.id
    });
  }

  // General positive insight
  if (inputs.electricitySource === "clean") {
    insights.push({
      id: "green_power_celebration",
      title: "Renewable energy champion!",
      description: "By sourcing clean/renewable electricity, you are significantly preventing carbon emissions compared to traditional fossil-fuel grid users.",
      type: "success",
      category: "energy"
    });
  }

  if (inputs.vehicleType === "none" && inputs.carCommute === 0) {
    insights.push({
      id: "carfree_celebration",
      title: "Car-Free lifestyle",
      description: "Not driving a personal vehicle avoids the single largest carbon source for typical individuals. Keep walking, cycling, or transit usage going!",
      type: "success",
      category: "transport"
    });
  }

  // Add a generic one if we have too few insights
  if (insights.length < 2) {
    insights.push({
      id: "unplug_vampire_insight",
      title: "Eliminate standby energy",
      description: "Devices left plugged in consume tiny amounts of 'vampire' energy. Unplugging them or using smart strips is free, simple, and saves carbon.",
      type: "info",
      category: "energy"
    });
  }

  return insights;
};
