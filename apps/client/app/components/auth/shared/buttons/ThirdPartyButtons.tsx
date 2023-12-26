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
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { themeColors } from '../../../../config/UI/theme';
import { signInOptions } from '../../config/constants';
import { CustomThirdPartyButton } from './CustomThirdPartyButton';

const InfoButtons = [
  {
    icon: <FcGoogle />,
    title: 'Продовжити з Google',
    callback: (options: any) => signIn('google', options),
  },
  {
    icon: <FaGithub />,
    title: 'Продовжити з GitHub',
    callback: (options: any) => signIn('github', options),
  },
  {
    icon: <FaDiscord color='#5865F2' />,
    title: 'Продовжити з Discord',
    callback: (options: any) => signIn('discord', options),
  },
];

type TProps = {
  includeDivider?: boolean;
  dividerText?: string;
};

export const ThirdPartyButtons: FC<TProps> = ({
  includeDivider = false,
  dividerText = 'Або',
}) => {
  const { colorMode } = useColorMode();
  const color = useColorModeValue('black', 'whitesmoke');

  const options = signInOptions(useSearchParams().get('callbackUrl'));

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
            px='4'
            fontWeight='medium'>
            {dividerText}
          </AbsoluteCenter>
        </Box>
      )}
      <Flex
        w='full'
        flexDirection='column'
        gap='2'>
        {InfoButtons.map((data) => (
          <CustomThirdPartyButton
            key={data.title}
            leftIcon={data.icon}
            onClick={() => data.callback(options)}>
            {data.title}
          </CustomThirdPartyButton>
        ))}
      </Flex>
    </Box>
  );
};
