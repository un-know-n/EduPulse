'use client';
import { FC } from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { ResetButtons } from '../shared/buttons/ResetButtons';

type TProps = {
  email: string;
  resendHandler: () => void;
};

export const CheckEmail: FC<TProps> = ({ email, resendHandler }) => {
  return (
    <Box
      p={5}
      w='60%'
      maxW={450}
      my='auto'
      mx='auto'>
      <Container
        p={0}
        mb={16}>
        <Heading>Check Your Email</Heading>
        <Text>
          We have sent an email with password reset information to {email}.
        </Text>
      </Container>
      <Box>
        <ResetButtons
          switchToResendButton
          resendHandler={resendHandler}
        />
      </Box>
    </Box>
  );
};
