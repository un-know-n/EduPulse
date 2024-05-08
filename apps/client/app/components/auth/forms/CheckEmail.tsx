'use client';
import { FC } from 'react';
import {
  Badge,
  Box,
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
import { TextFormInput } from '../../shared/inputs/TextFormInput';
import { DefaultButton } from '../shared/buttons/DefaultButton';

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
      p='30px'
      color='#1D2734'
      w={['auto', 500]}>
      <Container
        p={0}
        mb={8}>
        <Heading fontSize={24}>Перевірте свою електронну пошту</Heading>
        <Text>
          Ми надіслали електронний лист із інформацією про скидання пароля на
          адресу {email}.
        </Text>
        <Flex
          flexDirection='column'
          alignItems='flex-start'>
          <Badge
            colorScheme='red'
            gap={1}
            mt={3}>
            During development only!
          </Badge>
          <Text>Ваш перевірочний код: {duringDevelopmentVerificationCode}</Text>
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
                  placeholder='Код підтвердження'
                />

                <DefaultButton mb='2'>Підтвердити</DefaultButton>
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
