'use client';

import { DefaultPosterLayout } from './layout/DefaultPosterLayout';
import { IoCreateOutline } from 'react-icons/io5';

export default function NoCreatedCourses() {
  return (
    <DefaultPosterLayout
      title={'Пусто!'}
      description={'На даний момент, у вас немає створених курсів.'}
      icon={<IoCreateOutline fontSize='2rem' />}
    />
  );
}
