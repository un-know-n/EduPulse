import React, { FC } from 'react';
import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { FaRegClock } from 'react-icons/fa6';

type TProps = {
  startDate: string;
  endDate: string;
};

export const TimeRangeLabel: FC<TProps> = ({ startDate, endDate }) => {
  const iconSize = useBreakpointValue({ base: '15px', md: '20px' });

  return (
    <Flex align='center'>
      <FaRegClock size={iconSize} />
      <Text ml='10px'>
        {startDate} - {endDate}
      </Text>
    </Flex>
  );
};
