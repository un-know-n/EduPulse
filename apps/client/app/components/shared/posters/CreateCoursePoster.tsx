'use client';
import { DefaultPosterLayout } from './layout/DefaultPosterLayout';
import { IoCreateOutline } from 'react-icons/io5';

export default function CreateCoursePoster() {
  return (
    <DefaultPosterLayout
      title={'Програма курсу...'}
      description={'Для налаштування програми курсу, спочатку створіть курс.'}
      icon={<IoCreateOutline fontSize='2rem' />}
    />
  );
}
