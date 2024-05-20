import React, { FC, ReactElement } from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';

type TProps = {
  icon: ReactElement;
  title: string;
  description: string;
};

const AdvantageIcon: FC<{ icon: ReactElement }> = (props) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'#7662EA'}
      borderRadius='25px'
      color='white'
      w={'30px'}
      h={'30px'}>
      {props.icon}
    </Flex>
  );
};

export const AdvantageCard: FC<TProps> = (props) => {
  return (
    <Flex mb='30px'>
      <Box mr='15px'>
        <AdvantageIcon icon={props.icon} />
      </Box>
      <Flex flexDirection='column'>
        <Text
          fontSize='16'
          fontWeight='medium'>
          {props.title}
        </Text>
        <Text fontSize='16'>{props.description}</Text>
      </Flex>
    </Flex>
  );
};
