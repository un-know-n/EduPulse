import { FC } from 'react';
import { Tag, TagLabel, TagCloseButton, Badge, Flex } from '@chakra-ui/react';
import { TFiltersList } from '../search/Search';

type TProps = {
  filtersList: TFiltersList;
};

export const FiltersList: FC<TProps> = ({ filtersList }) => {
  return (
    <Flex
      display={'flex'}
      flexWrap={'wrap'}
      alignItems={'center'}
      minH={'35px'}
      gap='10px'
      mb='20px'>
      {!filtersList.length ? (
        <Badge colorScheme='purple'>Фільтри відсутні...</Badge>
      ) : (
        filtersList.map((listItem, index) => (
          <Tag
            key={`${listItem.title},${index}`}
            size='lg'
            borderRadius='full'
            variant='solid'
            colorScheme='purple'>
            <TagLabel>{listItem.title}</TagLabel>
            <TagCloseButton onClick={listItem.handler} />
          </Tag>
        ))
      )}
    </Flex>
  );
};
