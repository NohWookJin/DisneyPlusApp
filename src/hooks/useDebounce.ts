import { useEffect, useState } from "react";

export const useDebounce = (
  value: string | null,
  delay: number,
): string | null => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
