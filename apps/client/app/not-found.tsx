'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Routes } from './config/routing/routes';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className='grid min-h-full place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8'>
      <Box className='text-center'>
        <Text className='text-base font-semibold text-indigo-600'>404</Text>
        <Heading className='mt-4 text-3xl font-bold tracking-tight  sm:text-5xl'>
          Page not found
        </Heading>
        <Text className='mt-6 text-base leading-7 '>
          Sorry, we couldn’t find the page you’re looking for.
        </Text>
        <Flex className='mt-10 flex items-center justify-center gap-x-6'>
          <a
            href={Routes.Dashboard}
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Go to dashboard
          </a>
          <a
            href='/'
            className='text-sm font-semibold '>
            <Text>
              Contact support <span aria-hidden='true'>&rarr;</span>
            </Text>
          </a>
        </Flex>
      </Box>
    </main>
  );
}
