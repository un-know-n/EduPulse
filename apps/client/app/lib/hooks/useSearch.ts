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
  isCreated?: boolean;
};

const initialSearchParams: TSearchParams = {
  orderBy: 'asc',
  categoryIds: [],
  difficultyLevels: [],
  limit: 6,
  page: 1,
  title: '',
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

  const handleSearch = (isCreated?: boolean) => {
    console.log(typeof isCreated === 'boolean', isCreated);
    if (!isDisabledSearchButton || typeof isCreated === 'boolean') {
      setPreviousSearchParams(currentSearchParams);
      getCoursesByParams({ ...currentSearchParams, isCreated });
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
