'use client';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import { useGetCourseContentQuery } from 'apps/client/app/store/services/courses';
import { CourseContent } from '../../../components/course/pages/CourseContent';
import Loading from 'apps/client/app/loading';

export default function Page({ params }: { params: { id: string } }) {
  const { data, error } = useGetCourseContentQuery(params.id);
  useShowError(error);

  return (
    <>
      {data ? (
        <CourseContent
          id={params.id}
          data={data}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
