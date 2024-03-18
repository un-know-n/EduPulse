import React, { FC } from 'react';
import { Box, Checkbox, Stack, Text, Button } from '@chakra-ui/react';

type TProps = {
  topicsText: string[];
  priceText: string[];
};

export const Filters: FC<TProps> = ({ topicsText, priceText }) => {
  return (
    <Box mr='25px'>
      <Text
        fontSize='24'
        fontWeight='medium'
        mb='20px'>
        ФІЛЬТРУВАТИ
      </Text>
      <Text
        fontSize='24'
        fontWeight='bold'
        mb='10px'>
        Теми
      </Text>
      <Stack
        direction='column'
        mb='20px'>
        {topicsText.map((text, index) => (
          <Checkbox
            key={index}
            colorScheme='purple'>
            {text}
          </Checkbox>
        ))}
      </Stack>
      <Text
        fontSize='24'
        fontWeight='bold'
        mb='10px'>
        Ціна
      </Text>
      <Stack
        direction='column'
        mb='20px'>
        {priceText.map((text, index) => (
          <Checkbox
            key={index}
            colorScheme='purple'>
            {text}
          </Checkbox>
        ))}
      </Stack>
      <Button
        bg='purple.600'
        color='white'
        _hover={{
          bg: 'purple.800',
          transitionDuration: '.4s',
        }}
        type='submit'
        variant='outline'>
        Скасувати
      </Button>
    </Box>
  );
};
