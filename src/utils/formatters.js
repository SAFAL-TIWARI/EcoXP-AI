import { UNIT_TYPES } from "./constants";

/**
 * Format carbon footprint value with proper units based on user preferences.
 * @param {number} valueInTonnes - Carbon footprint in metric tonnes
 * @param {string} unitSystem - 'metric' or 'imperial'
 * @param {number} decimals - Number of decimal places
 */
export const formatCarbon = (valueInTonnes, unitSystem = UNIT_TYPES.METRIC, decimals = 1) => {
  if (unitSystem === UNIT_TYPES.IMPERIAL) {
    const valueInLbs = valueInTonnes * 2204.62;
    return `${valueInLbs.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} lbs CO₂e`;
  }
  return `${Number(valueInTonnes).toFixed(decimals)} t CO₂e`;
};

/**
 * Format raw carbon value without the CO2e suffix (just number + unit)
 */
export const formatCarbonValueOnly = (valueInTonnes, unitSystem = UNIT_TYPES.METRIC, decimals = 1) => {
  if (unitSystem === UNIT_TYPES.IMPERIAL) {
    const valueInLbs = valueInTonnes * 2204.62;
    return `${Math.round(valueInLbs).toLocaleString()} lbs`;
  }
  return `${Number(valueInTonnes).toFixed(decimals)} t`;
};

/**
 * Format distance based on system units
 * @param {number} km - Distance in kilometers
 * @param {string} unitSystem - 'metric' or 'imperial'
 */
export const formatDistance = (km, unitSystem = UNIT_TYPES.METRIC) => {
  if (unitSystem === UNIT_TYPES.IMPERIAL) {
    const miles = km * 0.621371;
    return `${Math.round(miles)} mi`;
  }
  return `${Math.round(km)} km`;
};

/**
 * Format electricity usage based on system units
 */
export const formatElectricity = (kwh) => {
  return `${Math.round(kwh)} kWh`;
};
