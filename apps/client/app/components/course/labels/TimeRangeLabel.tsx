import React, { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { FaRegClock } from 'react-icons/fa6';

type TProps = {
  startDate: string;
  endDate: string;
};

export const TimeRangeLabel: FC<TProps> = ({ startDate, endDate }) => {
  return (
    <Flex align='center'>
      <FaRegClock size='20px' />
      <Text ml='10px'>
        {startDate} - {endDate}
      </Text>
    </Flex>
  );
};
