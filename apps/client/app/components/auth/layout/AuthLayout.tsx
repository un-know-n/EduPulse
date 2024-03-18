'use client';

import { FC, PropsWithChildren } from 'react';
import { Flex, Heading, Text, Box, Stack } from '@chakra-ui/react';
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

  //TO DO: ADD EFFECTS ON BACKGROUND IMAGE
  return (
    <Flex
      align='center'
      justify='center'
      width='100vw'
      height='100vh'
      bgImage="url('https://images.wallpaperscraft.ru/image/single/noutbuk_stol_rabochee_mesto_211869_1920x1080.jpg')"
      bgSize='cover'
      bgPosition='center'>
      <Stack
        align='center'
        spacing='30px'>
        <Flex>
          <Image
            width={50}
            height={50}
            src={logo}
            alt='Logo'
          />
          <Heading
            pl='3'
            color='white'>
            PolyWit
          </Heading>
        </Flex>
        <Flex
          alignItems='center'
          borderRadius='20'
          bg='white'>
          <Box
            p='30px'
            maxW={400}
            bg='#ECEFF3'
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
          {children}
        </Flex>
      </Stack>
    </Flex>
  );
};
