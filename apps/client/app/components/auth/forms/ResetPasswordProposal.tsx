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
import { object, TypeOf } from 'zod';
import { emailValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';

type TProps = {
  handlePasswordResetProposal: () => void;
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
      p={5}
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
        <Formik<TResetProposalFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(resetProposalSchema)}
          onSubmit={(values) => {
            const validatedForm = resetProposalSchema.parse(values);
            alert(JSON.stringify(validatedForm, null, 2));
            handlePasswordResetProposal();
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
                <ResetButtons />
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
