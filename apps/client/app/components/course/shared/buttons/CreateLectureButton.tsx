import React, { FC } from 'react';
import { TLectureResponse } from '../../@types/course';
import {
  Button,
  ButtonGroup,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DefaultCourseModal } from '../modals/DefaultCourseModal';
import { LectureForm } from '../forms/LectureForm';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const CreateLectureButton: FC<Pick<TLectureResponse, 'sectionId'>> = (
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
        <Button>Додати лекцію</Button>
        <IconButton
          aria-label='Add to friends'
          icon={<IoIosAddCircleOutline />}
        />
      </ButtonGroup>

      <DefaultCourseModal
        headerTitle='Створіть лекцію'
        onClose={onClose}
        isOpen={isOpen}>
        <LectureForm {...props} />
      </DefaultCourseModal>
    </>
  );
};
