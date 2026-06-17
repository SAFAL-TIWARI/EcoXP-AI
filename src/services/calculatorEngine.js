import { emissionFactors } from "../data/emissionFactors";

/**
 * Calculates carbon footprint based on questionnaire inputs.
 * Returns carbon emissions in metric tonnes CO2e per year (t CO2e/year).
 * 
 * @param {Object} inputs - User inputs from the onboarding form
 */
export const calculateFootprint = (inputs) => {
  const {
    householdSize = 1,
    electricityUsage = 0,
    electricitySource = "average",
    cookingFuel = "electric",
    cookingUsage = 0,
    carCommute = 0,
    vehicleType = "none",
    publicTransit = 0,
    flightsShort = 0,
    flightsMedium = 0,
    flightsLong = 0,
    dietPattern = "averageMeat",
    foodWaste = "average",
    wasteHabits = "medium",
    shoppingHabits = "moderate",
    waterUsage = "medium"
  } = inputs;

  const peopleCount = Math.max(Number(householdSize), 1);

  // 1. HOME ENERGY (divided by household size)
  const elecFactor = emissionFactors.electricity[electricitySource] || emissionFactors.electricity.average;
  const yearlyElectricityEmissions = (Number(electricityUsage) * 12 * elecFactor) / peopleCount; // in kg CO2e

  const fuelFactor = emissionFactors.cookingFuel[cookingFuel] || 0;
  const yearlyCookingEmissions = (Number(cookingUsage) * 12 * fuelFactor) / peopleCount; // in kg CO2e

  const totalEnergyTonnes = (yearlyElectricityEmissions + yearlyCookingEmissions) / 1000;

  // 2. TRANSPORTATION
  const vehFactor = vehicleType !== "none" ? (emissionFactors.vehicle[vehicleType] || 0) : 0;
  // Assuming 300 active commuting days per year
  const yearlyCarEmissions = Number(carCommute) * 300 * vehFactor; // in kg CO2e

  // Public transport average factor: average of bus, train, metro
  const transitFactor = (emissionFactors.publicTransport.bus + emissionFactors.publicTransport.train + emissionFactors.publicTransport.metro) / 3;
  const yearlyTransitEmissions = Number(publicTransit) * 300 * transitFactor; // in kg CO2e

  // Flights
  const shortFlightEmissions = Number(flightsShort) * emissionFactors.flights.shortHaul;
  const medFlightEmissions = Number(flightsMedium) * emissionFactors.flights.mediumHaul;
  const longFlightEmissions = Number(flightsLong) * emissionFactors.flights.longHaul;
  const totalFlightEmissions = shortFlightEmissions + medFlightEmissions + longFlightEmissions; // in kg CO2e

  const totalTransportTonnes = (yearlyCarEmissions + yearlyTransitEmissions + totalFlightEmissions) / 1000;

  // 3. DIET & FOOD
  const dietBaseline = emissionFactors.diet[dietPattern] || emissionFactors.diet.averageMeat; // in tonnes
  const wasteAdjustment = emissionFactors.foodWaste[foodWaste] || 0.0; // in tonnes
  const totalFoodTonnes = dietBaseline + wasteAdjustment;

  // 4. WASTE & RECYCLING
  const totalWasteTonnes = emissionFactors.waste[wasteHabits] || emissionFactors.waste.medium; // in tonnes

  // 5. SHOPPING & CONSUMPTION
  const totalShoppingTonnes = emissionFactors.shopping[shoppingHabits] || emissionFactors.shopping.moderate; // in tonnes

  // 6. WATER USAGE
  const totalWaterTonnes = emissionFactors.water[waterUsage] || emissionFactors.water.medium; // in tonnes

  // Let's bundle water into Home Energy (or keep it separate? We'll bundle it into Home Energy to keep categories clean)
  const finalEnergyTonnes = totalEnergyTonnes + totalWaterTonnes;

  // Compile totals
  const categories = {
    energy: Number(finalEnergyTonnes.toFixed(3)),
    transport: Number(totalTransportTonnes.toFixed(3)),
    food: Number(totalFoodTonnes.toFixed(3)),
    waste: Number(totalWasteTonnes.toFixed(3)),
    shopping: Number(totalShoppingTonnes.toFixed(3))
  };

  const totalEmissions = Number(
    (categories.energy + categories.transport + categories.food + categories.waste + categories.shopping).toFixed(3)
  );

  // Find biggest contributor
  let biggestCategory = "energy";
  let maxEmissions = categories.energy;

  Object.entries(categories).forEach(([category, emissions]) => {
    if (emissions > maxEmissions) {
      maxEmissions = emissions;
      biggestCategory = category;
    }
  });

  // Calculate confidence level
  // Starts at 95%, deducts if inputs are empty or extreme default fallbacks
  let confidenceScore = 95;
  if (electricityUsage === 0) confidenceScore -= 10;
  if (carCommute === 0 && vehicleType !== "none") confidenceScore -= 5;

  return {
    total: totalEmissions,
    categories,
    biggestCategory,
    confidence: Math.max(confidenceScore, 60), // clamp to min 60%
    timestamp: Date.now()
  };
};
