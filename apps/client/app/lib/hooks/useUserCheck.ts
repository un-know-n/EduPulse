import { useRouter } from 'next/navigation';
import { useNotify } from './useNotify';
import { useEffect } from 'react';
import { Routes } from '../../config/routing/routes';
import { useTypedSelector } from './redux';
import { TUserRoles } from '../../components/course/@types/course';

export const useUserRoleCheck = (
  givenRole: TUserRoles,
  message = 'Ви не маєте права виконувати цю дію',
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
