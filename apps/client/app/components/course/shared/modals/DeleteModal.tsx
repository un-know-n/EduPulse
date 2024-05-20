import { Button, Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import { DefaultCourseModal } from './DefaultCourseModal';

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  headerTitle: string;
  handleClick: () => void;
};

export const DeleteModal: FC<Props> = ({
  handleClick,
  headerTitle,
  isLoading,
  isOpen,
  onClose,
}) => {
  return (
    <DefaultCourseModal
      isCentered
      size={{ base: 'xs', md: 'md' }}
      headerTitle={headerTitle}
      onClose={onClose}
      isOpen={isOpen}>
      <Flex
        w={'full'}
        justifyContent={'flex-end'}>
        <Button
          colorScheme='red'
          isLoading={isLoading}
          onClick={handleClick}
          mr={3}>
          Так
        </Button>
        <Button
          onClick={onClose}
          colorScheme='gray'
          variant='outline'>
          Скасувати
        </Button>
      </Flex>
    </DefaultCourseModal>
  );
};
