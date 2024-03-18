import React, { FC } from 'react';
import {
  Center,
  Flex,
  Avatar,
  Box,
  Text,
  Divider,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  useColorMode,
  Link,
  Stack,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { ProfileLayout } from '../layout/ProfileLayout';
import {
  textStyleDark,
  textStyleLight,
  headerTextStyleDark,
  headerTextStyleLight,
  titlesTextStyleDark,
  titlesTextStyleLight,
} from '../config/styles';

export const ProfileEdit: FC = () => {
  const user = useTypedSelector((state) => state.user);

  const { colorMode } = useColorMode();
  const headerStyles =
    colorMode === 'light' ? headerTextStyleLight : headerTextStyleDark;
  const titleStyles =
    colorMode === 'light' ? titlesTextStyleLight : titlesTextStyleDark;
  const textStyles = colorMode === 'light' ? textStyleLight : textStyleDark;

  return (
    <ProfileLayout hasProfileInfo={false}>
      <Box w={'full'}>
        <Text {...headerStyles}>Редагування профілю</Text>
        <Divider mb='20px' />
        <Stack
          spacing='20px'
          mb='20px'>
          <FormControl
            isRequired
            display='flex'>
            <FormLabel {...titleStyles}>Ваше ім'я</FormLabel>
            <Flex display='column'>
              <Input placeholder={user.name || 'User'} />
              <FormHelperText {...textStyles}>
                Ваше офіційне ім'я використовується в сертифікатах!
              </FormHelperText>
            </Flex>
          </FormControl>

          <FormControl display='flex'>
            <FormLabel {...titleStyles}>Про себе</FormLabel>
            <Textarea />
          </FormControl>

          <FormControl display='flex'>
            <FormLabel {...titleStyles}>Аватарка</FormLabel>
            <Avatar
              boxSize='150px'
              src={user.image || ''}
              borderRadius='30px'
              mr='20px'
            />
            <Stack
              direction='column'
              justifyContent='center'
              spacing='40px'>
              <Link color='#9872EA'>Завантажити</Link>
              <Link color='#9872EA'>Видалити</Link>
            </Stack>
          </FormControl>
        </Stack>
        <Button
          bg='purple.600'
          color='white'
          _hover={{
            bg: 'purple.800',
            transitionDuration: '.4s',
          }}
          type='submit'
          variant='outline'>
          Зберегти зміни
        </Button>
      </Box>
    </ProfileLayout>
  );
};
