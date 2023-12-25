'use client';

import { AlterCourse } from '../../components/course/pages/AlterCourse';
import { useUserRoleCheck } from '../../lib/hooks/useUserCheck';

export default function Page() {
  useUserRoleCheck('teacher');

  return <AlterCourse pageTitle={'Створення курсу'} />;
}
