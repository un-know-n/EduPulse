'use client';

import { ResetPasswordProposal } from '../../components/auth/forms/ResetPasswordProposal';
import {
  Box,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from '@chakra-ui/react';
import { CheckEmail } from '../../components/auth/forms/CheckEmail';
import { ResetPassword } from '../../components/auth/forms/ResetPassword';

const steps = [
  { title: 'Enter Email', description: 'Provide your email' },
  { title: 'Check Email', description: 'Find letter from us' },
  { title: 'Change Password', description: 'Choose another password' },
];

enum Steps {
  ResetProposal,
  CheckEmail,
  ChangePassword,
}

export default function Page() {
  const { activeStep, goToNext } = useSteps({
    index: Steps.ResetProposal,
    count: steps.length,
  });

  return (
    <>
      <Flex
        w='full'
        h='full'
        gap={5}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Stepper
          index={activeStep}
          w='full'
          maxW={750}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        {activeStep === Steps.ResetProposal && (
          <ResetPasswordProposal handlePasswordResetProposal={goToNext} />
        )}

        {activeStep === Steps.CheckEmail && (
          <CheckEmail
            email='abrakadabra@mail'
            sendHandler={goToNext}
          />
        )}

        {activeStep === Steps.ChangePassword && (
          <ResetPassword changeHandler={() => 0} />
        )}
      </Flex>
    </>
  );
}
