'use client';

import { Flex, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Flex
      w='full'
      h='100vh'
      justifyContent='center'
      alignItems='center'>
      <Spinner size='xl' />
    </Flex>
  );
}
