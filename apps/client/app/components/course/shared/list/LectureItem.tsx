import { FC } from 'react';
import { TLectureResponse } from '../../@types/course';
import { Flex, Text, Box } from '@chakra-ui/react';
import { UpdateLectureButton } from '../buttons/UpdateLectureButton';
import { DeleteLectureButton } from '../buttons/DeleteLectureButton';

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
        <Box>
          <UpdateLectureButton
            content={content}
            sectionId={sectionId}
            title={title}
            id={id}
          />
          <DeleteLectureButton
            lectureId={id}
            ml={3}
          />
        </Box>
      </Flex>

      <Text>{content}</Text>
    </Flex>
  );
};
