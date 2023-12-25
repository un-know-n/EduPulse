import { FC } from 'react';
import { TLectureResponse } from '../../@types/course';
import { Flex, Text } from '@chakra-ui/react';
import { UpdateLectureButton } from '../buttons/UpdateLectureButton';

export const LectureItem: FC<
  TLectureResponse & { bgColor?: string; index: string | number }
> = ({ title, id, content, sectionId, index, bgColor }) => {
  return (
    <Flex
      w={'full'}
      bgColor={bgColor}
      borderRadius={8}
      flexDirection={'column'}
      alignItems={'flex-start'}
      px={3}
      py={2}>
      <Flex
        w={'full'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text>
          {index}. {title}
        </Text>
        <UpdateLectureButton
          content={content}
          sectionId={sectionId}
          title={title}
          id={id}
        />
      </Flex>

      <Text>{content}</Text>
    </Flex>
  );
};
