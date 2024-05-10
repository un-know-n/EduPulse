import React, { FC, useState } from 'react';
import {
  Text,
  Box,
  Stack,
  Heading,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  CardFooter,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  useColorMode,
  VStack,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { GoAlertFill } from 'react-icons/go';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
type TProps = {
  progressValue: number;
  progressValueMin: number;
  moduleName: string;
  materialName: string;
  totalPoints: number;
  points: number;
};

export const CardsProgress: FC<TProps> = ({
  progressValue,
  progressValueMin,
  moduleName,
  materialName,
  totalPoints,
  points,
}) => {
  const [setProgressValue] = useState(progressValue);
  const [setProgressValueMin] = useState(progressValueMin);
  const [showTooltip, setShowTooltip] = useState(false);
  const { colorMode } = useColorMode();

  const circularSize = useBreakpointValue({ base: '120px', md: '220px' });
  const iconSize = useBreakpointValue({ base: '40px', md: '20px' });

  return (
    <Stack spacing='20px'>
      <Card>
        <CardBody
          display='flex'
          justifyContent='space-between'>
          <Box w={{ base: '60%', md: '70%' }}>
            <Heading size={{ base: 'sm', md: 'md' }}>Завершення курсу</Heading>
            <Text pt='2'>Це означає, яку частину змісту курсу ви пройшли.</Text>
          </Box>
          <Box>
            <CircularProgress
              size={circularSize}
              value={progressValue}
              color='purple.500'>
              <CircularProgressLabel color='purple.500'>
                {progressValue}%
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
        </CardBody>
      </Card>
      <Card>
        <CardBody
          display={{ base: 'block', md: 'flex' }}
          justifyContent='space-between'
          alignItems='center'>
          <Box
            w={{ base: '100%', md: '40%' }}
            mb={{ base: '50px', md: '0' }}>
            <Heading size='md'>Успішність проходження</Heading>
            <Text pt='2'>
              Це відповідає вашій зваженій оцінці порівняно з оцінкою,
              необхідною для проходження цього курсу.
            </Text>
          </Box>
          <Box
            mx='auto'
            position='relative'
            w={{ base: '90%', md: '50%' }}
            mb={{ base: '35px', md: '0' }}>
            <Tooltip label='Поточна оцінка'>
              <Box
                bg='purple.500'
                position='absolute'
                bottom='20px'
                borderRadius='md'
                px='8px'
                py='4px'
                boxShadow='md'
                left={`${progressValue}%`}
                transform='translateX(-50%)'
                color='white'>
                {progressValue}%
                <Box
                  w='8px'
                  h='8px'
                  bg='purple.500'
                  position='absolute'
                  bottom='-4px'
                  left='50%'
                  transform='translateX(-50%) rotate(45deg)'
                />
              </Box>
            </Tooltip>
            <Progress
              value={progressValue}
              borderRadius='20px'
              colorScheme='purple'
            />
            <Tooltip label='Мінімальна оцінка'>
              <Box
                bg='cyan.700'
                position='absolute'
                left={`${progressValueMin}%`}
                transform='translateX(-50%)'
                top='20px'
                px='8px'
                py='4px'
                borderRadius='md'
                boxShadow='md'
                color='white'>
                {progressValueMin}%
                <Box
                  w='8px'
                  h='8px'
                  bg='cyan.700'
                  position='absolute'
                  top='-4px'
                  left='50%'
                  transform='translateX(-50%) rotate(45deg)'
                />
              </Box>
            </Tooltip>
          </Box>
        </CardBody>
        <CardFooter
          bg={
            colorMode === 'light'
              ? progressValue >= progressValueMin
                ? 'green.100'
                : 'yellow.100'
              : progressValue >= progressValueMin
              ? 'green.200'
              : 'orange.200'
          }
          borderBottomRadius='md'
          display='flex'
          alignItems='center'>
          {progressValue >= progressValueMin ? (
            <IoCheckmarkCircleSharp
              color='#2F855A'
              size={iconSize}
            />
          ) : (
            <GoAlertFill
              color='#C05621'
              size={iconSize}
            />
          )}
          <Text
            ml='4'
            color='#1D2734'
            fontWeight='bold'>
            {progressValue >= progressValueMin
              ? `Ви пройшли мінімальні ${progressValueMin}% даного курсу!`
              : `Для проходження даного курсу необхідна оцінка ${progressValueMin}%!`}
          </Text>
        </CardFooter>
      </Card>
      <Card>
        <CardBody>
          <Box>
            <Heading
              size='md'
              mb='10px'>
              Підведення підсумків
            </Heading>
            <TableContainer
              borderRadius='md'
              boxShadow='xl'
              mb='20px'
              w='full'>
              <Table>
                <Thead bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}>
                  <Tr>
                    <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                      Тип матеріалу
                    </Th>
                    <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                      Всього
                    </Th>
                    <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                      Мінімум
                    </Th>
                    <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                      Оцінка
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Тест</Td>
                    <Td>100%</Td>
                    <Td>{progressValueMin}%</Td>
                    <Td>{progressValue}%</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Підсумок оцінки</Th>
                    <Th>{''}</Th>
                    <Th>{''}</Th>
                    <Th>{progressValue}%</Th>
                  </Tr>
                  <Tr>
                    <Th>Погрішність</Th>
                    <Th>{''}</Th>
                    <Th>{''}</Th>
                    <Th>{100 - progressValue}%</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            <Heading
              size='md'
              mb='10px'>
              Детальні оцінки
            </Heading>
            <VStack spacing='15px'>
              <TableContainer
                borderRadius='md'
                boxShadow='md'
                w='full'>
                <Table size='sm'>
                  <Thead bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}>
                    <Tr>
                      <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                        {moduleName}
                      </Th>
                      <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                        Бал
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Link
                          href='#'
                          color={
                            colorMode === 'light' ? 'purple.600' : 'purple.300'
                          }>
                          {materialName}
                        </Link>
                      </Td>
                      <Td>
                        {points}/{totalPoints}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <TableContainer
                borderRadius='md'
                boxShadow='md'
                w='full'>
                <Table size='sm'>
                  <Thead bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}>
                    <Tr>
                      <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                        {moduleName}
                      </Th>
                      <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                        Бал
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Link
                          href='#'
                          color={
                            colorMode === 'light' ? 'purple.600' : 'purple.300'
                          }>
                          {materialName}
                        </Link>
                      </Td>
                      <Td>
                        {points}/{totalPoints}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Stack>
  );
};
