'use client';

import { FC } from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { ResetPasswordButtons } from '../shared/buttons/ResetPasswordButtons';
import { object, string, TypeOf } from 'zod';
import { passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { PasswordFormInput } from '../shared/inputs/PasswordFormInput';

type TProps = {
  changeHandler: (password: string) => void;
};

const resetSchema = object({
  password: passwordValidator,
  confirmPassword: string({ required_error: 'Confirm entered password' }),
});
type TResetFormInputs = TypeOf<typeof resetSchema>;

export const ResetPassword: FC<TProps> = ({ changeHandler }) => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  return (
    <Box
      p='40px'
      color='black'
      borderRadius='20'
      bg='white'
      maxW={650}>
      <Container
        p={0}
        mb={8}>
        <Heading>Змініть пароль</Heading>
        <Text>
          Вигадайте складний пароль, використовуючи букви, символи та цифри і
          підтвердіть його зміну
        </Text>
      </Container>
      <Box>
        <Formik<TResetFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(resetSchema)}
          onSubmit={(values) => {
            const validatedForm = resetSchema.parse(values);
            changeHandler(validatedForm.password);
          }}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <PasswordFormInput
                  isInvalid={Boolean(!!errors.password && touched.password)}
                  errorMessage={errors.password ?? ''}
                />

                <PasswordFormInput
                  isInvalid={Boolean(
                    !!errors.confirmPassword && touched.confirmPassword,
                  )}
                  errorMessage={errors.confirmPassword ?? ''}
                  forConfirmation
                  passwordValue={values.password}
                />
                <ResetPasswordButtons />
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
