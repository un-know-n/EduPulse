'use client';

import { FC } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { ResetButtons } from '../shared/buttons/ResetButtons';

export const ResetPasswordProposal: FC = () => {
  const initialValues = {
    email: '',
  };

  return (
    <Box
      p={5}
      maxW={450}
      my='auto'
      mx='auto'>
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
                <ResetButtons />
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
