// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

export const themeColors: [string, string] = ['gray.100', 'gray.800'];

// 3. extend the theme
const theme = extendTheme({
  config,
});

export default theme;
