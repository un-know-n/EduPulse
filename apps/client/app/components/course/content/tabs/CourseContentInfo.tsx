import React, { FC, useEffect, useState } from 'react';
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
import { CardLayout } from '../cards/CardLayout';
import { CardLecture } from '../cards/CardLecture';
import { CardTest } from '../cards/CardTest';
import { CardVideo } from '../cards/CardVideo';
import { CardsProgress } from './CardsProgress';
import { ProgressDates } from './ProgressDates';
import { TSection } from '../list/ContentMaterialList';
import useSyncQueryParams from 'apps/client/app/lib/hooks/useSyncQueryParams';
import { useSearchParams } from 'next/navigation';
import { coursePrefix } from 'apps/client/app/config/routing/routes';
import NextLink from 'next/link';
import useMaterialsSlider from 'apps/client/app/lib/hooks/useMaterialsSlider';
import { MaterialIcon } from '../../shared/icons/MaterialIcon';
import { useLazyGetCourseMaterialByIdQuery } from 'apps/client/app/store/services/courses';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import Loading from 'apps/client/app/loading';
import {
  TLectureResponse,
  TTestMaterial,
  TTestResponse,
} from '../../@types/course';
import { useMaterials } from 'apps/client/app/lib/hooks/useMaterials';

type TProps = {
  courseTitle: string;
  courseId: string;
  sections: TSection[];
};

type TDateSteps = {
  date: string;
  description: string;
};

const dateSteps: TDateSteps = [
  { date: 'ср, 28 лют. 2024 р.', description: 'Курс розпочато' },
  { date: 'чт, 29 лют. 2024 р.', description: 'Модуль 1 завершено' },
  { date: 'пт, 1 бер. 2024 р.', description: 'Модуль 2 завершено' },
  { date: 'пт, 1 бер. 2024 р.', description: 'Курс закінчено' },
];

export const CourseContentInfo: FC<TProps> = ({
  sections,
  courseId,
  courseTitle,
}) => {
  const {
    currentMaterials,
    next,
    prev,
    selectedMaterial,
    selectedSection,
    setMaterialIndex,
  } = useMaterials({ sections });
  // const searchParamsURL = useSearchParams();
  // const { queryParams, handleChange } = useSyncQueryParams({
  //   sectionId: searchParamsURL.get('sectionId') ?? sections[0].id,
  //   materialId:
  //     searchParamsURL.get('materialId') ?? sections[0].materials[0].id,
  // });

  // const {
  //   currentMaterials,
  //   next,
  //   prev,
  //   selectedMaterial,
  //   selectedSection,
  //   setMaterialIndex,
  // } = useMaterialsSlider(sections, queryParams.materialId);

  const [getCourseMaterialById, { data, error }] =
    useLazyGetCourseMaterialByIdQuery();
  useShowError(error, true, `${coursePrefix}/${courseId}`);

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length,
  // });

  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    getCourseMaterialById({
      courseId,
      materialId: selectedMaterial.id,
      sectionId: selectedSection.id,
      type: selectedMaterial.type === 'TEST' ? 'TEST' : 'LECTURE',
    });
  }, [selectedMaterial.id, selectedSection.id]);

  return (
    <Box
      pt={{ base: '10px', md: '20px' }}
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
                    as={NextLink}
                    href={`${coursePrefix}/${courseId}`}
                    fontWeight='medium'>
                    {courseTitle}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href='#'>
                    {selectedSection.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href='#'>
                    {selectedMaterial.title}
                  </BreadcrumbLink>
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
                onClick={prev}
                icon={<FaChevronLeft />}
              />
              <Flex
                alignItems='center'
                flex='1'
                gap='10px'>
                {currentMaterials.map(({ material, materialIndex }) => (
                  <IconButton
                    onClick={() => setMaterialIndex(materialIndex)}
                    key={material.id}
                    colorScheme={
                      material.id === selectedMaterial.id ? 'gray' : 'purple'
                    }
                    isDisabled={material.id === selectedMaterial.id}
                    aria-label='Select material'
                    size='lg'
                    icon={<MaterialIcon type={material.type} />}
                    width='100%'
                  />
                ))}
              </Flex>
              <IconButton
                colorScheme='purple'
                aria-label='Done'
                size='md'
                onClick={next}
                icon={<FaChevronRight />}
              />
            </Flex>
            <Stack spacing='20px'>
              {data ? (
                <CardLayout
                  title={data.material.title}
                  type={data.type}>
                  {data.type === 'LECTURE' ? (
                    <CardLecture
                      materialContent={
                        (data.material as TLectureResponse).content ?? ''
                      }
                    />
                  ) : data.type === 'VIDEO' ? (
                    <CardVideo
                      materialContent={
                        (data.material as TLectureResponse).content ?? ''
                      }
                      videoURL={
                        (data.material as TLectureResponse).videoUrl ?? ''
                      }
                    />
                  ) : (
                    <CardTest test={data.material as TTestMaterial} />
                  )}
                </CardLayout>
              ) : (
                <Loading />
              )}
              <Box
                display='flex'
                justifyContent='flex-end'
                alignItems='center'
                gap='10px'>
                <IconButton
                  colorScheme='purple'
                  aria-label='Done'
                  size='md'
                  onClick={prev}
                  icon={<FaChevronLeft />}
                />
                <IconButton
                  colorScheme='purple'
                  aria-label='Done'
                  size='md'
                  onClick={next}
                  icon={<FaChevronRight />}
                />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Heading mb='20px'>Ваш прогрес</Heading>
            <CardsProgress courseId={courseId} />
          </TabPanel>
          <TabPanel>
            <Heading mb='20px'>Важливі дати</Heading>
            <ProgressDates
              courseId={courseId}
              // moduleName={['Модуль 1', 'Модуль 2']}
              // date={[
              //   'ср. 28 лют. 2024 р.',
              //   'чт. 29 лют. 2024 р.',
              //   'пт. 1 бер. 2024 р.',
              //   'пт. 1 бер. 2024 р.',
              // ]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
