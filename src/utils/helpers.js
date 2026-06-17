/**
 * Generate a unique ID (useful for new calculation reports, etc.)
 */
export const generateId = () => {
  return 'report_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Returns a percentage value safely clamped between 0 and 100
 */
export const getPercentage = (value, total) => {
  if (!total) return 0;
  return Math.min(Math.max(Math.round((value / total) * 100), 0), 100);
};

/**
 * Format timestamp into readable date
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
