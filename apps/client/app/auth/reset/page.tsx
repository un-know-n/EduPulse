'use client';

import { ResetPasswordProposal } from '../../components/auth/forms/ResetPasswordProposal';
import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  LightMode,
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
  useToast,
} from '@chakra-ui/react';
import { CheckEmail } from '../../components/auth/forms/CheckEmail';
import { ResetPassword } from '../../components/auth/forms/ResetPassword';
import { useState } from 'react';
import { Routes } from '../../config/routing/routes';
import { useRouter } from 'next/navigation';
import { defaultToastOptions } from '../../config/UI/toast.options';
import { apiInstance } from '../../lib/services/api.instance';

const baseStyle = {
  description: {
    color: 'purple.400',
    fontSize: '16',
  },
};

const stepperTheme = {
  baseStyle,
};

const theme = extendTheme({
  components: {
    Stepper: stepperTheme,
  },
});

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

  const handleResetProposal = async (email: string) => {
    try {
      await apiInstance
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
              'Перевірочний код було відправлено на вашу електронну пошту!',
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
      await apiInstance
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
          'Неочікувана помилка під час перевірки токена!',
        ...defaultToastOptions,
        status: 'error',
      });
    }
  };

  const handlePasswordReset = async (password: string) => {
    try {
      await apiInstance
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
    <ChakraProvider theme={theme}>
      <Flex
        color='white'
        w='full'
        h='full'
        gap={5}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <LightMode>
          <Stepper
            index={activeStep}
            size='lg'
            colorScheme='purple'
            orientation='vertical'
            height='200px'
            gap='0'>
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
        </LightMode>
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
    </ChakraProvider>
  );
}
