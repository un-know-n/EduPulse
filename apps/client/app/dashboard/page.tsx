'use client';

import { DefaultDashboard } from '../components/dashboard/DefaultDashboard';
import { useGetEnrollmentsByIdQuery } from '../store/services/courses';
import { useShowError } from '../lib/hooks/useShowError';
import Loading from '../loading';
import { useTypedSelector } from '../lib/hooks/redux';
import NoEnrollmentsPoster from '../components/shared/posters/NoEnrollmentsPoster';
import { Header } from '../components/shared/header/Header';

export default function Page() {
  const user = useTypedSelector((state) => state.user);
  const { data, error, isSuccess, isLoading } = useGetEnrollmentsByIdQuery(
    user.id,
  );
  useShowError(error);

  if (isLoading) return <Loading />;

  return (
    <Header title={'Мої курси'}>
      {data?.length ? (
        <DefaultDashboard enrollments={data} />
      ) : (
        <NoEnrollmentsPoster />
      )}
    </Header>
  );
}
