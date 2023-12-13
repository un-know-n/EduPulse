'use client';

import { FC, PropsWithChildren } from 'react';
import { Container, Flex, Heading, Text, Box } from '@chakra-ui/react';
import Image from 'next/image';
import { AdvantageCard} from '../../../components/auth/cards/AdvantageCard';
import logo from '../../../../public/logo.svg';
import { FaSearch, FaEdit } from 'react-icons/fa';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { TbWorld } from 'react-icons/tb';
import { IoMdHelpCircleOutline } from 'react-icons/io';

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

  return (
    <Flex
      w='full'
      h='100vh'>
      <Flex
        w='full'
        h='full'
        flexDirection='column'
        justifyContent='space-between'
        bgGradient='linear(to-r, #040213, #161135)'
        p='50'>
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
            EduPulse
          </Heading>
        </Flex>
        <Container
          color='white'
          w='full'
          maxW='550px'
          m={0}
          p={0}>
            <Text 
              fontSize='30px'
              fontWeight='medium'
              color='white'
              mb='50px'
              mt='50px'>
              Удар у серце освітньої досконалості
            </Text>
            <Text 
              fontSize='24px'
              fontWeight='regular'
              color='white'
              mb='50px'>
              Ласкаво просимо на EduPulse - ваш вірний партнер у світі освіти!
            </Text>
            {advCard.map((data) => (
              <AdvantageCard
                key={data.title}
                icon={data.icon}
                title={data.title}
                description={data.description}
              />
            ))}
        </Container>
        <Box
          display='flex'
          color='white'
          alignItems='center'
          fontSize='20px'
          fontWeight='bold'
          mr='3'
          _hover={{ cursor: 'pointer' }}
          onClick={handleGetHelpClick}>
          <Text 
            fontSize='20px'
            fontWeight='bold'
            mr='3'>
            Отримати допомогу
          </Text>
          <IoMdHelpCircleOutline 
            size='30px' />
        </Box>
      </Flex>
      <Flex
        color='black'
        bg='#221C4C'
        w='full'
        h='full'>
        {children}
      </Flex>
    </Flex>
  );
};
