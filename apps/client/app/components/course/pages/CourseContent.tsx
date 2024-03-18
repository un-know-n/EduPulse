import React, { FC } from 'react';
import { CourseContentLayout } from '../content/CourseContentLayout';
import { CommentsContentLayout } from '../comments/CommentsContentLayout';

export const CourseContent: FC = () => {
  return (
    <CourseContentLayout>
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
