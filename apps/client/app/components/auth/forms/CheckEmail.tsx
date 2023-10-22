'use client';
import { FC } from 'react';
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
import { ResetButtons } from '../shared/buttons/ResetButtons';
import { Field, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { object, string, TypeOf } from 'zod';

type TProps = {
  email: string;
  sendHandler: () => void;
};

const checkSchema = object({
  confirmationCode: string({
    required_error: 'You need to enter confirmation code',
  }).trim(),
});
type TCheckFormInputs = TypeOf<typeof checkSchema>;

export const CheckEmail: FC<TProps> = ({ email, sendHandler }) => {
  const initialValues = {
    confirmationCode: '',
  };

  return (
    <Box
      p={5}
      maxW={450}>
      <Container
        p={0}
        mb={16}>
        <Heading>Check Your Email</Heading>
        <Text>
          We have sent an email with password reset information to {email}.
        </Text>
      </Container>
      <Box>
        <Formik<TCheckFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(checkSchema)}
          onSubmit={(values) => {
            const validatedForm = checkSchema.parse(values);
            alert(JSON.stringify(validatedForm, null, 2));
          }}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <FormControl
                  isInvalid={
                    !!errors.confirmationCode && touched.confirmationCode
                  }>
                  <Field
                    as={Input}
                    id='confirmationCode'
                    name='confirmationCode'
                    type='text'
                    variant='outline'
                    placeholder='Confirmation code'
                  />
                  <FormErrorMessage>{errors.confirmationCode}</FormErrorMessage>
                </FormControl>

                <Button
                  type='submit'
                  colorScheme='blue'
                  variant='outline'
                  width='full'
                  mb={2}>
                  Submit
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
      <Box>
        <ResetButtons
          switchToResendButton
          resendHandler={sendHandler}
        />
      </Box>
    </Box>
  );
};
