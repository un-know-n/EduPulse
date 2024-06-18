'use client';

import React, { FC, useEffect } from 'react';

import { CommentsContentLayout } from '../content/comments/CommentsContentLayout';

import { useTypedSelector } from 'apps/client/app/lib/hooks/redux';

import { CourseContentInfo } from '../content/tabs/CourseContentInfo';
import { Header } from '../../shared/header/Header';
import { ContentMaterialList } from '../content/list/ContentMaterialList';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';

import {
  useGetCourseByIdQuery,
  useGetCourseContentQuery,
} from 'apps/client/app/store/services/courses';
import { Center, Flex } from '@chakra-ui/react';
import Loading from 'apps/client/app/loading';

type TProps = {
  id: string;
};

export const CourseContent: FC<TProps> = ({ id }) => {
  const user = useTypedSelector((state) => state.user);
  const { data, error } = useGetCourseContentQuery(id);
  useShowError(error);

  useEffect(() => {
    console.log('DATAAAAAAAAA: ', data);
  });

  return (
    <>
      {data ? (
        <Header
          title={`Матеріали курсу "${data.title}"`}
          additionalDrawerContent={
            <ContentMaterialList
              courseId={id}
              sections={data.sections}
            />
          }>
          <Flex
            justifyContent={'center'}
            alignItems={'flex-start'}
            minH={'50vh'}>
            <CourseContentInfo
              courseTitle={data.title}
              courseId={id}
              sections={data.sections}
            />
          </Flex>
          <CommentsContentLayout
            imageUrl={user.image ?? ''}
            quantityComment={0}></CommentsContentLayout>
        </Header>
      ) : (
        <Loading />
      )}
    </>
  );
};
