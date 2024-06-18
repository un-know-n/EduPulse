'use client';
import { Course } from '../../components/course/pages/Course';
import Loading from '../../loading';
import { useGetCourseByIdQuery } from '../../store/services/courses';
import { useShowError } from '../../lib/hooks/useShowError';
import { useEffect } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { data, error } = useGetCourseByIdQuery(params.id);
  useShowError(error);

  return <>{data ? <Course {...data} /> : <Loading />}</>;
}
