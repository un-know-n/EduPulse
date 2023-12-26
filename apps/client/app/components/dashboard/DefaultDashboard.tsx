'use client';

import { FC } from 'react';
import { TEnrollmentResponse } from '../course/@types/course';
import { CourseCard } from '../course/cards/CourseCard';
import { Flex } from '@chakra-ui/react';

type TProps = {
  enrollments: TEnrollmentResponse[];
};

export const DefaultDashboard: FC<TProps> = ({ enrollments }) => {
  console.log('GIVEN PROPS: ', enrollments);

  return (
    <Flex p={5}>
      {enrollments.map(({ course, ...enrollment }) => (
        <CourseCard
          key={course.id}
          {...course}
          author={course.user.name}
          progress={enrollment.isCompleted ? 100 : 0}
          enrollment={enrollment}
        />
      ))}
    </Flex>
  );
};
