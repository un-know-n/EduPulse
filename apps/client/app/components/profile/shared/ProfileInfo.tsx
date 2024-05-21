import React, { FC } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Stack,
  Link,
  Text,
  useColorMode,
  useMediaQuery,
  HStack,
  useConst,
} from '@chakra-ui/react';

import {
  commonIconStyleDark,
  commonIconStyleLight,
  commonTextStyleDark,
  commonTextStyleLight,
  numberTextStyleDark,
  numberTextStyleLight,
} from '../config/styles';
import { useTypedSelector } from 'apps/client/app/lib/hooks/redux';
import moment from 'moment';
import { TRoles, translateRole } from '../../auth/config/constants';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Routes } from 'apps/client/app/config/routing/routes';
import NextLink from 'next/link';

// const [courses, certificates] = [10, 10];

const infoLinks: { href: string; title: string }[] = [
  { href: `${Routes.ProfileView}`, title: 'Профіль' },
  // { href: `${Routes.ProfileCertificate}`, title: 'Сертифікати' },
  { href: `${Routes.ProfileSettings}`, title: 'Налаштування' },
];

export const ProfileInfo: FC = () => {
  const user = useTypedSelector((state) => state.user);
  const registeredAt = useConst(moment(user.createdAt).format('DD.MM.YYYY'));

  const { colorMode } = useColorMode();
  const commonStyles =
    colorMode === 'light' ? commonTextStyleLight : commonTextStyleDark;
  const numberStyles =
    colorMode === 'light' ? numberTextStyleLight : numberTextStyleDark;
  const commonIconStyles =
    colorMode === 'light' ? commonIconStyleLight : commonIconStyleDark;

  const currentPath = window.location.pathname;

  const [isSmallScreen] = useMediaQuery('(max-width: 767px)');
  const [setMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <Flex direction='column'>
        {!setMobile && (
          <HStack mb='20px'>
            {infoLinks.map((link) => (
              <Link
                as={NextLink}
                key={link.title}
                href={link.href}
                color={currentPath === link.href ? 'gray' : '#9872EA'}
                fontSize='18'
                pointerEvents={currentPath === link.href ? 'none' : 'auto'}
                _hover={{
                  color: currentPath === link.href ? 'gray' : '#9872EA',
                  textDecoration: 'underline',
                }}>
                {link.title}
              </Link>
            ))}
          </HStack>
        )}
        <Flex
          direction={{ base: 'row', md: 'column' }}
          gap={{ base: '5', md: '0' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}>
          <Avatar
            boxSize={{ base: '130px', md: '150px' }}
            src={user.image || ''}
            mb={{ base: '0', md: '25px' }}
            borderRadius='30px'
          />
          <Stack mb={{ base: '0', md: '25px' }}>
            <Flex alignItems='center'>
              <FaRegUserCircle {...commonIconStyles} />
              <Text {...commonStyles}>
                {/* <Text
                  as='span'
                  {...numberStyles}>
                  {subscribers}
                </Text>{' '}
                підписників */}
                {translateRole(user.role as TRoles)}
              </Text>
            </Flex>
            <Flex alignItems='center'>
              <HiOutlineMail {...commonIconStyles} />
              <Text {...commonStyles}>
                {user.emailVerified ? 'Підтверджена' : 'Не підтверджена'}
              </Text>
            </Flex>

            {/* <Flex alignItems='center'>
              <PiCertificateFill {...commonIconStyles} />
              <Text {...commonStyles}>
                <Text
                  as='span'
                  {...numberStyles}>
                  {certificates}
                </Text>{' '}
                {getUkrainianPluralWord('сертифікати', certificates)}
              </Text>
            </Flex>
            <Flex alignItems='center'>
              <RiBookMarkFill {...commonIconStyles} />
              <Text {...commonStyles}>
                <Text
                  as='span'
                  {...numberStyles}>
                  {courses}
                </Text>{' '}
                {getUkrainianPluralWord('курси', courses)}
              </Text>
            </Flex> */}
          </Stack>
          {!isSmallScreen && (
            <Stack
              direction='column'
              alignItems='flex-start'>
              {infoLinks.map((link) => (
                <Link
                  as={NextLink}
                  key={link.title}
                  href={link.href}
                  color={currentPath === link.href ? 'gray' : '#9872EA'}
                  fontSize='18'
                  pointerEvents={currentPath === link.href ? 'none' : 'auto'}
                  _hover={{
                    color: currentPath === link.href ? 'gray' : '#9872EA',
                    textDecoration: 'underline',
                  }}>
                  {link.title}
                </Link>
              ))}
              <Divider
                mt='20px'
                mb='20px'
                borderWidth='2px'
              />
              <Text
                {...commonStyles}
                ml='0px'>
                Зареєстрований з {registeredAt}
              </Text>
            </Stack>
          )}
        </Flex>
      </Flex>
    </>
  );
};
