import { FC, useEffect } from 'react';
import { TLectureResponse } from '../../@types/course';
import { Flex, Text, Box } from '@chakra-ui/react';
import { DeleteLectureButton } from '../buttons/lecture/DeleteLectureButton';
import { UpdateLectureButton } from '../buttons/lecture/UpdateLectureButton';
import { FaBookBookmark, FaVideo } from 'react-icons/fa6';
import { MaterialIcon } from '../icons/MaterialIcon';

export const LectureItem: FC<
  TLectureResponse & { bgColor?: string; index: string | number }
> = ({ title, id, content, sectionId, index, bgColor, videoUrl }) => {
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
        <Flex
          alignItems={'center'}
          gap={3}>
          {videoUrl ? (
            <MaterialIcon type='VIDEO' />
          ) : (
            <MaterialIcon type='LECTURE' />
          )}
          <Text
            noOfLines={1}
            maxW='80%'>
            {title}
          </Text>
        </Flex>

        <Flex gap={3}>
          <UpdateLectureButton
            videoUrl={videoUrl}
            content={content}
            sectionId={sectionId}
            title={title}
            id={id}
          />
          <DeleteLectureButton lectureId={id} />
        </Flex>
      </Flex>
    </Flex>
  );
};
