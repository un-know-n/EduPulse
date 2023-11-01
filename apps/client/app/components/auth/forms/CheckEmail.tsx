'use client';
import { FC } from 'react';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ResetPasswordButtons } from '../shared/buttons/ResetPasswordButtons';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { object, string, TypeOf } from 'zod';
import { TextFormInput } from '../shared/inputs/TextFormInput';

type TProps = {
  email: string;
  duringDevelopmentVerificationCode: string;
  sendVerificationToken: (token: string) => void;
  handleResendToken: (email: string) => void;
};

const checkSchema = object({
  confirmationCode: string({
    required_error: 'You need to enter confirmation code',
  }).trim(),
});
type TCheckFormInputs = TypeOf<typeof checkSchema>;

export const CheckEmail: FC<TProps> = ({
  email,
  duringDevelopmentVerificationCode,
  sendVerificationToken,
  handleResendToken,
}) => {
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
        <Flex
          flexDirection='row'
          alignItems='center'
          gap={3}>
          <Badge colorScheme='red'>During development only!</Badge>
          <Text>
            Your verification token: {duringDevelopmentVerificationCode}
          </Text>
        </Flex>
      </Container>
      <Box>
        <Formik<TCheckFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(checkSchema)}
          onSubmit={(values) => {
            const validatedForm = checkSchema.parse(values);
            sendVerificationToken(validatedForm.confirmationCode);
          }}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <TextFormInput
                  isInvalid={Boolean(
                    !!errors.confirmationCode && touched.confirmationCode,
                  )}
                  errorMessage={errors.confirmationCode ?? ''}
                  fieldName='confirmationCode'
                  placeholder='Confirmation code'
                />

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
        <ResetPasswordButtons
          switchToResendButton
          resendHandler={() => handleResendToken(email)}
        />
      </Box>
    </Box>
  );
};
