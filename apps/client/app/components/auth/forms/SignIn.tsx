'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Routes } from '../config/routes';
import { Field, Formik } from 'formik';
import { ThirdPartyButtons } from '../shared/buttons/ThirdPartyButtons';
import { FC } from 'react';
import { object, TypeOf } from 'zod';
import { emailValidator, passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const signInSchema = object({
  email: emailValidator,
  password: passwordValidator,
});
type TSignInFormInputs = TypeOf<typeof signInSchema>;

export const SignIn: FC = () => {
  const initialValues = {
    email: '',
    password: '',
  };

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
            alert(JSON.stringify(validatedForm, null, 2));
          }}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='email'
                    variant='outline'
                    placeholder='Email Address'
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <Field
                    as={Input}
                    id='password'
                    name='password'
                    type='password'
                    variant='outline'
                    placeholder='Password'
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
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
