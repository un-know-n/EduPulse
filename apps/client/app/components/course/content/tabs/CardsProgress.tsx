import React, { FC, Fragment, useState } from 'react';
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
import { useGetCourseStatisticsQuery } from 'apps/client/app/store/services/courses';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import { coursePrefix } from 'apps/client/app/config/routing/routes';
import Loading from 'apps/client/app/loading';

type TProps = {
  courseId: string;
};

export const CardsProgress: FC<TProps> = ({ courseId }) => {
  const { data, error } = useGetCourseStatisticsQuery(courseId);
  useShowError(error, true, `${coursePrefix}/${courseId}`);

  const { colorMode } = useColorMode();

  const circularSize = useBreakpointValue({ base: '120px', md: '220px' });
  const iconSize = useBreakpointValue({ base: '40px', md: '20px' });

  return (
    <>
      {data ? (
        <Stack spacing='20px'>
          <Card>
            <CardBody
              display='flex'
              justifyContent='space-between'>
              <Box w={{ base: '60%', md: '70%' }}>
                <Heading size={{ base: 'sm', md: 'md' }}>
                  Завершення курсу
                </Heading>
                <Text pt='2'>
                  Цей показник відповідає за середньоарифметичну оцінку всіх
                  пройдених Вами тестів у відсотках
                </Text>
              </Box>
              <Box>
                <CircularProgress
                  size={circularSize}
                  value={data.currentCourseProgress}
                  color='purple.500'>
                  <CircularProgressLabel color='purple.500'>
                    {data.currentCourseProgress}%
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
                  Ваш процент проходження тесту, порівняно з мінімально
                  необхідним для проходження цього курсу.
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
                    left={`${data.currentCourseProgress}%`}
                    transform='translateX(-50%)'
                    color='white'>
                    {data.currentCourseProgress}%
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
                  value={data.currentCourseProgress}
                  borderRadius='20px'
                  colorScheme='purple'
                />
                <Tooltip label='Мінімальна оцінка'>
                  <Box
                    bg='cyan.700'
                    position='absolute'
                    left={`${data.minimalCourseProgress}%`}
                    transform='translateX(-50%)'
                    top='20px'
                    px='8px'
                    py='4px'
                    borderRadius='md'
                    boxShadow='md'
                    color='white'>
                    {data.minimalCourseProgress}%
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
                  ? data.currentCourseProgress >= data.minimalCourseProgress
                    ? 'green.100'
                    : 'yellow.100'
                  : data.currentCourseProgress >= data.minimalCourseProgress
                  ? 'green.200'
                  : 'orange.200'
              }
              borderBottomRadius='md'
              display='flex'
              alignItems='center'>
              {data.currentCourseProgress >= data.minimalCourseProgress ? (
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
                {data.currentCourseProgress >= data.minimalCourseProgress
                  ? `Ви пройшли мінімальні ${data.minimalCourseProgress}% даного курсу!`
                  : `Для проходження даного курсу необхідно набрати ${data.minimalCourseProgress}%!`}
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
                          Назва модуля
                        </Th>
                        <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                          {'(Пройдено/Всього) тестувань'}
                        </Th>
                        <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                          {'(Отримано/Всього) балів'}
                        </Th>
                        <Th color={colorMode === 'light' ? '#1D2734' : 'white'}>
                          {'Оцінка(у %)'}
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.sectionsDetails.map((details) => (
                        <Tr key={details.sectionTitle}>
                          <Td>{details.sectionTitle}</Td>
                          <Td>
                            {details.passedTests}/{details.totalTests}
                          </Td>
                          <Td>
                            {details.receivedPoints}/{details.totalPoints}
                          </Td>
                          <Td>{details.progressInPercents.toFixed(2)}%</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Підсумок оцінки</Th>
                        <Th>{''}</Th>
                        <Th>{''}</Th>
                        <Th>{data.currentCourseProgress}%</Th>
                      </Tr>
                      <Tr>
                        <Th>Погрішність</Th>
                        <Th>{''}</Th>
                        <Th>{''}</Th>
                        <Th>{100 - data.currentCourseProgress}%</Th>
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
                  {data.detailedEvaluations.map((evaluation) => (
                    <Fragment key={evaluation.sectionId}>
                      {evaluation.tests.length ? (
                        <TableContainer
                          key={evaluation.sectionId}
                          borderRadius='md'
                          boxShadow='md'
                          w='full'>
                          <Table size='sm'>
                            <Thead
                              bg={
                                colorMode === 'light' ? 'gray.100' : 'gray.600'
                              }>
                              <Tr>
                                <Th
                                  w='80%'
                                  color={
                                    colorMode === 'light' ? '#1D2734' : 'white'
                                  }>
                                  {evaluation.sectionTitle}
                                </Th>
                                <Th
                                  w='20%'
                                  color={
                                    colorMode === 'light' ? '#1D2734' : 'white'
                                  }>
                                  Бал
                                </Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {evaluation.tests.map((test) => (
                                <Tr key={test.id}>
                                  <Td w='80%'>
                                    <Link
                                      href={`${coursePrefix}/${courseId}/content?sectionId=${evaluation.sectionId}&materialId=${test.id}`}
                                      color={
                                        colorMode === 'light'
                                          ? 'purple.600'
                                          : 'purple.300'
                                      }>
                                      {test.title}
                                    </Link>
                                  </Td>
                                  <Td w='20%'>
                                    {test?.receivedPoints ?? 0}/
                                    {test?.totalPoints ?? 0}
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      ) : null}
                    </Fragment>
                  ))}
                </VStack>
              </Box>
            </CardBody>
          </Card>
        </Stack>
      ) : (
        <Loading />
      )}
    </>
  );
};
