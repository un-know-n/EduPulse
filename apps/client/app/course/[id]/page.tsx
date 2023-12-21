'use client';
import { Course } from '../../components/course/pages/Course';
import { coursePrefix, Routes } from '../../config/routing/routes';
import { TCourseResponse } from '../../components/course/@types/course';
import { useEffect, useState } from 'react';
import Loading from '../../loading';
import { useSession } from 'next-auth/react';
import { useRequest } from '../../lib/hooks/useRequest';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
  const getCourseData = useRequest();
  const router = useRouter();
  const [course, setCourse] = useState<TCourseResponse | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    getCourseData(session!.user!, `${coursePrefix}/${params.id}`, 'get')
      .then((r) => setCourse(r))
      .catch(() => router.push(Routes.Dashboard));
  }, [params.id]);

  return <>{course ? <Course {...course} /> : <Loading />}</>;
}
