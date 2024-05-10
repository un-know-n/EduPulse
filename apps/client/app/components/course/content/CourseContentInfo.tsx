import React, { FC, useState } from 'react';
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
  Box,
  Stack,
  Heading,
  useSteps,
  useMediaQuery,
} from '@chakra-ui/react';
import { MdChevronRight } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';
import { IoIosBookmarks } from 'react-icons/io';
import { HiPencilAlt } from 'react-icons/hi';
import { CardLayout } from './CardLayout';
import { CardLecture } from './CardLecture';
import { CardTest } from './CardTest';
import { CardVideo } from './CardVideo';
import { CardsProgress } from './CardsProgress';
import { ProgressDates } from './ProgressDates';

type TProps = {
  courseName: string;
  moduleName: string;
  materialName: string;
};

const steps = [
  { title: 'ср, 28 лют. 2024 р.', description: 'Курс розпочато' },
  { title: 'чт, 29 лют. 2024 р.', description: 'Модуль 1 завершено' },
  { title: 'пт, 1 бер. 2024 р.', description: 'Модуль 2 завершено' },
  { title: 'пт, 1 бер. 2024 р.', description: 'Курс закінчено' },
];

export const CourseContentInfo: FC<TProps> = ({
  courseName,
  moduleName,
  materialName,
}) => {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      p={{ base: '10px', md: '20px' }}
      maxWidth={1200}
      w={'full'}>
      <Tabs colorScheme='purple'>
        <TabList>
          <Tab fontWeight='bold'>Курс</Tab>
          <Tab fontWeight='bold'>Прогрес</Tab>
          <Tab fontWeight='bold'>Дати</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {!isSmallScreen && (
              <Breadcrumb
                mb='20px'
                separator={<MdChevronRight color='gray.500' />}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href='#'
                    fontWeight='medium'>
                    {courseName}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href='#'>{moduleName}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href='#'>{materialName}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            )}
            <Flex
              mb='20px'
              gap='15px'
              justifyContent='space-between'
              alignItems='center'>
              <IconButton
                colorScheme='purple'
                aria-label='Done'
                size='md'
                icon={<FaChevronLeft />}
              />
              <Flex
                alignItems='center'
                flex='1'
                gap='10px'>
                <IconButton
                  colorScheme='teal'
                  aria-label='Call Segun'
                  size='lg'
                  icon={<FaVideo />}
                  width='100%'
                />
                <IconButton
                  colorScheme='teal'
                  aria-label='Call Segun'
                  size='lg'
                  icon={<IoIosBookmarks />}
                  width='100%'
                />
                <IconButton
                  colorScheme='teal'
                  aria-label='Call Segun'
                  size='lg'
                  icon={<HiPencilAlt />}
                  width='100%'
                />
              </Flex>
              <IconButton
                colorScheme='purple'
                aria-label='Done'
                size='md'
                icon={<FaChevronRight />}
              />
            </Flex>
            <Stack spacing='20px'>
              <CardLayout
                materialName={materialName}
                materialType='лекція'>
                <CardLecture materialContent='Контент лекції' />
              </CardLayout>
              <CardLayout
                materialName={materialName}
                materialType='тест'>
                <CardTest
                  totalPoints={10}
                  usedAttempts={0}
                  totalAttempts={2}
                />
              </CardLayout>
              <CardLayout
                materialName={materialName}
                materialType='відео'>
                <CardVideo
                  videoURL='https://www.youtube.com/embed/n28xgaiXy8g'
                  materialContent='Бодряк кліп'
                />
              </CardLayout>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Heading mb='20px'>Ваш прогрес</Heading>
            <CardsProgress
              progressValue={60}
              progressValueMin={60}
              moduleName='Назва модуля буде'
              materialName='Тест 1'
              totalPoints={10}
              points={6}
            />
          </TabPanel>
          <TabPanel>
            <Heading mb='20px'>Важливі дати</Heading>
            <ProgressDates
              moduleName={['Модуль 1', 'Модуль 2']}
              date={[
                'ср. 28 лют. 2024 р.',
                'чт. 29 лют. 2024 р.',
                'пт. 1 бер. 2024 р.',
                'пт. 1 бер. 2024 р.',
              ]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
