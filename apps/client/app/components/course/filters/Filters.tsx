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
import { useTypedSelector } from 'apps/client/app/lib/hooks/redux';
import { difficultyLevels } from '../../auth/config/constants';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';

type TProps = {
  handleCancelClick: () => void;
  selectedCategories: number[];
  setSelectedCategories: (category: number) => void;
  selectedLevels: number[];
  setSelectedLevels: (category: number) => void;
};

export const Filters: FC<TProps> = ({
  selectedCategories,
  selectedLevels,
  setSelectedCategories,
  setSelectedLevels,
  handleCancelClick,
}) => {
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');
  const { categories } = useTypedSelector((state) => state.categories);

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
                {categories.map((category, index) => (
                  <Checkbox
                    isChecked={selectedCategories.includes(category.id)}
                    onChange={() => setSelectedCategories(category.id)}
                    key={category.id}
                    value={category.id}
                    colorScheme='purple'>
                    {category.title}
                  </Checkbox>
                ))}
              </Stack>
              <Text
                fontSize='18'
                mb='10px'>
                Рівень складності
              </Text>
              <Stack direction='column'>
                {difficultyLevels.map((level, index) => (
                  <Checkbox
                    isChecked={selectedLevels.includes(index + 1)}
                    onChange={() => setSelectedLevels(index + 1)}
                    key={index + 1}
                    value={index + 1}
                    colorScheme='purple'>
                    {level}
                  </Checkbox>
                ))}
              </Stack>
            </PopoverBody>
            <PopoverFooter>
              <DefaultButton
                onClick={handleCancelClick}
                w={'fit-content'}>
                Скасувати
              </DefaultButton>
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
          Категорії
        </Text>
        <Stack
          direction='column'
          mb='20px'>
          {categories.map((category, index) => (
            <Checkbox
              isChecked={selectedCategories.includes(category.id)}
              onChange={() => setSelectedCategories(category.id)}
              key={category.id}
              value={category.id}
              colorScheme='purple'>
              {category.title}
            </Checkbox>
          ))}
        </Stack>
        <Text
          fontSize='24'
          fontWeight='bold'
          mb='10px'>
          Рівень складності
        </Text>
        <Stack
          direction='column'
          mb='20px'>
          {difficultyLevels.map((level, index) => (
            <Checkbox
              isChecked={selectedLevels.includes(index + 1)}
              onChange={() => setSelectedLevels(index + 1)}
              key={index + 1}
              value={index + 1}
              colorScheme='purple'>
              {level}
            </Checkbox>
          ))}
        </Stack>
        <DefaultButton
          onClick={handleCancelClick}
          w={'fit-content'}>
          Скасувати
        </DefaultButton>
      </Box>
    );
  }
};
