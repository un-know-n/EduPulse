'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './config/UI/theme';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HeaderMenuDrawerProvider } from './components/providers/HeaderMenuDrawerProvider';

export async function Providers(props: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider>
          <HeaderMenuDrawerProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {props?.children}
          </HeaderMenuDrawerProvider>
        </ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
