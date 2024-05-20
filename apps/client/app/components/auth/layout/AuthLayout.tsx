'use client';

import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';

import logo from '../../../../public/logo.svg';
import { AdvantageCard } from '../../../components/auth/cards/AdvantageCard';

const advCard: {
  icon: JSX.Element;
  title: string;
  description: string;
}[] = [
  {
    icon: <FaSearch />,
    title: 'Різноманітність курсів',
    description:
      'Оберіть курси за вашим інтересом: від програмування до мистецтва.',
  },
  {
    icon: <FaEdit />,
    title: 'Інтерактивне навчання',
    description:
      'Освіта у нас - це захопливий процес завдяки інтерактивності та новітнім технологіям.',
  },
  {
    icon: <HiOutlineAcademicCap />,
    title: 'Кваліфіковані викладачі',
    description:
      'Вчіться від кваліфікованих викладачів, які діляться своїм досвідом та знанням.',
  },
  {
    icon: <TbWorld />,
    title: 'Гнучкість та доступність',
    description:
      'Отримайте гнучкий графік та доступ до матеріалів, навчаючись в будь-якому місці світу.',
  },
];

const advMaxWidth = 400;

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const handleGetHelpClick = () => {
    window.location.href = 'mailto:suportppfkquiz@gmail.com';
  };

  const [isSmallScreen] = useMediaQuery('(max-width: 1024px)');

  return (
    <Flex
      direction={isSmallScreen ? 'column' : 'row'}
      align='center'
      justify='center'
      width='100vw'
      height='100vh'
      pb='10px'
      px='10px'
      position='relative'
      overflow='hidden'
      overflowY='auto'>
      <Box
        position='absolute'
        top='0'
        left='0'
        width='100%'
        height='100%'
        bgImage="url('https://images.wallpaperscraft.ru/image/single/noutbuk_stol_rabochee_mesto_211869_1920x1080.jpg')"
        bgSize='cover'
        bgPosition='center'
        bgRepeat='no-repeat'
        filter='blur(5px) grayscale(50%)'
        zIndex='-1'
      />
      <Stack
        align='center'
        gap={0}
        maxHeight='100vh'>
        <Flex
          p='30px'
          alignItems={'center'}>
          <Image
            width={50}
            height={50}
            src={logo}
            alt='Logo'
          />
          <Heading
            fontWeight='bold'
            fontSize={26}
            color='white'
            pl='3'>
            PolyWit
          </Heading>
        </Flex>
        <Flex
          direction={isSmallScreen ? 'column' : 'row'}
          alignItems={isSmallScreen ? 'flex-start' : 'center'}
          bgGradient={
            isSmallScreen
              ? 'linear(to-r, white 0%, white 100%)'
              : `linear(to-r, #ECEFF3 ${advMaxWidth}px, white ${advMaxWidth}px, white 100%)`
          }
          borderRadius='20'>
          {!isSmallScreen && (
            <Box
              p='30px'
              maxW={advMaxWidth}
              color='#1D2734'
              borderLeftRadius='20'>
              <Text
                mb='50px'
                fontSize='22'
                fontWeight='bold'>
                Ласкаво просимо на PolyWit - ваш вірний партнер у світі освіти!
              </Text>
              {advCard.map((data) => (
                <AdvantageCard
                  key={data.title}
                  icon={data.icon}
                  title={data.title}
                  description={data.description}
                />
              ))}
              <Flex alignItems='center'>
                <Text
                  mr='3'
                  fontWeight='medium'
                  _hover={{ cursor: 'pointer' }}
                  onClick={handleGetHelpClick}>
                  Отримати допомогу
                </Text>
                <IoMdHelpCircleOutline
                  cursor='pointer'
                  onClick={handleGetHelpClick}
                  size='30px'
                />
              </Flex>
            </Box>
          )}
          {children}
        </Flex>
      </Stack>
    </Flex>
  );
};
