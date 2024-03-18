import React, { FC } from 'react';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { PiCertificateFill } from 'react-icons/pi';
import { ProfileLayout } from '../layout/ProfileLayout';
import { CertificateList } from '../../profile/certificate/CertificateList';

const certificates = [
  {
    title: 'Написання віконних програм на C#. ВСЕ САМ',
    completion: 96,
    color: '#5EBD32',
  },
  {
    title: 'Написання віконних програм на C#. ВСЕ САМ',
    completion: 81,
    color: '#FBBC04',
  },
  {
    title: 'Написання віконних програм на C#. ВСЕ САМ',
    completion: 91,
    color: '#5EBD32',
  },
];

export const ProfileCertificate: FC = () => {
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
          fontSize='24px'
          fontWeight='medium'
          mb='20px'>
          Сертифікати
        </Text>
        <CertificateList certificates={certificates} />
      </Box>
    </ProfileLayout>
  );
};
