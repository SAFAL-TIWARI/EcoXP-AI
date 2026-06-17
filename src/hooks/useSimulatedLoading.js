import { useState, useEffect } from "react";

/**
 * Custom hook to simulate loading for components (e.g. simulated skeleton screen load times).
 * Returns true initially and switches to false after `delay` milliseconds.
 * 
 * @param {number} delay - Time in milliseconds to show loading state. Defaults to 500ms.
 */
export function useSimulatedLoading(delay = 500) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
}

export default useSimulatedLoading;
