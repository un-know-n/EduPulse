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
import { FC, useState } from 'react';
import { object, TypeOf } from 'zod';
import { emailValidator, passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { PasswordFormInput } from '../shared/inputs/PasswordFormInput';
import { EmailFormInput } from '../shared/inputs/EmailFormInput';
import { signIn } from 'next-auth/react';
import { signInOptions } from '../config/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthAlert from '../shared/alerts/AuthAlert';
import { DefaultButton } from '../shared/buttons/DefaultButton';

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
  const [error, setError] = useState('');
  const callbackUrl = useSearchParams().get('callbackUrl') || Routes.Dashboard;
  const options = signInOptions(callbackUrl);
  const router = useRouter();

  return (
    <Box
      p='30px'
      minW={['auto', 500]}
      color='#1D2734'>
      <Container
        p={0}
        mb={5}>
        <Heading>Вітаємо!</Heading>
        <Text>
          Ще не зареєстровані?{' '}
          <Link
            color='purple.500'
            href={Routes.SignUp}>
            Створити обліковий запис
          </Link>
        </Text>
      </Container>
      {error ? <AuthAlert text={error} /> : null}
      <Box mt={5}>
        <Formik<TSignInFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(signInSchema)}
          onSubmit={(values) => {
            setError('');
            const validatedForm = signInSchema.parse(values);
            signIn('credentials', {
              email: validatedForm.email,
              password: validatedForm.password,
              ...options,
              redirect: false,
            }).then((value) => {
              if (!value?.error) {
                router.push(callbackUrl);
              } else {
                setError('Облікові дані не збігаються!');
              }
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
                    color='purple.500'>
                    Забули пароль?
                  </Link>
                </Container>
                <DefaultButton>Увійти</DefaultButton>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
      <ThirdPartyButtons includeDivider />
    </Box>
  );
};
