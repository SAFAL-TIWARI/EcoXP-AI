import { useCarbonCalculator } from "../context/AppContext";

/**
 * Custom hook to manage Dark and Light mode.
 */
export function useTheme() {
  const { theme, toggleTheme } = useCarbonCalculator();

  return { theme, toggleTheme, isDark: theme === "dark" };
}
export default useTheme;
