'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Routes } from '../../../config/routing/routes';
import { Formik } from 'formik';
import { ThirdPartyButtons } from '../shared/buttons/ThirdPartyButtons';
import { FC } from 'react';
import { object, TypeOf } from 'zod';
import { emailValidator, passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { PasswordFormInput } from '../shared/inputs/PasswordFormInput';
import { EmailFormInput } from '../shared/inputs/EmailFormInput';
import { signIn } from 'next-auth/react';
import { signInOptions } from '../config/constants';
import { useSearchParams } from 'next/navigation';

const signInSchema = object({
  email: emailValidator,
  password: passwordValidator,
});
type TSignInFormInputs = TypeOf<typeof signInSchema>;

const initialValues = {
  email: '',
  password: '',
};

export const SignIn: FC = () => {
  const options = signInOptions(useSearchParams().get('callbackUrl'));

  return (
    <Box
      p={5}
      w='80%'
      maxW={450}
      my='auto'
      mx='auto'>
      <Container
        p={0}
        mb={16}>
        <Heading>Login</Heading>
        <Text>
          Don&apos;t have an account?{' '}
          <Link
            color='blue.500'
            href={Routes.SignUp}>
            Sign up
          </Link>
        </Text>
      </Container>
      <Box>
        <Formik<TSignInFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(signInSchema)}
          onSubmit={(values) => {
            const validatedForm = signInSchema.parse(values);
            signIn('credentials', {
              email: validatedForm.email,
              password: validatedForm.password,
              ...options,
            });
          }}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <EmailFormInput
                  isInvalid={Boolean(!!errors.email && touched.email)}
                  errorMessage={errors.email ?? ''}
                />
                <PasswordFormInput
                  isInvalid={Boolean(!!errors.password && touched.password)}
                  errorMessage={errors.password ?? ''}
                />
                <Container
                  textAlign='end'
                  p={0}>
                  <Link
                    href={Routes.ResetPassword}
                    color='blue.500'>
                    Forgot password?
                  </Link>
                </Container>
                <Button
                  type='submit'
                  colorScheme='blue'
                  variant='outline'
                  width='full'>
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
      <ThirdPartyButtons includeDivider />
    </Box>
  );
};
