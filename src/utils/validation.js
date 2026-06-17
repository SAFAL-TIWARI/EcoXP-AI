/**
 * Simple validation rules for form inputs
 */
export const validationRules = {
  householdSize: {
    required: "Household size is required",
    min: { value: 1, message: "Household size must be at least 1" },
    max: { value: 20, message: "Household size must be 20 or less" }
  },
  electricityUsage: {
    required: "Electricity usage is required",
    min: { value: 0, message: "Electricity usage cannot be negative" },
    max: { value: 5000, message: "Electricity usage seems unusually high (max 5000)" }
  },
  cookingUsage: {
    required: "Cooking fuel usage is required",
    min: { value: 0, message: "Usage cannot be negative" },
    max: { value: 500, message: "Usage seems unusually high (max 500)" }
  },
  carCommute: {
    required: "Commute distance is required",
    min: { value: 0, message: "Commute distance cannot be negative" },
    max: { value: 500, message: "Commute distance seems unusually high (max 500 km)" }
  },
  publicTransit: {
    required: "Transit distance is required",
    min: { value: 0, message: "Transit distance cannot be negative" },
    max: { value: 500, message: "Transit distance seems unusually high (max 500 km)" }
  },
  flightsShort: {
    required: "Flight count is required",
    min: { value: 0, message: "Flight count cannot be negative" },
    max: { value: 100, message: "Flight count seems unusually high (max 100)" }
  },
  flightsMedium: {
    required: "Flight count is required",
    min: { value: 0, message: "Flight count cannot be negative" },
    max: { value: 500, message: "Flight count seems unusually high (max 100)" }
  },
  flightsLong: {
    required: "Flight count is required",
    min: { value: 0, message: "Flight count cannot be negative" },
    max: { value: 100, message: "Flight count seems unusually high (max 100)" }
  }
};
