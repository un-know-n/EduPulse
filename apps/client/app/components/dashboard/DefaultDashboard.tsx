'use client';

import { FC } from 'react';
import { TEnrollmentResponse } from '../course/@types/course';
import { CourseCard } from '../course/cards/CourseCard';
import { Flex, Grid } from '@chakra-ui/react';

type TProps = {
  enrollments: TEnrollmentResponse[];
};

export const DefaultDashboard: FC<TProps> = ({ enrollments }) => {
  return (
    <Flex
      p={5}
      alignItems={'center'}
      justifyContent={'center'}>
      <Grid
        templateColumns='repeat(3, 1fr)'
        gap={5}>
        {enrollments.map(({ course, ...enrollment }) => (
          <CourseCard
            key={course.id}
            {...course}
            author={course.user.name}
            progress={enrollment.isCompleted ? 100 : 0}
            enrollment={enrollment}
          />
        ))}
      </Grid>
    </Flex>
  );
};
