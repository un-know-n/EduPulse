'use client';

import { Flex, FlexProps, Spinner } from '@chakra-ui/react';

type TProps = FlexProps;

export default function Loading(props: TProps) {
  return (
    <Flex
      w='full'
      h='100vh'
      justifyContent='center'
      alignItems='center'
      {...props}>
      <Spinner size='xl' />
    </Flex>
  );
}
