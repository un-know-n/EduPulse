import {
  useMediaQuery,
  Center,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Box,
  Text,
} from '@chakra-ui/react';
import { TSearchParams, useSearch } from 'apps/client/app/lib/hooks/useSearch';

import { FC, useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';

import NoCoursesFoundByParametersPoster from '../../shared/posters/NoCoursesFoundByParametersPoster';
import { Filters } from '../filters/Filters';
import { FiltersList } from '../filters/FiltersList';
import { CoursesList } from '../shared/list/CoursesList';
import { useTypedSelector } from 'apps/client/app/lib/hooks/redux';
import { difficultyLevels } from '../../auth/config/constants';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { levelsDictionary } from '../labels/DifficultyLabel';

export type TFiltersList = { title: string; handler: () => void }[];

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

export const Search: FC = () => {
  const searchParamsURL = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { categories } = useTypedSelector((state) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    (searchParamsURL.get('categoryIds') ?? '')
      .split(',')
      .map(Number)
      .filter((categoryId) => categoryId > 0) || [],
  );
  const [selectedLevels, setSelectedLevels] = useState<number[]>(
    (searchParamsURL.get('difficultyLevels') ?? '')
      .split(',')
      .map(Number)
      .filter((level) => level > 0) || [],
  );

  const initialSearchParams: TSearchParams = {
    orderBy:
      (searchParamsURL.get('orderBy') as TSearchParams['orderBy']) || 'asc',
    categoryIds: selectedCategories,
    difficultyLevels: selectedLevels,
    limit: Number(searchParamsURL.get('limit') ?? 0) || 6,
    page: Number(searchParamsURL.get('page') ?? 0) || 1,
    title: searchParamsURL.get('title') || '',
  };

  const {
    isDisabledSearchButton,
    data,
    isLoading,
    currentSearchParams,
    setCurrentSearchParams,
    handleSearch,
  } = useSearch(initialSearchParams);

  const handleSearchClick = () => {
    setCurrentSearchParams((prev) => ({
      ...prev,
      categoryIds: selectedCategories,
      difficultyLevels: selectedLevels,
    }));

    handleSearch();

    const params = new URLSearchParams(searchParamsURL);

    //Synchronize URL when click search
    Object.entries(currentSearchParams).map((searchParamEntry) =>
      params.set(searchParamEntry[0], `${searchParamEntry[1] ?? ''}`),
    );
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCheckboxChange = (
    item: number,
    listType: 'categories' | 'difficulties',
  ) => {
    if (listType === 'categories') {
      setSelectedCategories((prevSelectedCategories) => {
        if (prevSelectedCategories.includes(item)) {
          return prevSelectedCategories.filter((category) => category !== item);
        } else {
          return [...prevSelectedCategories, item];
        }
      });
    } else if (listType === 'difficulties') {
      setSelectedLevels((prevSelectedDifficulties) => {
        if (prevSelectedDifficulties.includes(item)) {
          return prevSelectedDifficulties.filter(
            (difficulty) => difficulty !== item,
          );
        } else {
          return [...prevSelectedDifficulties, item];
        }
      });
    }
  };

  const handleCancelButton = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const filtersList: TFiltersList = useMemo(() => {
    return [
      ...selectedCategories.map((selectedCategory) => ({
        title:
          categories.find((category) => category.id === selectedCategory)
            ?.title || '',
        handler: () => handleCheckboxChange(selectedCategory, 'categories'),
      })),
      ...selectedLevels.map((selectedLevel) => ({
        title: difficultyLevels[selectedLevel - 1],
        handler: () => handleCheckboxChange(selectedLevel, 'difficulties'),
      })),
    ];
  }, [selectedCategories, selectedLevels]);

  useEffect(() => {
    console.log('INITIAL SEARCH PARAMS: ', initialSearchParams);
  }, []);

  useEffect(() => {
    setCurrentSearchParams((prev) => ({
      ...prev,
      categoryIds: selectedCategories,
      difficultyLevels: selectedLevels,
    }));
  }, [selectedCategories.length, selectedLevels.length]);

  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      direction='column'
      p={{ base: '15px', md: '50px' }}
      gap='15px'
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
          onClick={handleSearchClick}>
          Пошук
        </DefaultButton>
      </Flex>
      {isSmallScreen ? (
        <Flex direction='column'>
          <Flex
            justifyContent={'space-between'}
            gap='10px'
            mb='20px'>
            <Filters
              handleCancelClick={handleCancelButton}
              selectedCategories={selectedCategories}
              selectedLevels={selectedLevels}
              setSelectedCategories={(category: number) =>
                handleCheckboxChange(category, 'categories')
              }
              setSelectedLevels={(level: number) =>
                handleCheckboxChange(level, 'difficulties')
              }
            />
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
          <Text
            fontSize='20'
            fontWeight='bold'>
            Каталог курсів
          </Text>
          <CoursesList
            isLoading={isLoading}
            poster={<NoCoursesFoundByParametersPoster />}
            courses={data?.data}
          />
        </Flex>
      ) : (
        <Flex>
          <Filters
            handleCancelClick={handleCancelButton}
            selectedCategories={selectedCategories}
            selectedLevels={selectedLevels}
            setSelectedCategories={(category: number) =>
              handleCheckboxChange(category, 'categories')
            }
            setSelectedLevels={(level: number) =>
              handleCheckboxChange(level, 'difficulties')
            }
          />
          <Box w='full'>
            <FiltersList filtersList={filtersList} />
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
            <CoursesList
              isLoading={isLoading}
              poster={<NoCoursesFoundByParametersPoster />}
              courses={data?.data}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
