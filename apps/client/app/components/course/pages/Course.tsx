import React, { FC } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { FaRegBookmark } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi2';
import { ContainerOptions } from '../../../config/UI/container.options';
import { CiImageOn } from 'react-icons/ci';
import { DifficultyLabel } from '../labels/DifficultyLabel';
import { TimeRangeLabel } from '../labels/TimeRangeLabel';
import { IconTextLabel } from '../labels/IconTextLabel';
import { TCourseResponse } from '../@types/course';
import { Header as LayoutHeader } from '../../shared/header/Header';
import moment from 'moment/moment';
import { abbreviateNumber } from 'js-abbreviation-number';
import { getFormattedTime } from '../../../lib/utils/time';
import { CourseButton } from '../shared/buttons/CourseButton';

import { useTypedDispatch, useTypedSelector } from '../../../lib/hooks/redux';
import { DeleteCourseButton } from '../shared/buttons/DeleteCourseButton';

export const Course: FC<TCourseResponse> = (props) => {
  return (
    <LayoutHeader title={props.title}>
      <CourseInfo {...props} />
      <CourseDescription {...props} />
    </LayoutHeader>
  );
};

const textStyleLight = {
  fontSize: 16,
  fontWeight: 'regular',
  color: '#1D2734',
};

const textStyleDark = {
  fontSize: 16,
  fontWeight: 'regular',
  color: 'white',
};

const headingStyleLight = {
  fontSize: 30,
  fontWeight: 'medium',
  color: '#1D2734',
};

const headingStyleDark = {
  fontSize: 30,
  fontWeight: 'medium',
  color: 'white',
};

type TCourseInfoProps = Omit<TCourseResponse, 'description' | 'sections'>;

const CourseInfo: FC<TCourseInfoProps> = ({
  title,
  numberOfPeopleEnrolled,
  purpose,
  difficultyLevel,
  image,
  timeToPass,
  UsersAssignedToCourse,
}) => {
  const enrollment = UsersAssignedToCourse?.[0];
  const [startCourseDate, endCourseDate] = [
    getFormattedTime(enrollment?.assignedAt ?? Date.now()),
    enrollment?.expiresAt
      ? getFormattedTime(enrollment.expiresAt)
      : moment().utc(true).add(timeToPass, 'seconds').format('DD.MM'),
  ];

  const { colorMode } = useColorMode();
  const backgroundColor = useColorModeValue('#F3F4FD', '#282B41');
  const textStyles = colorMode === 'light' ? textStyleLight : textStyleDark;
  const headingStyles =
    colorMode === 'light' ? headingStyleLight : headingStyleDark;

  const iconSize = useBreakpointValue({ base: '15px', md: '20px' });

  return (
    <Center bg={backgroundColor}>
      <Flex
        p='5'
        direction={['column', 'column', 'row']}
        justifyContent={['center', 'center', 'space-between']}
        {...ContainerOptions}>
        <Flex
          mr={5}
          justifyContent='space-between'
          flexDirection='column'>
          <Box>
            <Heading
              {...headingStyles}
              mb='20px'>
              {title}
            </Heading>
            <Text
              {...textStyles}
              mb={['20px', '20px', '40px']}>
              {purpose}
            </Text>
          </Box>
          <Flex
            justifyContent={{ base: 'center', md: 'flex-start' }}
            alignItems='center'>
            <Box
              display={{ base: 'block', md: 'flex' }}
              flexDirection={{ base: 'column', md: 'row' }}
              gap={{ base: '3', md: '5' }}
              mb={{ base: '20px', md: '0' }}>
              <DifficultyLabel level={difficultyLevel} />
              <TimeRangeLabel
                startDate={startCourseDate}
                endDate={endCourseDate}
              />
              <IconTextLabel
                icon={<FaRegBookmark size={iconSize} />}
                text={'Сертифікат'}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection='column'
          textAlign='center'
          alignItems='center'>
          <Avatar
            boxSize='170px'
            src={image}
            icon={<CiImageOn fontSize={70} />}
            mb='10px'
            borderRadius='8px'
          />
          <IconTextLabel
            icon={<HiOutlineUsers size='20px' />}
            text={`${abbreviateNumber(numberOfPeopleEnrolled)} зареєструвалися`}
          />
        </Flex>
      </Flex>
    </Center>
  );
};

type TCourseDescriptionProps = Pick<
  TCourseResponse,
  'description' | 'sections' | 'UsersAssignedToCourse' | 'id' | 'creatorId'
>;

const CourseDescription: FC<TCourseDescriptionProps> = ({
  id,
  description,
  sections,
  creatorId,
  UsersAssignedToCourse,
}) => {
  const enrollment = UsersAssignedToCourse?.[0];
  const user = useTypedSelector((state) => state.user);

  const { colorMode } = useColorMode();
  const textStyles = colorMode === 'light' ? textStyleLight : textStyleDark;
  const headingStyles =
    colorMode === 'light' ? headingStyleLight : headingStyleDark;

  return (
    <Center>
      <Flex
        p='5'
        direction={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        {...ContainerOptions}>
        <Box
          w='full'
          mr={10}>
          <Heading
            {...headingStyles}
            mb={5}>
            ПРО КУРС
          </Heading>
          <Text
            {...textStyles}
            mb={5}>
            {description}
          </Text>
          <Heading
            {...headingStyles}
            mb={5}>
            ПРОГРАМА КУРСУ
          </Heading>
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            w='full'
            mb={10}>
            {sections.map((section, i) => (
              <AccordionItem
                key={section.id}
                w='full'>
                <AccordionButton>
                  <Box
                    {...textStyles}
                    as='span'
                    flex='1'
                    textAlign='left'>
                    {section.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <OrderedList {...textStyles}>
                    {section.lectures.map((lecture, i) => (
                      <ListItem
                        key={lecture.id}
                        mb={3}>
                        <Heading
                          as='h4'
                          size='md'>
                          (Тема {i + 1}) {lecture.title}
                        </Heading>
                        {enrollment ? <Text>{lecture.content}</Text> : null}
                      </ListItem>
                    ))}
                  </OrderedList>
                  <Flex
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    gap={2}>
                    <MdCheckCircle color='38A169' />
                    <Text>Тест</Text>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            ))}

            <AccordionItem>
              <AccordionButton>
                <Box
                  {...textStyles}
                  as='span'
                  flex='1'
                  textAlign='left'>
                  Сертифікат
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <List>
                  <ListItem {...textStyles}>
                    <ListIcon
                      as={MdCheckCircle}
                      color='green.500'
                    />
                    Сертифікат
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Flex
            flexDirection='column'
            alignItems={{ base: 'center', md: 'flex-start' }}>
            <CourseButton
              id={id}
              creatorId={creatorId}
              enrollment={enrollment}
              mb={3}
            />
            {user.id === creatorId ? (
              <DeleteCourseButton
                courseId={id}
                mb={5}
              />
            ) : null}
          </Flex>

          <Text
            {...textStyles}
            mb={2}>
            У програму входять
          </Text>
          <Text
            {...textStyles}
            mb={2}>
            {sections.reduce(
              (acc, section) => (acc += section.lectures.length),
              0,
            )}{' '}
            лекцій(-ї)
          </Text>
          <Text
            {...textStyles}
            mb={2}>
            {sections.length} тест(-и)
          </Text>
        </Box>
      </Flex>
    </Center>
  );
};
