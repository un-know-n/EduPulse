import React, { FC } from 'react';
import { TSectionResponse } from '../../@types/course';
import {
  Button,
  ButtonGroup,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DefaultCourseModal } from '../modals/DefaultCourseModal';
import { SectionForm } from '../forms/SectionForm';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const CreateSectionButton: FC<Pick<TSectionResponse, 'courseId'>> = (
  props,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ButtonGroup
        size='sm'
        isAttached
        onClick={(e: any) => {
          e.stopPropagation();
          onOpen();
        }}
        colorScheme={'purple'}
        variant='outline'>
        <Button>Додати модуль</Button>
        <IconButton
          aria-label='Add to friends'
          icon={<IoIosAddCircleOutline />}
        />
      </ButtonGroup>

      <DefaultCourseModal
        headerTitle='Створіть модуль'
        onClose={onClose}
        isOpen={isOpen}>
        <SectionForm
          {...props}
          onClose={onClose}
        />
      </DefaultCourseModal>
    </>
  );
};
