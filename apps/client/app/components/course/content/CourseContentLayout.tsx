import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { Header as LayoutHeader } from '../../shared/header/Header';
import { Center } from '@chakra-ui/react';
import { CourseContentInfo } from '../content/CourseContentInfo';

type TProps = {
  headerTitle?: string;
};

export const CourseContentLayout: FC<PropsWithChildren<TProps>> = ({
  headerTitle,
  children,
}) => {
  return (
    <>
      <LayoutHeader title={headerTitle ?? 'Сторінка матеріалу'} />
      <Center>
        <CourseContentInfo
          courseName='Назва курса буде'
          moduleName='Назва модуля буде'
          materialName='Назва матеріалу буде'
        />
      </Center>
      {children}
    </>
  );
};
