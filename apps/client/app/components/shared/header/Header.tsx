import { redirect } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { themeColors } from '../../../config/UI/theme';
import { signOut, useSession } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { IoMdNotifications } from 'react-icons/io';
import { AiOutlineSmile } from 'react-icons/ai';
import { PiUserListDuotone } from 'react-icons/pi';

type TProps = {
  title: string;
};

const dashboardLinks = [
  { title: 'Досягнення', handler: () => redirect('/') },
  { title: 'Налаштування', handler: () => redirect('/') },
  { title: 'Вийти', handler: () => signOut() },
];

export const Header: FC<PropsWithChildren<TProps>> = ({ title, children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backgroundColor = useColorModeValue(...themeColors);

  const { data: session } = useSession();

  return (
    <>
      <Box
        w='full'
        position='sticky'
        top={0}
        zIndex={50}
        bg={backgroundColor}
        px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Flex
            gap={3}
            alignItems='center'>
            <Button onClick={onOpen}>
              <HiMenuAlt1 />
            </Button>
            <Heading fontSize={24}>{title}</Heading>
          </Flex>

          <Flex alignItems={'center'}>
            <Stack
              direction={'row'}
              spacing={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? (
                  <BsFillMoonStarsFill />
                ) : (
                  <BsFillSunFill />
                )}
              </Button>

              <Popover>
                <PopoverTrigger>
                  <Button>
                    <IoMdNotifications />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Сповіщення</PopoverHeader>
                  <PopoverBody>
                    <Flex
                      alignItems='center'
                      gap={2}>
                      <Text>У вас ще немає сповіщень {'  '}</Text>
                      <AiOutlineSmile />
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Menu>
                <MenuButton as={Button}>
                  <PiUserListDuotone />
                </MenuButton>
                <MenuList>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={
                        session?.user?.image ??
                        'https://avatars.dicebear.com/api/male/username.svg'
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{session?.user?.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {dashboardLinks.map((item, i) => (
                    <MenuItem
                      as={Button}
                      key={item.title}
                      onClick={item.handler}
                      _hover={{
                        textDecoration: 'none',
                        bg: backgroundColor,
                      }}>
                      {item.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Drawer
        placement='left'
        onClose={onClose}
        isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Пошук курсів</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Введіть назву курса...' />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box>{children}</Box>
    </>
  );
};
