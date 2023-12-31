'use client';

import { FC } from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { ResetPasswordButtons } from '../shared/buttons/ResetPasswordButtons';
import { object, TypeOf } from 'zod';
import { emailValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { EmailFormInput } from '../shared/inputs/EmailFormInput';

type TProps = {
  handlePasswordResetProposal: (email: string) => void;
};

const resetProposalSchema = object({
  email: emailValidator,
});
type TResetProposalFormInputs = TypeOf<typeof resetProposalSchema>;

export const ResetPasswordProposal: FC<TProps> = ({
  handlePasswordResetProposal,
}) => {
  const initialValues = {
    email: '',
  };

  return (
    <Box
      p='60px'
      w='80%'
      color='black'
      borderRadius='20'
      bg='white'
      mx='auto'
      maxW={600}>
      <Container
        p={0}
        mb={8}>
        <Heading>Забули пароль?</Heading>
        <Text>
          Введіть адресу електронної пошти, яку ви використовували для створення
          облікового запису, щоб ми могли надіслати вам інструкції щодо зміни
          пароля.
        </Text>
      </Container>
      <Box>
        <Formik<TResetProposalFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(resetProposalSchema)}
          onSubmit={(values) => {
            const validatedForm = resetProposalSchema.parse(values);
            handlePasswordResetProposal(validatedForm.email);
          }}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <EmailFormInput
                  isInvalid={Boolean(!!errors.email && touched.email)}
                  errorMessage={errors.email ?? ''}
                />
                <ResetPasswordButtons />
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
