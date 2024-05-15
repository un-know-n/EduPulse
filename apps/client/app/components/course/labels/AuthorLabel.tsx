import React, { FC } from 'react';
import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { VscAccount } from 'react-icons/vsc';

type TProps = {
  author: string;
};

export const AuthorLabel: FC<TProps> = ({ author }) => {
  const iconSize = useBreakpointValue({ base: '15px', md: '20px' });

  return (
    <Flex alignItems='center'>
      <VscAccount size={iconSize} />
      <Text ml='10px'>
        {author.length > 20 ? `${author.substring(0, 20)}...` : author}
      </Text>
    </Flex>
  );
};
