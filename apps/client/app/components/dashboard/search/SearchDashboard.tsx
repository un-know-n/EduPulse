import {
  useMediaQuery,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Box,
  Center,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { TSearchParams, useSearch } from 'apps/client/app/lib/hooks/useSearch';
import { FC, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';
import { CoursesList } from '../../course/shared/list/CoursesList';
import NoCoursesFoundByParametersPoster from '../../shared/posters/NoCoursesFoundByParametersPoster';
import { MdLibraryBooks } from 'react-icons/md';
import { GiGraduateCap } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

const initialSearchParams: TSearchParams = {
  orderBy: 'asc',
  categoryIds: [],
  difficultyLevels: [],
  limit: 6,
  page: 1,
  title: '',
};

const orderDictionary = [
  {
    order: 'desc',
    title: 'Нові спочатку',
  },
  {
    order: 'asc',
    title: 'Старі спочатку',
  },
];

export const SearchDashboard: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const {
    isDisabledSearchButton,
    data,
    isLoading,
    currentSearchParams,
    setCurrentSearchParams,
    handleSearch,
  } = useSearch(initialSearchParams);

  //TODO: Awful logic. Refactor as fast as possible
  useEffect(() => {
    // setCurrentSearchParams((prev) => ({
    //   ...prev,
    //   isCreated: tabIndex === 1,
    // }));
    if (tabIndex !== 2) handleSearch(tabIndex === 1);
    // console.log('TAB INDEX: ', tabIndex);
  }, [tabIndex]);

  return (
    <Flex
      direction='column'
      p={{ base: '15px', md: '50px' }}
      gap='15px'
      maxWidth={1600}
      w={'full'}>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent='space-between'
        alignItems='center'>
        <Flex mb={{ base: 3, lg: 0 }}>
          <InputGroup
            maxWidth='400px'
            mr='20px'>
            <InputLeftElement pointerEvents='none'>
              <FiSearch color='gray' />
            </InputLeftElement>
            <Input
              placeholder='Назва курсу'
              value={currentSearchParams.title}
              onChange={(event) =>
                setCurrentSearchParams((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
          </InputGroup>
          <DefaultButton
            w={'fit-content'}
            isDisabled={isDisabledSearchButton}
            onClick={() => handleSearch(tabIndex === 1)}>
            Пошук
          </DefaultButton>
        </Flex>

        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={'center'}>
          <Tabs
            variant='soft-rounded'
            colorScheme='purple'
            gap={3}
            mr={{ base: 0, md: 3 }}
            mb={{ base: 3, md: 0 }}
            onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>
                <MdLibraryBooks />
                <Text ml={3}>Активні</Text>
              </Tab>
              <Tab>
                <GiGraduateCap />
                <Text ml={3}>Створені</Text>{' '}
              </Tab>
              <Tab>
                <FaStar />
                <Text ml={3}>Обрані</Text>
              </Tab>
            </TabList>
          </Tabs>
          <Select
            w='fit-content'
            value={currentSearchParams.orderBy}
            onChange={(event) =>
              setCurrentSearchParams((prev) => ({
                ...prev,
                orderBy: event.target.value as TSearchParams['orderBy'],
              }))
            }>
            {orderDictionary.map((orderBy) => (
              <option
                key={orderBy.order}
                value={orderBy.order}>
                {orderBy.title}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      {tabIndex === 2 ? (
        <NoCoursesFoundByParametersPoster />
      ) : (
        <CoursesList
          isLoading={isLoading}
          poster={<NoCoursesFoundByParametersPoster />}
          courses={data?.data}
        />
      )}
    </Flex>
  );
};
