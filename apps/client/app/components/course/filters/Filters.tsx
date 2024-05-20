import React, { FC } from 'react';
import {
  Box,
  Checkbox,
  Stack,
  Text,
  Button,
  useMediaQuery,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react';

type TProps = {
  topicsText: string[];
  priceText: string[];
};

export const Filters: FC<TProps> = ({ topicsText, priceText }) => {
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  if (isSmallScreen) {
    return (
      <Box>
        <Popover>
          <PopoverTrigger>
            <Button>Фільтрувати</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <Text
                fontSize='20'
                fontWeight='medium'>
                ФІЛЬТРИ
              </Text>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Text
                fontSize='18'
                mb='10px'>
                Категорії
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
                fontSize='18'
                mb='10px'>
                Рівень складності
              </Text>
              <Stack direction='column'>
                {priceText.map((text, index) => (
                  <Checkbox
                    key={index}
                    colorScheme='purple'>
                    {text}
                  </Checkbox>
                ))}
              </Stack>
            </PopoverBody>
            <PopoverFooter>
              <Button
                w='full'
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
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
    );
  } else {
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
  }
};
