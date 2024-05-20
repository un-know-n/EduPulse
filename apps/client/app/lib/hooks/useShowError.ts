import { useNotify } from './useNotify';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Routes } from '../../config/routing/routes';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const useShowError = (
  error: FetchBaseQueryError | SerializedError | undefined,
  includeRerouting = true,
  routePath?: string,
) => {
  const notify = useNotify();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      if (includeRerouting) router.push(routePath ?? Routes.Dashboard);
      notify(
        (error as any)?.data?.message ?? 'Сталася невідома помилка',
        'error',
      );
    }
  }, [error, includeRerouting, routePath]);

  return { router, notify };
};
