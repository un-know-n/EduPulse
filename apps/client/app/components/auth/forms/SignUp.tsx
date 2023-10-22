'use client';

import { FC } from 'react';
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
import { Routes } from '../config/routes';
import { boolean, object, string, TypeOf } from 'zod';
import { emailValidator, passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { EmailFormInput } from '../shared/inputs/EmailFormInput';
import { PasswordFormInput } from '../shared/inputs/PasswordFormInput';
import { baseRoles, RoleFormInput } from '../shared/inputs/RoleFormInput';
import { TextFormInput } from '../shared/inputs/TextFormInput';

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

export const SignUp: FC = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: baseRoles[0],
    rememberMe: false,
  };

  return (
    <Box
      p={5}
      maxW={500}
      my='auto'
      mx='auto'>
      <Container
        p={0}
        mb={16}>
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
      <Box>
        <Formik<TSignUpFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(signUpSchema)}
          onSubmit={(values) => {
            const validatedForm = signUpSchema.parse(values);
            alert(JSON.stringify(validatedForm, null, 2));
          }}>
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
