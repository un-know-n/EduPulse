import { FC, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';
import { Header } from '../../shared/header/Header';
import { useLazyGetCoursesQuery } from '../../../store/services/courses';
import { useAreObjectsEqual } from '../../../lib/hooks/useAreObjectsEqual';
import { useShowError } from '../../../lib/hooks/useShowError';
import NoCoursesFoundByParametersPoster from '../../shared/posters/NoCoursesFoundByParametersPoster';
import Loading from '../../../loading';
import { CourseCard } from '../cards/CourseCard';

type TSearchParams = { searchString?: string; orderBy?: 'asc' | 'desc' };
const initialSearchParams: TSearchParams = { orderBy: 'asc', searchString: '' };

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

export const SearchCourse: FC = () => {
  const [getCoursesByParams, { data, isLoading, error }] =
    useLazyGetCoursesQuery({});
  const [searchParams, setSearchParams] =
    useState<TSearchParams>(initialSearchParams);
  useShowError(error);

  const checkObjectsEquality = useAreObjectsEqual(initialSearchParams);

  const handleSearch = () => {
    const noChange = checkObjectsEquality(searchParams);
    if (!noChange) {
      getCoursesByParams({ ...searchParams });
    }
  };

  useEffect(() => {
    getCoursesByParams({ ...searchParams });
  }, []);

  return (
    <Header title={'Пошук курсів'}>
      <Box
        justifyContent='center'
        alignItems='center'>
        <Flex
          px='10px'
          mt='2rem'
          justifyContent='center'
          alignItems='center'>
          <Heading textAlign='center'>Знайди свій найкращий курс!</Heading>
        </Flex>

        <Flex
          px='10px'
          mt='2rem'
          flexWrap='wrap'
          justifyContent='center'
          alignItems='center'
          gap={15}>
          <InputGroup maxWidth='400px'>
            <InputLeftElement pointerEvents='none'>
              <FiSearch color='gray' />
            </InputLeftElement>
            <Input
              placeholder='Назва курсу'
              value={searchParams.searchString}
              onChange={(event) =>
                setSearchParams((prev) => ({
                  ...prev,
                  searchString: event.target.value,
                }))
              }
            />
          </InputGroup>
          <Select
            w={'fit-content'}
            value={searchParams.orderBy}
            onChange={(event) =>
              setSearchParams((prev) => ({
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
          <DefaultButton
            w={'fit-content'}
            onClick={handleSearch}>
            Пошук
          </DefaultButton>
        </Flex>
      </Box>
      <Flex
        alignItems='center'
        justifyContent='center'
        w={'full'}
        mt={5}
        px='10px'>
        {isLoading ? (
          <Loading />
        ) : data?.length ? (
          <Grid
            templateColumns='repeat(3, 1fr)'
            gap={5}>
            {data.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                author={course.user.name}
                progress={
                  course.UsersAssignedToCourse?.[0]?.isCompleted ? 100 : 0
                }
                enrollment={course.UsersAssignedToCourse?.[0]}
              />
            ))}
          </Grid>
        ) : (
          <NoCoursesFoundByParametersPoster />
        )}
      </Flex>
    </Header>
  );
};
