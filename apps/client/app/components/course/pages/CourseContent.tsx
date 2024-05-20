import React, { FC } from 'react';
import { CourseContentLayout } from '../content/CourseContentLayout';
import { CommentsContentLayout } from '../comments/CommentsContentLayout';

export const CourseContent: FC = () => {
  return (
    <CourseContentLayout
      items={['Назва модуля буде', 'Дадада']}
      subitems={[
        ['Назва матеріалу буде', 'аіваіва', 'аіваіва'],
        ['аіваіва', 'аіваіва'],
      ]}>
      <CourseContentComment />
    </CourseContentLayout>
  );
};

export const CourseContentComment: FC = () => {
  return (
    <CommentsContentLayout
      imageUrl=''
      quantityComment={1233}></CommentsContentLayout>
  );
};
