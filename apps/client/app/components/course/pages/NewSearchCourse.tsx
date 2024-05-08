import { FC } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Center,
  Text,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';
import { Header } from '../../shared/header/Header';
import NoCoursesFoundByParametersPoster from '../../shared/posters/NoCoursesFoundByParametersPoster';
import { TSearchParams, useSearch } from '../../../lib/hooks/useSearch';
import { CoursesList } from '../shared/list/CoursesList';
import { Filters } from '../../course/filters/Filters';
import { FiltersList } from '../../course/filters/FiltersList';

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

export const NewSearchCourse: FC = () => {
  const {
    isDisabledSearchButton,
    data,
    isLoading,
    currentSearchParams: searchParams,
    setCurrentSearchParams: setSearchParams,
    handleSearch,
  } = useSearch(initialSearchParams);

  return (
    <Header title={'Пошук курсів'}>
      <Center>
        <Flex
          direction='column'
          p='50px'
          gap='20px'
          maxWidth={1200}
          w={'full'}>
          <Box textAlign='center'>
            <Heading>Знайди свій найкращий курс!</Heading>
          </Box>
          <Flex alignItems='flex-end'>
            <InputGroup
              maxWidth='400px'
              mr='20px'>
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
            <DefaultButton
              w={'fit-content'}
              isDisabled={isDisabledSearchButton}
              onClick={handleSearch}>
              Пошук
            </DefaultButton>
          </Flex>
          <Flex>
            <Filters
              topicsText={[
                'IT',
                'Англійська мова',
                'Підготовка до ЗНО',
                'Суспільні науки',
              ]}
              priceText={['Безкоштовні', 'Платні']}
            />
            <Box>
              <FiltersList tagsText={['IT', 'Англійська мова']} />
              <Flex
                justifyContent='space-between'
                alignItems='center'>
                <Text
                  fontSize='24'
                  fontWeight='bold'>
                  Каталог курсів
                </Text>
                <Flex alignItems='center'>
                  <Text
                    fontSize='24'
                    fontWeight='medium'
                    mr='10px'>
                    Сортувати
                  </Text>
                  <Select
                    w='fit-content'
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
                </Flex>
              </Flex>
              <CoursesList
                isLoading={isLoading}
                poster={<NoCoursesFoundByParametersPoster />}
                courses={data}
              />
            </Box>
          </Flex>
        </Flex>
      </Center>
    </Header>
  );
};