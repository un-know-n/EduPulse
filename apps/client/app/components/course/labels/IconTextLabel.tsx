import React, { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

type TProps = {
  icon: React.ReactElement;
  text: string;
};

export const IconTextLabel: FC<TProps> = ({ text, icon }) => {
  return (
    <Flex align='center'>
      {icon}
      <Text ml='10px'>{text}</Text>
    </Flex>
  );
};
