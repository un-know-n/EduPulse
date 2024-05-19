import React, { FC, useEffect, useState } from 'react';
import { Box, Text, Divider, useColorMode, Stack } from '@chakra-ui/react';
import { useTypedDispatch, useTypedSelector } from '../../../lib/hooks/redux';
import { ProfileLayout } from '../layout/ProfileLayout';
import { headerTextStyleDark, headerTextStyleLight } from '../config/styles';
import { Formik, Form, Field, FormikProvider, useFormik } from 'formik';
import { any, number, object, string, TypeOf } from 'zod';
import ImageUpload from '../../course/shared/inputs/ImageUpload';

import { TextFormInput } from '../../shared/inputs/TextFormInput';
import { TextareaFormInput } from '../../course/shared/inputs/TextareaFormInput';

import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';
import { useSession } from 'next-auth/react';
import { useAreObjectsEqual } from 'apps/client/app/lib/hooks/useAreObjectsEqual';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import { setUser } from 'apps/client/app/store/reducers/user.slice';
import { useUpdateProfileMutation } from 'apps/client/app/store/services/user';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from '../../course/config/constants';

const editProfileSchema = object({
  name: string().min(1, "Ім'я повинне містити мінімум 2 символи"),
  description: string()
    .max(512, 'Максимальна довжина опису повинна бути 512 символів')
    .optional(),
  file: any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Максимальний розмір зображення – 1 МБ`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Підтримуються лише формати .jpg, .jpeg і .png',
    )
    .nullable()
    .optional(),
});

type TProfileEditInputs = TypeOf<typeof editProfileSchema>;
type TInitialValues = {
  name: string;
  description: string;
  file: File;
};

export const ProfileEdit: FC = () => {
  const user = useTypedSelector((state) => state.user);
  const { update, data: session } = useSession();
  const [
    updateProfile,
    {
      error: updateError,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      data: updateData,
    },
  ] = useUpdateProfileMutation();

  const dispatch = useTypedDispatch();
  const { notify } = useShowError(updateError, false);

  const onUpdateProfile = async (values: TInitialValues) =>
    updateProfile({ id: user.id, ...values });

  const initialFormValues = {
    name: user.name ?? '',
    description: user.description ?? '',
  };
  const checkObjectsEquality = useAreObjectsEqual(initialFormValues);
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);
  const formik = useFormik<TProfileEditInputs>({
    initialValues: initialFormValues,
    validateOnBlur: false,
    validationSchema: toFormikValidationSchema(editProfileSchema),
    onSubmit: (data) => onUpdateProfile(data as TInitialValues),
  });

  const handleUpdateProfile = async () => {
    if (updateData) {
      try {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: updateData.name,
            description: updateData.description,
            image: updateData.image,
          },
        });

        dispatch(
          setUser({
            ...user,
            name: updateData.name,
            image: updateData.image || '',
            description: updateData.description,
          }),
        );

        notify('Профіль оновлено', 'success');
      } catch {
        notify(
          'Сталася неочікувана помилка під час оновлення профілю',
          'error',
        );
      }
    }
  };

  const { values, touched, errors, handleSubmit } = formik;

  useEffect(() => {
    const { file, name, description } = formik.values;
    const noChange = checkObjectsEquality({
      name,
      description: description || '',
    });
    setDisabledSubmitButton(file?.size ? false : noChange);
  }, [JSON.stringify(values), JSON.stringify(initialFormValues)]);

  useEffect(() => {
    handleUpdateProfile();
  }, [isSuccessUpdate]);

  const { colorMode } = useColorMode();
  const headerStyles =
    colorMode === 'light' ? headerTextStyleLight : headerTextStyleDark;

  return (
    <ProfileLayout hasProfileInfo={false}>
      <Box w={'full'}>
        <Text {...headerStyles}>Редагування профілю</Text>
        <Divider mb='20px' />
        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing='20px'
              mb='20px'>
              <TextFormInput
                isInvalid={Boolean(!!errors.name && touched.name)}
                errorMessage={errors.name ?? ''}
                fieldName='name'
                label={"Ваше ім'я*"}
              />

              <TextareaFormInput
                isInvalid={Boolean(!!errors.description && touched.description)}
                errorMessage={errors.description ?? ''}
                fieldName='description'
                label={'Про себе (512 символів)'}
              />

              <Box maxW={'fit-content'}>
                <ImageUpload
                  name='file'
                  label='Зображення профілю'
                  existingImageUrl={user.image!}
                  errorMessage={errors.file}
                  isInvalid={Boolean(!!errors.file && touched.file)}
                />
              </Box>
            </Stack>
            <DefaultButton
              isLoading={isLoadingUpdate}
              isDisabled={isDisabledSubmitButton}
              w={'fit-content'}>
              Зберегти зміни
            </DefaultButton>
          </form>
        </FormikProvider>
      </Box>
    </ProfileLayout>
  );
};
