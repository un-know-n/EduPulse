'use client';

import { FC } from 'react';
import {
  TCourseWithAuthorResponse,
  TEnrollmentResponse,
} from '../course/@types/course';
import { Center, useConst } from '@chakra-ui/react';
import { CoursesList } from '../course/shared/list/CoursesList';
import NoEnrollmentsPoster from '../shared/posters/NoEnrollmentsPoster';
import { SearchDashboard } from './search/SearchDashboard';

type TProps = {
  enrollments: TEnrollmentResponse[];
};

export const DefaultDashboard: FC<TProps> = ({ enrollments }) => {
  const courses = useConst(() =>
    enrollments.map((enrollment) => ({
      ...enrollment.course,
      UsersAssignedToCourse: [
        {
          id: enrollment.id,
          userId: enrollment.userId,
          courseId: enrollment.courseId,
          isCompleted: enrollment.isCompleted,
          assignedAt: enrollment.assignedAt,
          expiresAt: enrollment.expiresAt,
        },
      ],
    })),
  ) as unknown as TCourseWithAuthorResponse[];

  return (
    // <CoursesList
    //   courses={courses}
    //   poster={<NoEnrollmentsPoster />}
    // />
    <Center>
      <SearchDashboard />
    </Center>
  );
};
