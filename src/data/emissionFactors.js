// Carbon emission factors in kg CO2e per unit per year or per unit directly
// Sources: EPA, DEFRA, IPCC, and global averages

export const emissionFactors = {
  // Grid electricity factors by intensity (default is moderate/global avg)
  // Value is kg CO2e per kWh
  electricity: {
    clean: 0.05,       // High renewables/nuclear
    average: 0.45,     // Standard grid mix
    dirty: 0.85,       // Coal heavy grid
  },

  // Cooking Fuel factors (kg CO2e per unit)
  cookingFuel: {
    lpg: 3.0,          // per kg of LPG
    naturalGas: 2.1,   // per cubic meter
    electric: 0.0,     // Accounted under electricity
    wood: 1.9,         // per kg of wood/biomass
  },

  // Vehicle transport (kg CO2e per km)
  vehicle: {
    petrol: 0.18,
    diesel: 0.17,
    hybrid: 0.10,
    electric: 0.05,    // Indirect grid emissions
    motorcycle: 0.08,
    none: 0.0,
  },

  // Public transport (kg CO2e per passenger-km)
  publicTransport: {
    bus: 0.045,
    train: 0.025,
    metro: 0.020,
  },

  // Flights (kg CO2e per flight segment/trip)
  flights: {
    shortHaul: 150,    // < 1.5 hours / domestic (high takeoff penalty per km)
    mediumHaul: 450,   // 1.5 - 5 hours
    longHaul: 1200,    // > 5 hours / international
  },

  // Diet baseline emissions (tonnes CO2e per person per year)
  diet: {
    vegan: 0.6,
    vegetarian: 1.0,
    pescatarian: 1.4,
    averageMeat: 1.8,
    heavyMeat: 2.6,
  },

  // Food waste multiplier (tonnes CO2e per person per year)
  foodWaste: {
    rarely: -0.05,     // Active composting or zero waste habits
    average: 0.0,
    frequently: 0.20,  // Throwing away edible food regularly
  },

  // Municipal solid waste (tonnes CO2e per person per year)
  waste: {
    low: 0.08,         // Low consumption + high recycling/composting
    medium: 0.22,      // Average waste generation, some recycling
    high: 0.45,        // High waste generation, no recycling
  },

  // Shopping and consumption of goods/clothes/electronics (tonnes CO2e per person per year)
  shopping: {
    minimalist: 0.25,  // Second-hand, repair culture, buy only essentials
    moderate: 0.75,    // Average consumer habits
    heavy: 1.60,       // Buy new clothes weekly, frequent electronic upgrades
  },

  // Water heating & pumping (kg CO2e per cubic meter or shower length multiplier)
  water: {
    low: 0.015,        // Conscious showers, rainwater harvesting
    medium: 0.040,
    high: 0.090,       // Long daily baths, hot water heating
  }
};
