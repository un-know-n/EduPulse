import { useRouter } from 'next/navigation';
import { useNotify } from './useNotify';
import { useEffect } from 'react';
import { Routes } from '../../config/routing/routes';
import { TUser } from '../../../../server/src/app/models/user/user.decorator';
import { useTypedSelector } from './redux';

export const useUserRoleCheck = (
  givenRole: TUser['role'],
  message = 'Ви не маєте права виконувати цю дію!',
  includeRerouting = true,
) => {
  const notify = useNotify();
  const router = useRouter();
  const role = useTypedSelector((state) => state.user.role);

  useEffect(() => {
    if (role !== givenRole) {
      notify(message, 'error');
      if (includeRerouting) router.push(Routes.Dashboard);
    }
  }, [givenRole, message, includeRerouting]);
};
