'use client';

import { FC, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Link } from '@chakra-ui/next-js';
import { ThirdPartyButtons } from '../shared/buttons/ThirdPartyButtons';
import { Routes } from '../../../config/routing/routes';
import { boolean, object, string, TypeOf } from 'zod';
import { emailValidator, passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { EmailFormInput } from '../shared/inputs/EmailFormInput';
import { PasswordFormInput } from '../shared/inputs/PasswordFormInput';
import { baseRoles, RoleFormInput } from '../shared/inputs/RoleFormInput';
import { TextFormInput } from '../shared/inputs/TextFormInput';
import { signIn } from 'next-auth/react';
import { signInOptions } from '../config/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthAlert from '../shared/alerts/AuthAlert';
import axios from 'axios';

const signUpSchema = object({
  name: string({
    required_error: 'Name is required',
  })
    .trim()
    .min(1, {
      message: 'Name cannot be empty',
    }),
  surname: string({
    required_error: 'Surname is required',
  })
    .trim()
    .min(1, {
      message: 'Surname cannot be empty',
    }),
  role: string().refine((role) => role === 'student' || role === 'teacher', {
    message: 'Role must be either "student" or "teacher"',
  }),
  email: emailValidator,
  password: passwordValidator,
  rememberMe: boolean(),
});
type TSignUpFormInputs = TypeOf<typeof signUpSchema>;
const initialValues = {
  name: '',
  surname: '',
  email: '',
  password: '',
  role: baseRoles[0],
  rememberMe: false,
};
type TInitialValues = typeof initialValues;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000/api',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const SignUp: FC = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const callbackUrl = useSearchParams().get('callbackUrl') || Routes.Dashboard;
  const options = signInOptions(callbackUrl);

  const signUp = async (data: Omit<TInitialValues, 'rememberMe'>) => {
    const res = await instance.post('/auth/sign-up', {
      name: `${data.name} ${data.surname}`,
      email: data.email,
      role: data.role,
      password: data.password,
    });

    if (res.status! >= 400) {
      setError(res.statusText);
      return null;
    }

    return res.data;
  };

  const onSubmit = async (values: TInitialValues) => {
    const { rememberMe, ...validatedForm } = signUpSchema.parse(values);

    const response = await signUp(validatedForm as TInitialValues);

    if (response) {
      setError('');

      signIn('credentials', {
        email: validatedForm.email,
        password: validatedForm.password,
        ...options,
        redirect: false,
      }).then((value) => {
        if (!value?.error) {
          router.push(callbackUrl);
        } else {
          setError(
            'Unexpected error occurred, try to login to your account manually!',
          );
        }
      });
    }
  };

  return (
    <Box
      p={5}
      maxW={500}
      my='auto'
      mx='auto'>
      <Container
        p={0}
        mb={5}>
        <Heading>Create account</Heading>
        <Text>
          Already have an account?{' '}
          <Link
            color='blue.500'
            href={Routes.SignIn}>
            Sign in
          </Link>
        </Text>
      </Container>
      {error ? (
        <AuthAlert
          title='Error!'
          description={error}
          status='error'
        />
      ) : null}
      <Box mt={5}>
        <Formik<TSignUpFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(signUpSchema)}
          onSubmit={(data) => onSubmit(data as TInitialValues)}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <Flex
                  gap='3'
                  w='full'>
                  <TextFormInput
                    isInvalid={Boolean(!!errors.name && touched.name)}
                    errorMessage={errors.name ?? ''}
                    fieldName='name'
                    placeholder='Name'
                  />

                  <TextFormInput
                    isInvalid={Boolean(!!errors.surname && touched.surname)}
                    errorMessage={errors.surname ?? ''}
                    fieldName='surname'
                    placeholder='Surname'
                  />
                </Flex>
                <RoleFormInput
                  isInvalid={Boolean(!!errors.role && touched.role)}
                  errorMessage={errors.role ?? ''}
                  values={values.role}
                  onChange={handleChange}
                />

                <EmailFormInput
                  isInvalid={Boolean(!!errors.email && touched.email)}
                  errorMessage={errors.email ?? ''}
                />

                <PasswordFormInput
                  isInvalid={Boolean(!!errors.password && touched.password)}
                  errorMessage={errors.password ?? ''}
                />

                <Field
                  as={Checkbox}
                  id='rememberMe'
                  name='rememberMe'
                  colorScheme='blue'>
                  <Text>
                    By checking this you agree with{' '}
                    <Link
                      color='blue.500'
                      href='/'>
                      Privacy policy
                    </Link>{' '}
                    and{' '}
                    <Link
                      color='blue.500'
                      href='/'>
                      Terms of use
                    </Link>
                  </Text>
                </Field>

                <Button
                  type='submit'
                  colorScheme='blue'
                  variant='outline'
                  width='full'>
                  Sign up
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
