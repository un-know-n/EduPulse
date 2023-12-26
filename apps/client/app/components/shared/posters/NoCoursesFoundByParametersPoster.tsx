'use client';
import { TbMoodEmpty } from 'react-icons/tb';
import { DefaultPosterLayout } from './layout/DefaultPosterLayout';

export default function NoCoursesFoundByParametersPoster() {
  return (
    <DefaultPosterLayout
      title={'Пусто!'}
      description={'На жаль, ваш пошук не дав результатів.'}
      icon={<TbMoodEmpty fontSize='2rem' />}
    />
  );
}
