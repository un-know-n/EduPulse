import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Params = { [key: string]: string };

const useSyncQueryParams = <T extends Params>(initialParams: T) => {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<T>(initialParams);

  // Sync state with URL query params on mount
  useEffect(
    () => {
      const query: Params[] = [];

      for (const entry of searchParams.entries()) {
        query.push(Object.fromEntries([entry]));
      }

      setQueryParams((prevParams) => ({
        ...prevParams,
        ...query,
      }));
    },
    Object.entries(initialParams).map((entry) => searchParams.get(entry[0])),
  );

  const handleChange = (key: keyof typeof queryParams, value: string) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  return { queryParams, setQueryParams, handleChange } as const;
};

export default useSyncQueryParams;
