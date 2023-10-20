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
import { object, string, TypeOf } from 'zod';
import { passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';

type TProps = {
  changeHandler: () => void;
};

const resetSchema = object({
  password: passwordValidator,
  confirmPassword: string(),
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
      w='60%'
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
                <FormControl
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }>
                  <Field
                    as={Input}
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    variant='outline'
                    placeholder='Confirm Password'
                    validate={(value: string) => {
                      let error;

                      if (value !== values.password) {
                        error = `Passwords don't match`;
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
