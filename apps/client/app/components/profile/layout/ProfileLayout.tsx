import React, { FC, PropsWithChildren } from 'react';
import { Header as LayoutHeader } from '../../shared/header/Header';
import { Center, Flex, Link } from '@chakra-ui/react';
import { ProfileInfo } from '../shared/ProfileInfo';

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
    <>
      <LayoutHeader title={headerTitle ?? 'Профіль'} />
      <Center>
        <Flex
          p='50px'
          maxWidth={1200}
          w={'full'}>
          {hasProfileInfo ? (
            <ProfileInfo
              registeredAt='22.04.2024'
              courses={3}
              certificates={3}
              subscribers={10}
              imageUrl={''}
            />
          ) : (
            <Link
              w='150px'
              href='/profile/view'
              color='#9872EA'
              fontSize='18'
              mr='25px'>
              {'<Профіль'}
            </Link>
          )}
          {children}
        </Flex>
      </Center>
    </>
  );
};
