import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import React, { FC } from 'react';
import { TLectureResponse } from '../../@types/course';
import { DefaultCourseModal } from '../modals/DefaultCourseModal';
import { LectureForm } from '../forms/LectureForm';

export const UpdateLectureButton: FC<Omit<TLectureResponse, 'createdAt'>> = (
  props,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label='Configure course'
        onClick={(e: any) => {
          e.stopPropagation();
          onOpen();
        }}
        icon={<MdOutlineSettingsSuggest />}
      />

      <DefaultCourseModal
        headerTitle='Змініть вміст лекції'
        onClose={onClose}
        isOpen={isOpen}>
        <LectureForm
          {...props}
          onClose={onClose}
        />
      </DefaultCourseModal>
    </>
  );
};
