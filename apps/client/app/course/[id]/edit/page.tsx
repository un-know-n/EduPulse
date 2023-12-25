'use client';

import { useGetCourseByIdQuery } from '../../../store/services/courses';
import { useShowError } from '../../../lib/hooks/useShowError';
import Loading from '../../../loading';
import { AlterCourse } from '../../../components/course/pages/AlterCourse';
import { useUserRoleCheck } from '../../../lib/hooks/useUserCheck';

export default function Page({ params }: { params: { id: string } }) {
  useUserRoleCheck('teacher');
  
  const { data, error } = useGetCourseByIdQuery(params.id);
  useShowError(error);

  return (
    <>
      {data ? (
        <AlterCourse
          {...data}
          pageTitle={'Змінити інформацію про курс'}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
