'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Routes } from './config/routing/routes';
import { PiSmileyNervousDuotone } from 'react-icons/pi';

export default function NotFound() {
  return (
    <main className='grid min-h-full place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8'>
      <Box className='text-center'>
        <Text className='text-base font-semibold text-indigo-600'>404</Text>
        <Flex
          justifyContent='center'
          alignItems='center'
          gap={5}
          className='mt-4'>
          <Heading className='text-3xl font-bold tracking-tight sm:text-5xl'>
            Сторінку не знайдено
          </Heading>
          <PiSmileyNervousDuotone className='text-3xl font-bold sm:text-5xl' />
        </Flex>

        <Text className='mt-6 text-base leading-7 '>
          Нам не вдалося знайти сторінку, яку ви шукаєте{' '}
        </Text>
        <Flex className='mt-10 flex items-center justify-center gap-x-6'>
          <a
            href={Routes.Dashboard}
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            На головну
          </a>
          <a
            href='/'
            className='text-sm font-semibold '>
            <Text>
              Служба підтримки <span aria-hidden='true'>&rarr;</span>
            </Text>
          </a>
        </Flex>
      </Box>
    </main>
  );
}
