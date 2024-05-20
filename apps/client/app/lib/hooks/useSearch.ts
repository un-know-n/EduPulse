import { useEffect, useState } from 'react';
import { useLazyGetCoursesQuery } from '../../store/services/courses';
import { useShowError } from './useShowError';
import { useAreObjectsEqual } from './useAreObjectsEqual';

export type TSearchParams = {
  orderBy?: 'asc' | 'desc';
  title?: string;
  categoryIds?: number[];
  difficultyLevels?: number[];
  page?: number;
  limit?: number;
};

export const useSearch = (initialValue: TSearchParams) => {
  const [previousSearchParams, setPreviousSearchParams] =
    useState<TSearchParams>(initialValue);
  const [currentSearchParams, setCurrentSearchParams] =
    useState<TSearchParams>(initialValue);

  const [isDisabledSearchButton, setIsDisabledSearchButton] = useState(false);

  const [getCoursesByParams, { data, isLoading, error }] =
    useLazyGetCoursesQuery();
  useShowError(error);

  const checkObjectsEquality = useAreObjectsEqual(
    previousSearchParams as Record<string, any>,
  );

  const handleSearch = () => {
    if (!isDisabledSearchButton) {
      setPreviousSearchParams(currentSearchParams);
      getCoursesByParams({ ...currentSearchParams });
    }
  };

  useEffect(() => {
    getCoursesByParams({ ...currentSearchParams });
  }, []);

  useEffect(() => {
    const noChange = checkObjectsEquality(
      currentSearchParams as Record<string, any>,
    );
    setIsDisabledSearchButton(noChange);
  }, [
    JSON.stringify(currentSearchParams),
    JSON.stringify(previousSearchParams),
  ]);

  return {
    isDisabledSearchButton,
    data,
    error,
    isLoading,
    getCoursesByParams,
    currentSearchParams,
    setCurrentSearchParams,
    handleSearch,
  };
};
