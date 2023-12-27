'use client';

import React, { FC } from 'react';
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  IconButton,
  Progress,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoBookOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { TimeRangeLabel } from '../labels/TimeRangeLabel';
import { AuthorLabel } from '../labels/AuthorLabel';
import { TCourseResponse, TEnrollment } from '../@types/course';
import { getFormattedTime } from '../../../lib/utils/time';
import moment from 'moment';
import { abbreviateNumber } from 'js-abbreviation-number';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IconTextLabel } from '../labels/IconTextLabel';
import { DifficultyLabel } from '../labels/DifficultyLabel';
import { LiaBookSolid } from 'react-icons/lia';
import { Link } from '@chakra-ui/next-js';
import { CourseButton } from '../shared/buttons/CourseButton';

type TProps = Pick<
  TCourseResponse,
  | 'sections'
  | 'title'
  | 'createdAt'
  | 'difficultyLevel'
  | 'timeToPass'
  | 'numberOfPeopleEnrolled'
  | 'image'
  | 'id'
  | 'creatorId'
> & {
  author: string;
  progress: number;
  enrollment?: TEnrollment;
};

export const CourseCard: FC<TProps> = ({
  author,
  progress,
  createdAt,
  timeToPass,
  numberOfPeopleEnrolled,
  difficultyLevel,
  title,
  image,
  sections,
  id,
  creatorId,
  enrollment,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useBoolean();

  const cardColor = useColorModeValue('#805AD5', '#D6BCFA');
  const progressAlignment = progress < 50 ? 'left' : 'right';
  const bgColor = useColorModeValue('#FFFFFF', '#373d52'); //#3F444E
  const bgColorFooter = useColorModeValue('#DDE6F6', '#2a2e41');

  const [startCourseDate, endCourseDate] = [
    getFormattedTime(createdAt),
    moment().utc(true).add(timeToPass, 'seconds').format('DD.MM'),
  ];

  return (
    <Card
      maxWidth='450px'
      overflow='hidden'
      variant='outline'
      w='full'
      borderRadius='15px'
      backgroundColor={bgColor}>
      <CardBody>
        <Stack>
          <Flex
            justify='space-between'
            alignItems='flex-start'
            gap={3}>
            <Heading
              as={Link}
              href={`course/${id}`}
              size='md'
              noOfLines={2}>
              {title}
            </Heading>
            <Avatar
              size={'lg'}
              src={image ?? ''}
              borderWidth={4}
              borderColor={cardColor}
              borderRadius={'50%'}
              icon={<LiaBookSolid fontSize={36} />}
              mb='10px'
            />
          </Flex>
          <Flex
            gap='3'
            direction='column'>
            <IconTextLabel
              icon={<IoBookOutline size='20px' />}
              text={`Модулів: ${sections.length}; Тем: ${sections.reduce(
                (acc, section) => (acc += section.lectures.length),
                0,
              )}; Тестів: ${sections.length}`}
            />
            <TimeRangeLabel
              startDate={startCourseDate}
              endDate={endCourseDate}
            />
            <AuthorLabel author={author} />
          </Flex>
        </Stack>
      </CardBody>
      {progress ? (
        <Text
          color={cardColor}
          pr='0.5rem'
          pl='0.5rem'
          fontWeight={600}
          textAlign={progressAlignment}>
          {progress}%
        </Text>
      ) : null}
      {progress ? (
        <Progress
          colorScheme='purple'
          value={progress}
          size='xs'></Progress>
      ) : null}
      <Divider />
      <CardFooter
        alignItems='center'
        flexWrap='wrap'
        justify='space-between'
        backgroundColor={bgColorFooter}>
        <Flex
          flexWrap='wrap'
          justify='left'
          gap='4'>
          <IconTextLabel
            icon={<HiOutlineUsers size='20px' />}
            text={abbreviateNumber(numberOfPeopleEnrolled)}
          />
          <DifficultyLabel
            level={difficultyLevel}
            showText={false}
          />
          <Flex
            alignItems='center'
            gap='1'>
            <IconButton
              onClick={() => setIsButtonClicked.toggle()}
              bg='transparent'
              isRound={true}
              variant='solid'
              aria-label='Done'
              fontSize='20px'
              borderColor='black'
              borderWidth='md'
              color={isButtonClicked ? cardColor : 'gray.400'}
              icon={<FaStar />}
            />
          </Flex>
        </Flex>

        <CourseButton
          id={id}
          creatorId={creatorId}
          enrollment={enrollment}
        />
      </CardFooter>
    </Card>
  );
};
