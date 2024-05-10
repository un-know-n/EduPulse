import React, { FC } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Link,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
  Tabs,
  TabList,
  Tab,
  HStack,
} from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa6';
import { PiCertificateFill } from 'react-icons/pi';
import { RiBookMarkFill } from 'react-icons/ri';
import {
  commonIconStyleDark,
  commonIconStyleLight,
  commonTextStyleDark,
  commonTextStyleLight,
  numberTextStyleDark,
  numberTextStyleLight,
} from '../config/styles';

type TProps = {
  imageUrl: string;
  subscribers: number;
  certificates: number;
  courses?: number;
  registeredAt: string;
};

export const ProfileInfo: FC<TProps> = ({
  registeredAt,
  certificates,
  subscribers,
  imageUrl,
  courses,
}) => {
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
            <Link
              href='/profile/view'
              color={currentPath === '/profile/view' ? 'gray' : '#9872EA'}
              fontSize='18'
              pointerEvents={currentPath === '/profile/view' ? 'none' : 'auto'}
              _hover={{
                color: currentPath === '/profile/view' ? 'gray' : '#9872EA',
                textDecoration: 'underline',
              }}>
              Профіль
            </Link>
            <Link
              href='/profile/certificate'
              color={
                currentPath === '/profile/certificate' ? 'gray.500' : '#9872EA'
              }
              fontSize='18'
              pointerEvents={
                currentPath === '/profile/certificate' ? 'none' : 'auto'
              }
              _hover={{
                color:
                  currentPath === '/profile/certificate'
                    ? 'gray.500'
                    : '#9872EA',
                textDecoration: 'underline',
              }}>
              Сертифікати
            </Link>
            <Link
              href='/profile/edit'
              color={currentPath === '/profile/edit' ? 'gray' : '#9872EA'}
              fontSize='18'
              pointerEvents={currentPath === '/profile/edit' ? 'none' : 'auto'}
              _hover={{
                color: currentPath === '/profile/edit' ? 'gray' : '#9872EA',
                textDecoration: 'underline',
              }}>
              Налаштування
            </Link>
          </HStack>
        )}
        <Flex
          direction={{ base: 'row', md: 'column' }}
          gap={{ base: '5', md: '0' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}>
          <Avatar
            boxSize={{ base: '130px', md: '150px' }}
            src={imageUrl}
            mb={{ base: '0', md: '25px' }}
            borderRadius='30px'
          />
          <Stack mb={{ base: '0', md: '25px' }}>
            <Flex alignItems='center'>
              <FaUsers {...commonIconStyles} />
              <Text {...commonStyles}>
                <Text
                  as='span'
                  {...numberStyles}>
                  {subscribers}
                </Text>{' '}
                підписників
              </Text>
            </Flex>
            <Flex alignItems='center'>
              <PiCertificateFill {...commonIconStyles} />
              <Text {...commonStyles}>
                <Text
                  as='span'
                  {...numberStyles}>
                  {certificates}
                </Text>{' '}
                сертифікатів
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
                курси
              </Text>
            </Flex>
          </Stack>
          {!isSmallScreen && (
            <Stack
              direction='column'
              alignItems='flex-start'>
              <Link
                href='/profile/view'
                color={currentPath === '/profile/view' ? 'gray' : '#9872EA'}
                fontSize='18'
                pointerEvents={
                  currentPath === '/profile/view' ? 'none' : 'auto'
                }
                _hover={{
                  color: currentPath === '/profile/view' ? 'gray' : '#9872EA',
                  textDecoration: 'underline',
                }}>
                Профіль
              </Link>
              <Link
                href='/profile/certificate'
                color={
                  currentPath === '/profile/certificate'
                    ? 'gray.500'
                    : '#9872EA'
                }
                fontSize='18'
                pointerEvents={
                  currentPath === '/profile/certificate' ? 'none' : 'auto'
                }
                _hover={{
                  color:
                    currentPath === '/profile/certificate'
                      ? 'gray.500'
                      : '#9872EA',
                  textDecoration: 'underline',
                }}>
                Сертифікати
              </Link>
              <Link
                href='/profile/edit'
                color={currentPath === '/profile/edit' ? 'gray' : '#9872EA'}
                fontSize='18'
                pointerEvents={
                  currentPath === '/profile/edit' ? 'none' : 'auto'
                }
                _hover={{
                  color: currentPath === '/profile/edit' ? 'gray' : '#9872EA',
                  textDecoration: 'underline',
                }}>
                Налаштування
              </Link>
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
