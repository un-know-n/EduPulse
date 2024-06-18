import { Nullable, TLectureResponse } from '../../@types/course';
import React, { FC, useEffect, useState } from 'react';
import {
  useCreateLectureMutation,
  useUpdateLectureMutation,
} from '../../../../store/services/courses';
import { useShowError } from '../../../../lib/hooks/useShowError';
import { sectionSchema } from '../schemas/section';
import { useAreObjectsEqual } from '../../../../lib/hooks/useAreObjectsEqual';
import { FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { TextFormInput } from '../../../shared/inputs/TextFormInput';
import { Flex } from '@chakra-ui/react';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';
import { TInitialLectureValues, lectureSchema } from '../schemas/lecture';
import { TextareaFormInput } from '../inputs/TextareaFormInput';

type TProps = Nullable<Pick<TLectureResponse, 'id' | 'title' | 'content'>> &
  Pick<TLectureResponse, 'sectionId'> & {
    onClose: () => void;
  };

export const LectureForm: FC<TProps> = ({
  sectionId,
  title,
  id,
  content,
  onClose,
}) => {
  const [
    updateLecture,
    {
      isLoading: isLoadingUpdate,
      error: isUpdateError,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateLectureMutation();
  const [
    createLecture,
    {
      isLoading: isLoadingCreate,
      error: isCreateError,
      isSuccess: isSuccessCreate,
    },
  ] = useCreateLectureMutation();
  const { notify } = useShowError(isUpdateError, false);
  useShowError(isCreateError, false);

  const handleSectionSubmit = async (values: TInitialLectureValues) => {
    if (id) {
      return updateLecture({
        id,
        title: values.title,
        content: values.content,
      });
    }
    createLecture({
      title: values.title,
      content: values.content,
      sectionId,
    });
  };

  const initialFormValues = {
    title: title ?? '',
    content: content ?? '',
  };
  const checkObjectsEquality = useAreObjectsEqual(initialFormValues);
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const formik = useFormik<TInitialLectureValues>({
    initialValues: initialFormValues,
    validateOnBlur: false,
    validationSchema: toFormikValidationSchema(lectureSchema),
    onSubmit: (data) => handleSectionSubmit(data),
  });

  const { values, touched, errors, handleSubmit } = formik;

  useEffect(() => {
    const noChange = checkObjectsEquality(values);
    setDisabledSubmitButton(noChange);
  }, [JSON.stringify(values), JSON.stringify(initialFormValues)]);

  useEffect(() => {
    if (isSuccessCreate) {
      notify('Лекцію створено', 'success');
      onClose();
    } else if (isSuccessUpdate) {
      notify('Лекцію оновлено', 'success');
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
          label={'Назва лекції (64 символи)'}
        />

        <TextareaFormInput
          isInvalid={Boolean(!!errors.content && touched.content)}
          errorMessage={errors.content ?? ''}
          fieldName='content'
          label={'Опис лекції (1028 символів)'}
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
