'use client';

import { FC } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Link } from '@chakra-ui/next-js';
import { ThirdPartyButtons } from '../shared/ThirdPartyButtons';
import { Routes } from '../config/routes';

export const SignUp: FC = () => {
  const baseRoles = ['student', 'teacher'] as const;

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
        <Formik
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <Flex
                  gap='3'
                  w='full'>
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <Field
                      as={Input}
                      id='name'
                      name='name'
                      type='text'
                      variant='outline'
                      placeholder='Name'
                      validate={(value: string) => {
                        let error;

                        if (!value.length) {
                          error = 'You need to enter the name';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.surname && touched.surname}>
                    <Field
                      as={Input}
                      id='surname'
                      name='surname'
                      type='text'
                      variant='outline'
                      placeholder='Surname'
                      validate={(value: string) => {
                        let error;

                        if (!value.length) {
                          error = 'You need to enter the surname';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.surname}</FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='email'
                    variant='outline'
                    placeholder='Email Address'
                    validate={(value: string) => {
                      let error;

                      if (!value.length) {
                        error = 'You need to enter the email';
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <Field
                    as={Select}
                    id='role'
                    name='role'
                    value={values.role}
                    onChange={handleChange}
                    variant='outline'>
                    {baseRoles.map((role) => (
                      <option
                        key={role}
                        value={role}>
                        {role}
                      </option>
                    ))}
                  </Field>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <Field
                    as={Input}
                    id='password'
                    name='password'
                    type='password'
                    variant='outline'
                    placeholder='Password'
                    validate={(value: string) => {
                      let error;

                      if (value.length < 6) {
                        error = 'Password must contain at least 6 characters';
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
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
