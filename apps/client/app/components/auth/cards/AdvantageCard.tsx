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
      backgroundColor={'#007AFF'}
      borderRadius='25px'
      w={'30px'}
      h={'30px'}>
      {props.icon}
    </Flex>
  );
};

export const AdvantageCard: FC<TProps> = (props) => {
  return (
    <Flex mb='30px'>
      <Box mr='20px'>
        <AdvantageIcon icon={props.icon} />
      </Box>
      <Flex flexDirection='column'>
        <Heading 
          fontSize='20px'>
          {props.title}
        </Heading>
        <Text 
          fontSize='16px'
          fontWeight='regular'>
          {props.description}
        </Text>
      </Flex>
    </Flex>
  );
};