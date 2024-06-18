import { useDisclosure, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { TTestResponse } from '../../../@types/course';
import { SectionForm } from '../../forms/SectionForm';
import { DefaultCourseModal } from '../../modals/DefaultCourseModal';
import { TestForm } from '../../forms/TestForm';

export const UpdateTestButton: FC<TTestResponse> = (props) => {
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
        headerTitle='Змініть налаштування тесту'
        onClose={onClose}
        isOpen={isOpen}>
        <TestForm
          {...props}
          onClose={onClose}
        />
      </DefaultCourseModal>
    </>
  );
};
