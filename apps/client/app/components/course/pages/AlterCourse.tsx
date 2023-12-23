import React, { FC } from 'react';
import { TCourseResponse } from '../@types/course';
import { Header as LayoutHeader } from '../../shared/header/Header';

type Nullable<T> = { [K in keyof T]?: T[K] };
type TAlterCourseProps = Nullable<TCourseResponse> & { title: string };

export const AlterCourse: FC<TAlterCourseProps> = ({ title, ...props }) => {
  return <LayoutHeader title={title}></LayoutHeader>;
};
