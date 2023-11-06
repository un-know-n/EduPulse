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
  useMediaQuery,
  useSteps,
  useToast,
} from '@chakra-ui/react';
import { CheckEmail } from '../../components/auth/forms/CheckEmail';
import { ResetPassword } from '../../components/auth/forms/ResetPassword';
import { useState } from 'react';
import { Routes } from '../../config/routing/routes';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { defaultToastOptions } from '../../config/UI/toast.options';

const steps = [
  {
    title: 'Введіть електронну адресу',
    description: 'Адресу, що була використана при створенні акаунта',
  },
  { title: 'Перевірте пошту', description: 'Знайдіть листа від нас' },
  { title: 'Змініть пароль', description: 'Вигадайте інший пароль' },
];

enum Steps {
  ResetProposal,
  CheckEmail,
  ChangePassword,
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000/api',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const [resetInformation, setResetInformation] = useState<{
    email: string;
    token: string;
  }>();
  const { activeStep, goToNext } = useSteps({
    index: Steps.ResetProposal,
    count: steps.length,
  });
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  const handleResetProposal = async (email: string) => {
    try {
      await instance
        .post('/auth/reset-prompt', {
          email: email,
        })
        .then((res) => {
          console.log('handleResetProposal SUCCESS: ', res);
          setResetInformation(() => ({
            email,
            token: res.data.token,
          }));
          toast({
            title:
              'Перевірочний код був відправлений на вашу електронну пошту!',
            ...defaultToastOptions,
          });

          if (activeStep === Steps.ResetProposal) {
            goToNext();
          }
        });
    } catch (e: any) {
      console.log('handleResetProposal ERROR: ', e);
      toast({
        title:
          e.response.data.message ||
          'Неочікувана помилка під час відправки листа!',
        ...defaultToastOptions,
        status: 'error',
      });
    }
  };
  const handleTokenVerification = async (token: string) => {
    try {
      await instance
        .post('/auth/reset-verify', {
          email: resetInformation?.email ?? '',
          token: token,
        })
        .then((res) => {
          console.log('handleTokenVerification SUCCESS: ', res);
          if (res.data === true) goToNext();
        });
    } catch (e: any) {
      console.log('handleTokenVerification ERROR: ', e);
      toast({
        title:
          e.response.data.message ||
          'неочікувана помилка під час перевірки токена!',
        ...defaultToastOptions,
        status: 'error',
      });
    }
  };

  const handlePasswordReset = async (password: string) => {
    try {
      await instance
        .post('/auth/reset', {
          email: resetInformation?.email ?? '',
          password: password,
        })
        .then((res) => {
          console.log('handlePasswordReset SUCCESS: ', res);
          toast({
            title: 'Пароль було змінено!',
            ...defaultToastOptions,
          });
          router.push(Routes.SignIn);
        });
    } catch (e: any) {
      console.log('handlePasswordReset ERROR: ', e);
      toast({
        title:
          e.response.data.message ||
          'Неочікувана помилка під час зміни пароля!',
        ...defaultToastOptions,
        status: 'error',
      });
    }
  };

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
          orientation={isLargerThan1200 ? 'horizontal' : 'vertical'}
          w='full'
          px={5}
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
          <ResetPasswordProposal
            handlePasswordResetProposal={handleResetProposal}
          />
        )}

        {activeStep === Steps.CheckEmail && (
          <CheckEmail
            email={resetInformation?.email ?? ''}
            duringDevelopmentVerificationCode={resetInformation?.token ?? ''}
            sendVerificationToken={handleTokenVerification}
            handleResendToken={handleResetProposal}
          />
        )}

        {activeStep === Steps.ChangePassword && (
          <ResetPassword changeHandler={handlePasswordReset} />
        )}
      </Flex>
    </>
  );
}
