'use client';
import { BsEmojiFrown } from 'react-icons/bs';
import { DefaultPosterLayout } from './layout/DefaultPosterLayout';

export default function CreateCoursePoster() {
  return (
    <DefaultPosterLayout
      title={'Недоступно!'}
      description={'Для редагування, спочатку створіть курс.'}
      icon={<BsEmojiFrown fontSize='2rem' />}
    />
  );
}
