import { FC } from 'react';
import { Tag, TagLabel, TagCloseButton, HStack } from '@chakra-ui/react';

type TProps = {
  tagsText: string[];
};

export const FiltersList: FC<TProps> = ({ tagsText }) => {
  return (
    <HStack
      spacing='10px'
      mb='20px'>
      {tagsText.map((tagsText, index) => (
        <Tag
          key={index}
          size='lg'
          borderRadius='full'
          variant='solid'
          colorScheme='purple'>
          <TagLabel>{tagsText}</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </HStack>
  );
};
