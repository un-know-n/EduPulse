'use client';

import { useGetCreatedCoursesQuery } from '../../store/services/courses';
import { useShowError } from '../../lib/hooks/useShowError';
import Loading from '../../loading';
import { Header } from '../../components/shared/header/Header';
import NoCreatedCourses from '../../components/shared/posters/NoCreatedCourses';
import { useUserRoleCheck } from '../../lib/hooks/useUserCheck';
import { CoursesList } from '../../components/course/shared/list/CoursesList';
import { Box } from '@chakra-ui/react';

export default function Page() {
  const { data, error, isSuccess, isLoading } = useGetCreatedCoursesQuery(null);
  useUserRoleCheck('teacher');
  useShowError(error);

  if (isLoading) return <Loading />;

  return (
    <Header title={'Створені курси'}>
      <Box mx='auto'>
        <CoursesList
          poster={<NoCreatedCourses />}
          courses={data}
        />
      </Box>
    </Header>
  );
}
