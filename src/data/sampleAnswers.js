export const sampleAnswers = {
  average: {
    householdSize: 3,
    electricityUsage: 350, // kWh/month
    electricitySource: "average",
    cookingFuel: "lpg",
    cookingUsage: 12, // kg/month
    carCommute: 25, // km/day
    vehicleType: "petrol",
    publicTransit: 10, // km/day
    flightsShort: 2, // flights/year
    flightsMedium: 1,
    flightsLong: 0,
    dietPattern: "averageMeat",
    foodWaste: "average",
    wasteHabits: "medium",
    shoppingHabits: "moderate",
    waterUsage: "medium",
  },
  ecoChampion: {
    householdSize: 2,
    electricityUsage: 150, // kWh/month
    electricitySource: "clean",
    cookingFuel: "electric",
    cookingUsage: 0,
    carCommute: 0,
    vehicleType: "none",
    publicTransit: 25, // km/day
    flightsShort: 0,
    flightsMedium: 0,
    flightsLong: 0,
    dietPattern: "vegan",
    foodWaste: "rarely",
    wasteHabits: "low",
    shoppingHabits: "minimalist",
    waterUsage: "low",
  },
  highImpact: {
    householdSize: 1,
    electricityUsage: 800, // kWh/month
    electricitySource: "dirty",
    cookingFuel: "naturalGas",
    cookingUsage: 35, // m3/month
    carCommute: 80, // km/day
    vehicleType: "petrol",
    publicTransit: 0,
    flightsShort: 6,
    flightsMedium: 4,
    flightsLong: 3,
    dietPattern: "heavyMeat",
    foodWaste: "frequently",
    wasteHabits: "high",
    shoppingHabits: "heavy",
    waterUsage: "high",
  }
};
export default sampleAnswers;
