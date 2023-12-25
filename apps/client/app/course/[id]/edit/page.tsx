'use client';

import { useGetCourseByIdQuery } from '../../../store/services/courses';
import { useShowError } from '../../../lib/hooks/useShowError';
import Loading from '../../../loading';
import { AlterCourse } from '../../../components/course/pages/AlterCourse';
import { useUserRoleCheck } from '../../../lib/hooks/useUserCheck';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { Routes } from '../../../config/routing/routes';

export default function Page({ params }: { params: { id: string } }) {
  useUserRoleCheck('teacher');

  const user = useTypedSelector((state) => state.user);
  const [isCourseCreator, setIsCourseCreator] = useState(false);
  const { data, error } = useGetCourseByIdQuery(params.id);
  const { notify, router } = useShowError(error);

  useEffect(() => {
    if (user && data) {
      if (user.id !== data.creatorId) {
        notify('Ви не є автором даного курсу!', 'error');
        router.push(Routes.Dashboard);
        return;
      }
      setIsCourseCreator(user.id === data.creatorId);
    }
  }, [user, data]);

  return (
    <>
      {data && isCourseCreator ? (
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
