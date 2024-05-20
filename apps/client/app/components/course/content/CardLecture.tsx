import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';

type TProps = {
  materialContent: string;
};

export const CardLecture: FC<TProps> = ({ materialContent }) => {
  return (
    <Text
      pt='2'
      fontSize='16'>
      {materialContent}
    </Text>
  );
};
