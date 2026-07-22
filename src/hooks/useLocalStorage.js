import { useState, useCallback } from "react";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const set = useCallback(
    (newValue) => {
      try {
        const toStore =
          typeof newValue === "function" ? newValue(value) : newValue;
        localStorage.setItem(key, JSON.stringify(toStore));
        setValue(toStore);
      } catch {
        setValue(typeof newValue === "function" ? newValue(value) : newValue);
      }
    },
    [key, value]
  );

  return [value, set];
}
