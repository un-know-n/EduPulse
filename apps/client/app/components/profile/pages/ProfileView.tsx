import React, { FC, useState, useEffect } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import {
  useGetCertificatesQuery,
  useGetCreatedCoursesQuery,
} from '../../../store/services/courses';
import { CoursesList } from '../../course/shared/list/CoursesList';
import NoCreatedCourses from '../../shared/posters/NoCreatedCourses';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { ProfileLayout } from '../layout/ProfileLayout';
import { useDebounce } from 'apps/client/app/lib/hooks/useDebounce';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import Loading from 'apps/client/app/loading';
import { CertificateList } from '../certificate/CertificateList';

export const ProfileView: FC = () => {
  // const [search, setSearch] = useState('');
  // const [filteredData, setFilteredData] = useState<any[]>([]);

  // const debouncedSearch = useDebounce(search, 500);

  // useEffect(() => {
  //   if (data) {
  //     if (debouncedSearch) {
  //       const filtered = data.filter((course) =>
  //         course.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  //       );
  //       setFilteredData(filtered);
  //     } else {
  //       setFilteredData(data);
  //     }
  //   }
  // }, [debouncedSearch, data]);

  const user = useTypedSelector((state) => state.user);
  const {
    data: certificates,
    error,
    isLoading,
  } = useGetCertificatesQuery(user.id);
  useShowError(error);

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
        <Text
          fontSize='24px'
          fontWeight='medium'
          mb='20px'>
          Сертифікати
        </Text>
        {isLoading || !certificates ? (
          <Loading />
        ) : (
          <CertificateList certificates={certificates} />
        )}
      </Box>
    </ProfileLayout>
  );
};
