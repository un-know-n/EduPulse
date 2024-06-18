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
  Link,
  Text,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useConst,
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
import NextLink from 'next/link';

import { useTypedDispatch, useTypedSelector } from '../../../lib/hooks/redux';
import { DeleteCourseButton } from '../shared/buttons/DeleteCourseButton';
import { getUkrainianPluralWord } from 'apps/client/app/lib/utils/getUkrainianPluralWord';
import { getSortedMaterialItems } from 'apps/client/app/lib/utils/getSortedMaterialItems';
import { MaterialIcon } from '../shared/icons/MaterialIcon';
import { MaterialTypes } from '../config/constants';
import { coursePrefix } from 'apps/client/app/config/routing/routes';

export const Course: FC<TCourseResponse> = (props) => {
  console.log('COURSE PROPS: ', props);

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
  | 'description'
  | 'sections'
  | 'UsersAssignedToCourse'
  | 'id'
  | 'creatorId'
  | 'user'
  | 'title'
>;

const CourseDescription: FC<TCourseDescriptionProps> = ({
  id,
  description,
  sections,
  creatorId,
  user: author,
  title,
  UsersAssignedToCourse,
}) => {
  const enrollment = UsersAssignedToCourse?.[0];
  const user = useTypedSelector((state) => state.user);

  const [totalLectures, totalTests] = useConst(() => [
    sections.reduce((acc, section) => (acc += section.lectures.length), 0),
    sections.reduce((acc, section) => (acc += section.tests.length), 0),
  ]);

  const { colorMode } = useColorMode();
  const textStyles = colorMode === 'light' ? textStyleLight : textStyleDark;
  const headingStyles =
    colorMode === 'light' ? headingStyleLight : headingStyleDark;

  return (
    <Center>
      <Flex
        p='5'
        direction={{ base: 'column-reverse', md: 'row' }}
        justifyContent={'space-between'}
        {...ContainerOptions}>
        <Box
          w='full'
          mr={10}>
          <Heading
            {...headingStyles}
            mb={5}>
            Про курс
          </Heading>
          <Text
            {...textStyles}
            mb={5}>
            {description}
          </Text>
          <Heading
            {...headingStyles}
            mb={5}>
            Програма курсу
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
                <AccordionButton
                  backdropFilter='auto'
                  backdropBrightness='95%'>
                  <Flex
                    w={'full'}
                    justifyContent={'space-between'}>
                    <Box
                      {...textStyles}
                      as='span'
                      flex='1'
                      maxW={'60%'}
                      textAlign='left'>
                      <Text isTruncated>{section.title}</Text>
                    </Box>
                    <Flex>
                      <Flex display={{ base: 'none', md: 'flex' }}>
                        <Text>{`${
                          section.lectures.length
                        } ${getUkrainianPluralWord(
                          'лекції',
                          section.lectures.length,
                        )}`}</Text>

                        <Text mx={2}>•</Text>
                        <Text>{`${
                          section.tests.length
                        } ${getUkrainianPluralWord(
                          'тести',
                          section.tests.length,
                        )}`}</Text>
                      </Flex>
                      <AccordionIcon />
                    </Flex>
                  </Flex>
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    {getSortedMaterialItems(
                      section.lectures,
                      section.tests,
                    ).map((material) => (
                      <ListItem
                        display={'flex'}
                        alignItems={'center'}
                        key={material.id}>
                        <ListIcon
                          color={
                            material.type === MaterialTypes.TEST
                              ? 'gray.500'
                              : 'purple.500'
                          }>
                          <MaterialIcon
                            type={material.type}
                            size={'24px'}
                          />
                        </ListIcon>
                        {enrollment ? (
                          <Link
                            as={NextLink}
                            href={`${coursePrefix}/${id}/content?sectionId=${section.id}&materialId=${material.id}`}
                            color='#9872EA'>
                            {material.title}
                          </Link>
                        ) : (
                          <Text
                            as='h4'
                            size='md'>
                            {material.title}
                          </Text>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>
            ))}
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
              certificate={{
                author: author.name,
                mark: 100,
                title,
              }}
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
            {`${totalLectures} ${getUkrainianPluralWord(
              'лекції',
              totalLectures,
            )}`}
          </Text>
          <Text
            {...textStyles}
            mb={2}>
            {`${totalTests} ${getUkrainianPluralWord('тести', totalTests)}`}
          </Text>
        </Box>
      </Flex>
    </Center>
  );
};
