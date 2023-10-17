'use client';

import { FC } from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Link } from '@chakra-ui/next-js';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export const SignUp: FC = () => {
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
            href='/'>
            Sign in
          </Link>
        </Text>
      </Container>
      <Box>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}>
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <Flex
                  gap='3'
                  w='full'>
                  <FormControl isInvalid={!!errors.name && touched.password}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Field
                      as={Input}
                      id='name'
                      name='name'
                      type='text'
                      variant='filled'
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

                  <FormControl isInvalid={!!errors.surname && touched.password}>
                    <FormLabel htmlFor='surname'>Surname</FormLabel>
                    <Field
                      as={Input}
                      id='surname'
                      name='surname'
                      type='text'
                      variant='filled'
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
                <FormControl>
                  <FormLabel htmlFor='email'>Email Address</FormLabel>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='email'
                    variant='filled'
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Field
                    as={Input}
                    id='password'
                    name='password'
                    type='password'
                    variant='filled'
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
      <Box
        position='relative'
        padding='8'>
        <Divider />
        <AbsoluteCenter
          bg='white'
          px='4'>
          Or
        </AbsoluteCenter>
      </Box>
      <Flex
        w='full'
        flexDirection='column'
        gap='2'>
        <Button
          leftIcon={<FcGoogle />}
          variant='outline'>
          Continue with Google
        </Button>
        <Button
          leftIcon={<FaGithub />}
          variant='outline'>
          Continue with GitHub
        </Button>
      </Flex>
    </Box>
  );
};
