import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Params = { [key: string]: string };

const useSyncQueryParams = <T extends Params>(initialParams: T) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<T>(initialParams);

  // Sync state with URL query params on mount
  useEffect(() => {
    const query = searchParams.entries() as unknown as T;

    console.log(
      'WE ARE HERE: ',
      query,
      new URLSearchParams(query),
      new URLSearchParams(searchParams.toString()),
      searchParams.toString(),
      searchParams.entries(),
    );

    setQueryParams((prevParams) => ({
      ...prevParams,
      ...query,
    }));
  }, [searchParams]);

  // Update URL query params when state changes
  useEffect(() => {
    const currentQuery = searchParams.entries();
    const newQuery = { ...currentQuery, ...queryParams };

    if (JSON.stringify(newQuery) !== JSON.stringify(currentQuery)) {
      const params = new URLSearchParams(searchParams);

      //Synchronize URL
      Object.entries(newQuery).map((searchParamEntry) =>
        params.set(searchParamEntry[0], `${searchParamEntry[1] ?? ''}`),
      );
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [queryParams]);

  const handleChange = (key: keyof typeof queryParams, value: string) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  return { queryParams, setQueryParams, handleChange } as const;
};

export default useSyncQueryParams;
