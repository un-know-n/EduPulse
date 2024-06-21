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
import useMaterialsSlider from 'apps/client/app/lib/hooks/useMaterialsSlider';
import useSyncQueryParams from 'apps/client/app/lib/hooks/useSyncQueryParams';
import { useSearchParams } from 'next/navigation';
import { TCourseContentResponse } from '../@types/course';
import { useMaterials } from 'apps/client/app/lib/hooks/useMaterials';

type TProps = {
  id: string;
  data: TCourseContentResponse;
};

export const CourseContent: FC<TProps> = ({ id, data }) => {
  const { next, prev, setMaterialIndex, materials } = useMaterials({
    sections: data.sections,
  });

  // useEffect(() => {
  //   console.log('DATAAAAAAAAA: ', data);
  // });

  return (
    <Header
      title={`Матеріали курсу "${data.title}"`}
      additionalDrawerContent={
        <ContentMaterialList
          courseId={id}
          sections={data.sections}
          materials={materials}
          setMaterialIndex={setMaterialIndex}
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
          next={next}
          prev={prev}
          setMaterialIndex={setMaterialIndex}
        />
      </Flex>
      <CommentsContentLayout
        courseId={id}
        isEnrolled
      />
    </Header>
  );
};
