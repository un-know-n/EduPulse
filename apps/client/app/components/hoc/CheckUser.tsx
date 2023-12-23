'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { translateRole, TRoles } from '../auth/config/constants';
import { useSession } from 'next-auth/react';
import { Routes } from '../../config/routing/routes';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ChooseRole } from '../dashboard/shared/modals/ChooseRole';
import Loading from '../../loading';
import { apiInstance } from '../../lib/services/api.instance';
import { useNotify } from '../../lib/hooks/useNotify';
import { useTypedDispatch, useTypedSelector } from '../../lib/hooks/redux';
import jwt from 'jsonwebtoken';
import { setUser } from '../../store/reducers/user.slice';

export const CheckUser: FC<PropsWithChildren> = ({ children }) => {
  const { data: session, status, update } = useSession();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user);
  const router = useRouter();
  const notify = useNotify();
  const {
    isOpen: isRoleModalOpen,
    onOpen: onRoleModalOpen,
    onClose: onRoleModalClose,
  } = useDisclosure();

  useEffect(() => {
    console.log(session, status);
    if (status === 'unauthenticated') router.push(Routes.SignIn);
    else if (status === 'authenticated' && !session?.user.role)
      onRoleModalOpen();
    else if (status === 'authenticated') {
      const token =
        session?.backendTokens?.accessToken ??
        jwt.sign(session.user, process.env.NEXT_PUBLIC_TOKEN_SECRET ?? '', {
          expiresIn: '1d',
        });

      const { id, role, name, image, email, emailVerified } = session.user;
      if (!user.role)
        dispatch(
          setUser({ id, role, name, image, email, emailVerified, token }),
        );
    }
  }, [session, status, session?.user.role]);

  const handleRoleChange = async (role: string) => {
    try {
      await apiInstance.patch(`/user/${session?.user.id}`, { role });
      notify(
        `Ваш статус було змінено на "${translateRole(role as TRoles)}"!`,
        'success',
      );

      await update({
        ...session,
        user: {
          ...session?.user,
          role,
        },
      });
    } catch (e: any) {
      notify(
        e.response.data.message ||
          "Неочікувана помилка! Спробуйте ще раз або зв'яжіться з службою підтримки!",
        'error',
      );
    }

    onRoleModalClose();
  };

  if (status === 'loading') return <Loading />;

  return (
    <>
      {isRoleModalOpen ? <ChooseRole chooseRole={handleRoleChange} /> : null}
      {status === 'unauthenticated' ? (
        children
      ) : user.role ? (
        children
      ) : (
        <Loading />
      )}
    </>
  );
};
