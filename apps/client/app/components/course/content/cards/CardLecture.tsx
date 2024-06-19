import React, { FC } from 'react';
import { Heading, Text } from '@chakra-ui/react';

type TProps = {
  materialContent: string;
};

export const CardLecture: FC<TProps> = ({ materialContent }) => {
  return (
    <>
      <Heading
        size='18'
        textTransform='uppercase'>
        Лекція
      </Heading>
      <Text
        pt='2'
        fontSize='16'>
        {materialContent}
      </Text>
    </>
  );
};
