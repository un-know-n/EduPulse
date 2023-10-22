'use client';

import { FC } from 'react';
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
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { PiUserListDuotone } from 'react-icons/pi';
import { Link } from '@chakra-ui/next-js';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoMdNotifications } from 'react-icons/io';

type TProps = {
  link: string;
};

const dashboardLinks = [
  { title: 'Achievements', link: '#' },
  { title: 'Account Settings', link: '#' },
  { title: 'Logout', link: '#' },
];

export const DefaultDashboard: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <>
      <Box
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
            <Heading fontSize={24}>Dashboard</Heading>
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
                  <PopoverHeader>Confirmation!</PopoverHeader>
                  <PopoverBody>
                    Are you sure you want to have that milkshake?
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
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {dashboardLinks.map((item, i) => (
                    <MenuItem
                      as={Link}
                      key={item.title}
                      href={item.link}
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
          <DrawerHeader>Search for courses</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
