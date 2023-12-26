import React, { FC, useEffect, useState } from 'react';
import { sectionSchema, TInitialSectionValues } from '../schemas/section';
import { Nullable, TSectionResponse } from '../../@types/course';
import { useAreObjectsEqual } from '../../../../lib/hooks/useAreObjectsEqual';
import { FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Flex } from '@chakra-ui/react';
import { TextFormInput } from '../../../shared/inputs/TextFormInput';
import {
  useCreateSectionMutation,
  useUpdateSectionMutation,
} from '../../../../store/services/courses';
import { useShowError } from '../../../../lib/hooks/useShowError';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';

type TProps = Nullable<Pick<TSectionResponse, 'title' | 'id'>> &
  Pick<TSectionResponse, 'courseId'> & { onClose: () => void };

export const SectionForm: FC<TProps> = ({ title, id, courseId, onClose }) => {
  const [
    updateSection,
    {
      isLoading: isLoadingUpdate,
      error: isUpdateError,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateSectionMutation();
  const [
    createSection,
    {
      isLoading: isLoadingCreate,
      error: isCreateError,
      isSuccess: isSuccessCreate,
    },
  ] = useCreateSectionMutation();
  const { notify } = useShowError(isUpdateError, false);
  useShowError(isCreateError, false);

  const handleSectionSubmit = async (values: TInitialSectionValues) => {
    if (id) {
      return updateSection({
        id,
        title: values.title,
      });
    }
    createSection({
      title: values.title,
      courseId,
    });
  };

  const initialFormValues = {
    title: title ?? '',
  };
  const checkObjectsEquality = useAreObjectsEqual(initialFormValues);
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const formik = useFormik<TInitialSectionValues>({
    initialValues: initialFormValues,
    validateOnBlur: false,
    validationSchema: toFormikValidationSchema(sectionSchema),
    onSubmit: (data) => handleSectionSubmit(data),
  });

  const { values, touched, errors, handleSubmit } = formik;

  useEffect(() => {
    const noChange = checkObjectsEquality(values);
    setDisabledSubmitButton(noChange);
  }, [JSON.stringify(values), JSON.stringify(initialFormValues)]);

  useEffect(() => {
    if (isSuccessCreate) {
      notify('Модуль створено!', 'success');
      onClose();
    } else if (isSuccessUpdate) {
      notify('Модуль оновлено!', 'success');
      onClose();
    }
  }, [isSuccessCreate, isSuccessUpdate]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <TextFormInput
          isInvalid={Boolean(!!errors.title && touched.title)}
          errorMessage={errors.title ?? ''}
          fieldName='title'
          label={'Назва модуля (64 символи)'}
        />

        <Flex
          mt={5}
          justifyContent={'flex-end'}>
          <DefaultButton
            w={'fit-content'}
            type={'submit'}
            isDisabled={isDisabledSubmitButton}
            isLoading={isLoadingCreate || isLoadingUpdate}>
            Зберегти
          </DefaultButton>
        </Flex>
      </form>
    </FormikProvider>
  );
};
