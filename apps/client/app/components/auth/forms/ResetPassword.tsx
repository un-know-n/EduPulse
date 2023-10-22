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
  changeHandler: () => void;
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
      p={5}
      maxW={450}>
      <Container
        p={0}
        mb={16}>
        <Heading>Forgot password?</Heading>
        <Text>
          Enter the email address you used to create your account so we can send
          you instructions for changing your password.
        </Text>
      </Container>
      <Box>
        <Formik<TResetFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(resetSchema)}
          onSubmit={(values) => {
            const validatedForm = resetSchema.parse(values);
            alert(JSON.stringify(validatedForm, null, 2));
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
