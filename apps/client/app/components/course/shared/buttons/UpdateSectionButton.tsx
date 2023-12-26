import React, { FC } from 'react';
import { TSectionResponse } from '../../@types/course';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { DefaultCourseModal } from '../modals/DefaultCourseModal';
import { SectionForm } from '../forms/SectionForm';

export const UpdateSectionButton: FC<
  Omit<TSectionResponse, 'createdAt' | 'lectures'>
> = (props) => {
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
        headerTitle='Змініть налаштування модуля'
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
