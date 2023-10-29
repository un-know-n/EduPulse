'use client';

import { FC } from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn, SignInOptions } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Routes } from '../../../../config/routes';
import { themeColors } from '../../../../config/theme';

type TProps = {
  includeDivider?: boolean;
  dividerText?: string;
};

export const ThirdPartyButtons: FC<TProps> = ({
  includeDivider = false,
  dividerText = 'Or',
}) => {
  const { colorMode } = useColorMode();
  const color = useColorModeValue('black', 'whitesmoke');

  const options: SignInOptions = {
    redirect: true,
    callbackUrl: useSearchParams().get('callbackUrl') || Routes.Dashboard,
  };

  return (
    <Box>
      {includeDivider && (
        <Box
          position='relative'
          padding='8'>
          <Divider borderColor={color} />
          <AbsoluteCenter
            color={color}
            bgColor={colorMode === 'light' ? 'white' : themeColors[1]}
            px='4'>
            {dividerText}
          </AbsoluteCenter>
        </Box>
      )}

      <Flex
        w='full'
        flexDirection='column'
        gap='2'>
        <Button
          leftIcon={<FcGoogle />}
          onClick={() => signIn('google', options)}
          variant='outline'>
          Continue with Google
        </Button>
        <Button
          leftIcon={<FaGithub />}
          onClick={() => signIn('github', options)}
          variant='outline'>
          Continue with GitHub
        </Button>
      </Flex>
    </Box>
  );
};
