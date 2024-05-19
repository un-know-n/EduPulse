import React, { FC, useState, useEffect } from 'react';
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
import { useDebounce } from 'apps/client/app/lib/hooks/useDebounce';

export const ProfileView: FC = () => {
  const { data, isLoading, isError } = useGetCreatedCoursesQuery(null);
  const user = useTypedSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (data) {
      if (debouncedSearch) {
        const filtered = data.filter((course) =>
          course.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }
  }, [debouncedSearch, data]);

  return (
    <ProfileLayout>
      <Box w={'full'}>
        <Text
          fontSize='32px'
          fontWeight='medium'
          mb='10px'>
          {user.name}
        </Text>
        <Text
          fontSize='16px'
          mb='25px'>
          {user.description}
        </Text>
        <InputGroup maxWidth='400px'>
          <InputLeftElement pointerEvents='none'>
            <FiSearch color='gray' />
          </InputLeftElement>
          <Input
            placeholder='Назва курсу'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <CoursesList
          isLoading={isLoading}
          poster={<NoCreatedCourses />}
          courses={filteredData}
        />
      </Box>
    </ProfileLayout>
  );
};
