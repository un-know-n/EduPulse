import React, { FC, useState } from 'react';
import {
  Flex,
  Text,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Button,
} from '@chakra-ui/react';

type TProps = {
  totalPoints: number;
  usedAttempts: number;
  totalAttempts: number;
};

type Question = {
  question: string;
  options: string[];
};

export const CardTest: FC<TProps> = ({
  totalPoints,
  usedAttempts,
  totalAttempts,
}) => {
  const [value, setValue] = useState<string>('1');

  const questions: Question[] = [
    {
      question:
        'Коли Python працює в інтерактивному режимі та відображає підказку з цими символами - що саме Python запитує вас?',
      options: ['Варіант 1', 'Варіант 2', 'Варіант 3'],
    },
    {
      question:
        'Коли Python працює в інтерактивному режимі та відображає підказку з цими символами - що саме Python запитує вас?',
      options: ['Варіант 1', 'Варіант 2', 'Варіант 3'],
    },
  ];

  return (
    <Stack>
      <Text
        mb='10px'
        fontSize='14'>
        Імовірні {totalPoints} балів
      </Text>
      {questions.map((question, index) => (
        <React.Fragment key={index}>
          <Text
            fontSize='16'
            fontWeight='medium'>
            {index + 1}. {question.question}
          </Text>
          {index === 0 ? (
            <Stack
              direction='column'
              mb='20px'>
              {question.options.map((option, idx) => (
                <Box
                  key={idx}
                  p='10px'
                  borderWidth='2px'
                  borderRadius='md'>
                  <Checkbox>{option}</Checkbox>
                </Box>
              ))}
            </Stack>
          ) : (
            <RadioGroup
              onChange={setValue}
              value={value}>
              <Stack
                direction='column'
                mb='20px'>
                {question.options.map((option, idx) => (
                  <Box
                    key={idx}
                    p='10px'
                    borderWidth='2px'
                    borderRadius='md'>
                    <Radio value={`${index}-${idx}`}>{option}</Radio>
                  </Box>
                ))}
              </Stack>
            </RadioGroup>
          )}
        </React.Fragment>
      ))}
      <Flex alignItems='center'>
        <Button
          bg='purple.600'
          color='white'
          _hover={{
            bg: 'purple.800',
            transitionDuration: '.4s',
          }}
          type='submit'
          variant='outline'>
          Відправити
        </Button>
        <Text
          ml='10px'
          fontSize={{ base: '14', md: '16' }}>
          Ви використали {usedAttempts} з {totalAttempts} спроб
        </Text>
      </Flex>
    </Stack>
  );
};
