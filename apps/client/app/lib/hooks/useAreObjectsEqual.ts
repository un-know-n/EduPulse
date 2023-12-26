import { useCallback } from 'react';

const areObjectsEqual = <T extends Record<string, any>>(
  objA: T,
  objB: T,
): boolean => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

export const useAreObjectsEqual = <T extends Record<string, any>>(
  initialValue: T,
): ((value: T) => boolean) => {
  return useCallback(
    (value: T) => {
      return areObjectsEqual(initialValue, value);
    },
    [initialValue],
  );
};
