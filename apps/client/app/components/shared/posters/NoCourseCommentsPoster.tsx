'use client';

import { RiChatSmile2Line } from 'react-icons/ri';
import { DefaultPosterLayout } from './layout/DefaultPosterLayout';

export default function NoCourseCommentsPoster() {
  return (
    <DefaultPosterLayout
      title={'Коментарів не знайдено'}
      description={'Залиште перший коментар!'}
      icon={<RiChatSmile2Line fontSize='2rem' />}
    />
  );
}
