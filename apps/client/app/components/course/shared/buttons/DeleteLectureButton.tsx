import { useRemoveLectureMutation } from 'apps/client/app/store/services/courses';
import React, { FC } from 'react';
import { GeneralDeleteButton } from './GeneralDeleteButton';
import { ButtonProps } from '@chakra-ui/react';

type Props = {
  lectureId: string;
};

export const DeleteLectureButton: FC<Props & ButtonProps> = ({
  lectureId,
  ...props
}) => {
  const [
    removeLecture,
    {
      error: removeError,
      isLoading: isLoadingRemove,
      isSuccess: isSuccessRemove,
    },
  ] = useRemoveLectureMutation();

  return (
    <GeneralDeleteButton
      error={removeError}
      isLoading={isLoadingRemove}
      isSuccess={isSuccessRemove}
      handleRemove={() => removeLecture(lectureId)}
      headerTitle='Ви хочете видалити лекцію?'
      successMessage='Лекцію видалено'
      isIconButton
      {...props}></GeneralDeleteButton>
  );
};
