import { useRemoveCourseMutation } from 'apps/client/app/store/services/courses';
import React, { FC } from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { Routes } from 'apps/client/app/config/routing/routes';
import { GeneralDeleteButton } from './general/GeneralDeleteButton';

type Props = {
  courseId: string;
};

export const DeleteCourseButton: FC<Props & ButtonProps> = ({
  courseId,
  ...props
}) => {
  const [
    removeCourse,
    {
      error: removeError,
      isLoading: isLoadingRemove,
      isSuccess: isSuccessRemove,
    },
  ] = useRemoveCourseMutation();

  return (
    <GeneralDeleteButton
      error={removeError}
      isLoading={isLoadingRemove}
      isSuccess={isSuccessRemove}
      handleRemove={() => removeCourse(courseId)}
      headerTitle='Ви хочете видалити курс?'
      redirectLink={`${Routes.Dashboard}`}
      {...props}>
      Видалити курс
    </GeneralDeleteButton>
  );
};
