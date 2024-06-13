import { ButtonProps } from '@chakra-ui/react';
import { useRemoveSectionMutation } from 'apps/client/app/store/services/courses';
import React, { FC } from 'react';
import { GeneralDeleteButton } from '../general/GeneralDeleteButton';
type Props = {
  sectionId: string;
};

export const DeleteSectionButton: FC<Props & ButtonProps> = ({
  sectionId,
  ...props
}) => {
  const [
    removeSection,
    {
      error: removeError,
      isLoading: isLoadingRemove,
      isSuccess: isSuccessRemove,
    },
  ] = useRemoveSectionMutation();

  return (
    <GeneralDeleteButton
      error={removeError}
      isLoading={isLoadingRemove}
      isSuccess={isSuccessRemove}
      handleRemove={() => removeSection(sectionId)}
      headerTitle='Ви хочете видалити модуль?'
      successMessage='Модуль видалено'
      isIconButton
      {...props}></GeneralDeleteButton>
  );
};
