'use client';

import { FC, PropsWithChildren } from 'react';
import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../../../public/logo.svg';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      w='full'
      h='100vh'>
      <Flex
        w='full'
        h='full'
        flexDirection='column'
        justifyContent='space-between'
        backgroundColor='gray.900'
        p='8'>
        <Flex>
          <Image
            width={32}
            height={32}
            src={logo}
            alt='Logo'
          />
          <Heading
            pl='3'
            color='white'>
            Edu Platform
          </Heading>
        </Flex>
        <Container
          color='white'
          w='full'
          maxW='450px'
          m={0}
          p={0}>
          <Text
            fontWeight='bold'
            fontSize='xl'>
            Numquam architecto iure
          </Text>
          <Text>
            Ut corrupti est molestiae occaecati voluptatem vel harum explicabo
            numquam.
          </Text>
        </Container>
      </Flex>
      <Flex
        color='black'
        bg='#221C4C'
        w='full'
        h='full'>
        {children}
      </Flex>
    </Flex>
  );
};
