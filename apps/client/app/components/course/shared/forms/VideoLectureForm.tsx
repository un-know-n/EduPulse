import { Flex } from '@chakra-ui/react';
import { useAreObjectsEqual } from 'apps/client/app/lib/hooks/useAreObjectsEqual';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import {
  useUpdateLectureMutation,
  useCreateLectureMutation,
} from 'apps/client/app/store/services/courses';
import { useFormik, FormikProvider } from 'formik';
import { FC, useState, useEffect } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';
import { TextFormInput } from '../../../shared/inputs/TextFormInput';
import { Nullable, TLectureResponse } from '../../@types/course';
import {
  TInitialVideoLectureValues,
  videoLectureSchema,
} from '../schemas/video';
import { TextareaFormInput } from '../inputs/TextareaFormInput';

type TProps = Nullable<
  Pick<TLectureResponse, 'id' | 'title' | 'videoUrl' | 'content'>
> &
  Pick<TLectureResponse, 'sectionId'> & {
    onClose: () => void;
  };

export const VideoLectureForm: FC<TProps> = ({
  sectionId,
  title,
  id,
  content,
  videoUrl,
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

  const handleSectionSubmit = async (values: TInitialVideoLectureValues) => {
    if (id) {
      return updateLecture({
        id,
        title: values.title,
        videoUrl: values.videoUrl,
        content: values.content,
      });
    }
    createLecture({
      title: values.title,
      videoUrl: values.videoUrl,
      content: values.content,
      sectionId,
    });
  };

  const initialFormValues = {
    title: title ?? '',
    content: content ?? '',
    videoUrl: videoUrl ?? '',
  };
  const checkObjectsEquality = useAreObjectsEqual(initialFormValues);
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const formik = useFormik<TInitialVideoLectureValues>({
    initialValues: initialFormValues,
    validateOnBlur: false,
    validationSchema: toFormikValidationSchema(videoLectureSchema),
    onSubmit: (data) => handleSectionSubmit(data),
  });

  const { values, touched, errors, handleSubmit } = formik;

  useEffect(() => {
    const noChange = checkObjectsEquality(values);
    setDisabledSubmitButton(noChange);
  }, [JSON.stringify(values), JSON.stringify(initialFormValues)]);

  useEffect(() => {
    if (isSuccessCreate) {
      notify('Відеоматеріал створено', 'success');
      onClose();
    } else if (isSuccessUpdate) {
      notify('Відеоматеріал оновлено', 'success');
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
          label={'Назва відеоматеріалу (64 символи)'}
        />

        <TextFormInput
          isInvalid={Boolean(!!errors.videoUrl && touched.videoUrl)}
          errorMessage={errors.videoUrl ?? ''}
          fieldName='videoUrl'
          label={'Посилання на відео'}
        />

        <TextareaFormInput
          isInvalid={Boolean(!!errors.content && touched.content)}
          errorMessage={errors.content ?? ''}
          fieldName='content'
          label={'Опис до відеоматеріалу (1028 символів)'}
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
