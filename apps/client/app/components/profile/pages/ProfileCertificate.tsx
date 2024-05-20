import React, { FC } from 'react';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { PiCertificateFill } from 'react-icons/pi';
import { ProfileLayout } from '../layout/ProfileLayout';
import { CertificateList } from '../../profile/certificate/CertificateList';
import { useGetCertificatesQuery } from 'apps/client/app/store/services/courses';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import Loading from 'apps/client/app/loading';

export const ProfileCertificate: FC = () => {
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
