'use client';

import { FC, PropsWithChildren } from 'react';
import {
  Flex,
  Heading,
  Text,
  Box,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import { AdvantageCard } from '../../../components/auth/cards/AdvantageCard';
import logo from '../../../../public/logo.svg';
import { FaSearch, FaEdit } from 'react-icons/fa';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { TbWorld } from 'react-icons/tb';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import background from '../../../../public/background.svg';

const advCard = [
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

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const handleGetHelpClick = () => {
    window.location.href = 'mailto:suportppfkquiz@gmail.com';
  };

  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  //TO DO: ADD EFFECTS ON BACKGROUND IMAGE
  return (
    <Flex
      direction={isSmallScreen ? 'column' : 'row'}
      align='center'
      justify='center'
      width='100vw'
      height='100vh'
      bgImage="url('https://images.wallpaperscraft.ru/image/single/noutbuk_stol_rabochee_mesto_211869_1920x1080.jpg')"
      bgSize='cover'
      bgPosition='center'
      overflow='hidden'
      overflowY='auto'>
      <Stack
        align='center'
        maxHeight='100vh'>
        <Flex p='30px'>
          <Image
            width={50}
            height={50}
            src={logo}
            alt='Logo'
          />
          <Heading
            color='white'
            pl='3'>
            PolyWit
          </Heading>
        </Flex>
        <Flex
          direction={isSmallScreen ? 'column' : 'row'}
          alignItems={isSmallScreen ? 'flex-start' : 'center'}
          borderRadius='20'
          bg='white'
          mx='5px'>
          {!isSmallScreen && (
            <Box
              minH='full'
              p='30px'
              maxW='400'
              color='#1D2734'
              bg='#ECEFF3'
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
