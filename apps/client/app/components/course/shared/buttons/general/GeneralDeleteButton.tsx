import React, { FC, useEffect, PropsWithChildren } from 'react';

import {
  useDisclosure,
  ButtonProps,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Routes } from 'apps/client/app/config/routing/routes';
import { DeleteModal } from '../../modals/DeleteModal';

type Props = {
  headerTitle: string;
  handleRemove: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  successMessage?: string;
  isIconButton?: boolean;
  redirectLink?: string;
  error: FetchBaseQueryError | SerializedError | undefined;
};

export const GeneralDeleteButton: FC<
  PropsWithChildren<Props & ButtonProps>
> = ({
  headerTitle,
  error,
  handleRemove,
  isLoading,
  isSuccess,
  successMessage,
  isIconButton = false,
  redirectLink,
  children,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { notify } = useShowError(error);

  useEffect(() => {
    if (isSuccess) {
      if (redirectLink) window.location.href = redirectLink;
      notify(
        successMessage || 'Операція видалення виконана успішно',
        'success',
      );
    }
  }, [isSuccess]);

  return (
    <>
      {isIconButton ? (
        <IconButton
          aria-label='Delete material'
          icon={<FaTrashAlt />}
          colorScheme='red'
          variant='outline'
          onClick={(e: any) => {
            e.stopPropagation();
            onOpen();
          }}
          {...props}
        />
      ) : (
        <Button
          colorScheme='red'
          variant='outline'
          rightIcon={<FaTrashAlt />}
          w={'fit-content'}
          onClick={(e: any) => {
            e.stopPropagation();
            onOpen();
          }}
          {...props}>
          {children}
        </Button>
      )}

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        headerTitle={headerTitle}
        handleClick={handleRemove}
      />
    </>
  );
};
