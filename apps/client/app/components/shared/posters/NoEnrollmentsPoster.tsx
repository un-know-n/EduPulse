'use client';
import { BsEmojiWink } from 'react-icons/bs';
import { DefaultPosterLayout } from './layout/DefaultPosterLayout';

export default function NoEnrollmentsPoster() {
  return (
    <DefaultPosterLayout
      title={'Пусто'}
      description={'На даний момент, у вас нема активних курсів.'}
      icon={<BsEmojiWink fontSize='2rem' />}
    />
  );
}
