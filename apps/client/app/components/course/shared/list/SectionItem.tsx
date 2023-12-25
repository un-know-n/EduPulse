import React, { FC } from 'react';
import { TSectionResponse } from '../../@types/course';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { LectureItem } from './LectureItem';
import { UpdateSectionButton } from '../buttons/UpdateSectionButton';
import { CreateLectureButton } from '../buttons/CreateLectureButton';

export const SectionItem: FC<TSectionResponse & { index: string | number }> = ({
  id,
  courseId,
  title,
  lectures,
  index,
}) => {
  const backgroundColor = useColorModeValue('#F3F4FD', '#282B41');

  return (
    <AccordionItem border='none'>
      <h2>
        <AccordionButton
          as={Box}
          cursor={'pointer'}
          bg={backgroundColor}
          borderRadius={8}>
          <Box
            as='span'
            flex='1'
            textAlign='left'>
            {index}. {title}
          </Box>
          <Flex
            justifyContent='center'
            alignItems='center'
            gap={3}>
            <AccordionIcon />
            <UpdateSectionButton
              title={title}
              courseId={courseId}
              id={id}
            />
          </Flex>
        </AccordionButton>
      </h2>
      <AccordionPanel
        p={0}
        pt={2}>
        <Stack
          pl={6}
          mt={1}
          spacing={3}>
          {lectures.map((lecture, i) => (
            <LectureItem
              index={`${index}.${i + 1}`}
              key={lecture.id}
              bgColor={backgroundColor}
              {...lecture}
            />
          ))}
        </Stack>
        <Flex
          my={3}
          alignItems={'center'}
          justifyContent={'center'}>
          <CreateLectureButton sectionId={id} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
