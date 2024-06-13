import { ButtonProps } from '@chakra-ui/react';
import { useRemoveTestMutation } from 'apps/client/app/store/services/courses';
import { FC } from 'react';
import { GeneralDeleteButton } from '../general/GeneralDeleteButton';

type Props = {
  testId: string;
};

export const DeleteTestButton: FC<Props & ButtonProps> = ({
  testId,
  ...props
}) => {
  const [
    removeTest,
    {
      error: removeError,
      isLoading: isLoadingRemove,
      isSuccess: isSuccessRemove,
    },
  ] = useRemoveTestMutation();

  return (
    <GeneralDeleteButton
      error={removeError}
      isLoading={isLoadingRemove}
      isSuccess={isSuccessRemove}
      handleRemove={() => removeTest(testId)}
      headerTitle='Ви хочете видалити тест?'
      successMessage='Тест видалено'
      isIconButton
      {...props}></GeneralDeleteButton>
  );
};
