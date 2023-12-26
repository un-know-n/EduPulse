import React, { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { VscAccount } from 'react-icons/vsc';

type TProps = {
  author: string;
};

export const AuthorLabel: FC<TProps> = ({ author }) => {
  return (
    <Flex alignItems='center'>
      <VscAccount size='20px' />
      <Text ml='10px'>{author}</Text>
    </Flex>
  );
};
