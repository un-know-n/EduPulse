'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { translateRole, TRoles } from '../auth/config/constants';
import { defaultToastOptions } from '../../config/UI/toast.options';
import { useSession } from 'next-auth/react';
import { Routes } from '../../config/routing/routes';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ChooseRole } from '../dashboard/shared/modals/ChooseRole';
import Loading from '../../loading';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000/api',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const CheckUser: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: isRoleModalOpen,
    onOpen: onRoleModalOpen,
    onClose: onRoleModalClose,
  } = useDisclosure();

  const { data: session, status, update } = useSession();
  useEffect(() => {
    console.log(session, status);
    if (status === 'unauthenticated') router.push(Routes.SignIn);
    if (status === 'authenticated' && !session?.user.role) onRoleModalOpen();
  }, [session, status, session?.user.role]);

  const handleRoleChange = async (role: string) => {
    try {
      const response = await instance.patch(`/user/${session?.user.id}`, {
        role,
      });
      console.log('handleRoleChange SUCCESS: ', response);

      toast({
        title: `Ваш статус було змінено на "${translateRole(role as TRoles)}"!`,
        ...defaultToastOptions,
      });

      await update({
        ...session,
        user: {
          ...session?.user,
          role,
        },
      });

      onRoleModalClose();
    } catch (e: any) {
      console.log('handleRoleChange ERROR: ', e);
      toast({
        title:
          e.response.data.message ||
          "Неочікувана помилка! Спробуйте ще раз або зв'яжіться з службою підтримки!",
        ...defaultToastOptions,
        status: 'error',
      });
    }
  };
  return (
    <>
      {isRoleModalOpen ? <ChooseRole chooseRole={handleRoleChange} /> : null}
      {status === 'loading' ? <Loading /> : children}
    </>
  );
};
