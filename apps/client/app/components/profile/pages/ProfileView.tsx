import React, { FC } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useGetCreatedCoursesQuery } from '../../../store/services/courses';
import { CoursesList } from '../../course/shared/list/CoursesList';
import NoCreatedCourses from '../../shared/posters/NoCreatedCourses';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { ProfileLayout } from '../layout/ProfileLayout';

export const ProfileView: FC = () => {
  const { data, isLoading, isError } = useGetCreatedCoursesQuery(null);
  const user = useTypedSelector((state) => state.user);

  return (
    <ProfileLayout>
      <Box w={'full'}>
        <Text
          fontSize='32px'
          fontWeight='medium'
          mb='10px'>
          {user.name || 'User'}
        </Text>
        <Text
          fontSize='16px'
          mb='25px'>
          У програмуванні 5+ років. Брав участь у різноманітних проектах. Зараз
          займаюся Android розробкою у дочірній компанії Ощад. Також займаюся
          викладанням.
        </Text>
        <InputGroup maxWidth='400px'>
          <InputLeftElement pointerEvents='none'>
            <FiSearch color='gray' />
          </InputLeftElement>
          <Input placeholder='Назва курсу' />
        </InputGroup>
        <CoursesList
          isLoading={isLoading}
          poster={<NoCreatedCourses />}
          courses={data}
        />
      </Box>
    </ProfileLayout>
  );
};
