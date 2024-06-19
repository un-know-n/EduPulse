import React, { FC, PropsWithChildren } from 'react';
import { Header as LayoutHeader } from '../../shared/header/Header';
import { Center, Flex, Link, Box } from '@chakra-ui/react';
import { ProfileInfo } from '../shared/ProfileInfo';
import { Routes } from 'apps/client/app/config/routing/routes';
import NextLink from 'next/link';

type TProps = {
  headerTitle?: string;
  hasProfileInfo?: boolean;
};

export const ProfileLayout: FC<PropsWithChildren<TProps>> = ({
  headerTitle,
  children,
  hasProfileInfo = true,
}) => {
  return (
    <LayoutHeader title={headerTitle ?? 'Профіль'}>
      <Center>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          p={{ base: '20px', md: '50px' }}
          maxWidth={1200}
          w={'full'}
          gap='25px'>
          {hasProfileInfo ? (
            <ProfileInfo />
          ) : (
            <Box w='150px'>
              <Link
                as={NextLink}
                href={Routes.ProfileView}
                color='#9872EA'
                fontSize='18'
                mr='25px'>
                {'<Профіль'}
              </Link>
            </Box>
          )}
          {children}
        </Flex>
      </Center>
    </LayoutHeader>
  );
};
