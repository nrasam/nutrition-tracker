import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // read from localStorage here, parse it, fall back to initialValue
    const stored = localStorage.getItem(key);

    if (stored === null) {
      return initialValue;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    // write value to localStorage here, whenever value changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
}
