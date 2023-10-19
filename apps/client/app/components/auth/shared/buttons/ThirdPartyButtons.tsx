import { FC } from 'react';
import { AbsoluteCenter, Box, Button, Divider, Flex } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

type TProps = {
  includeDivider?: boolean;
  dividerText?: string;
};

export const ThirdPartyButtons: FC<TProps> = ({
  includeDivider = false,
  dividerText = 'Or',
}) => {
  return (
    <Box>
      {includeDivider && (
        <Box
          position='relative'
          padding='8'>
          <Divider />
          <AbsoluteCenter
            bg='white'
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
          variant='outline'>
          Continue with Google
        </Button>
        <Button
          leftIcon={<FaGithub />}
          variant='outline'>
          Continue with GitHub
        </Button>
      </Flex>
    </Box>
  );
};
