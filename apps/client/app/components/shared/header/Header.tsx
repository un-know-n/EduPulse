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
  List,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
import { signOut } from 'next-auth/react';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { IoIosAddCircleOutline, IoMdNotifications } from 'react-icons/io';
import { AiOutlineSmile } from 'react-icons/ai';
import { PiUserListDuotone } from 'react-icons/pi';
import { IoSearchOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { DefaultMenuLink } from './links/DefaultMenuLink';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { Routes } from '../../../config/routing/routes';
import { MdCheckCircle } from 'react-icons/md';
import { TUserRoles } from '../../course/@types/course';
import { GiGraduateCap } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

type TProps = {
  title: string;
};

const dashboardLinks = [
  { title: 'Профіль', link: Routes.ProfileView },
  { title: 'Досягнення', link: Routes.ProfileCertificate },
  { title: 'Налаштування', link: Routes.ProfileSettings },
  { title: 'Вийти', handler: () => signOut() },
];

const burgerMenuLinks: {
  title: string;
  href: string;
  icon: ReactElement;
  role: TUserRoles[];
}[] = [
  {
    title: 'Пошук курсів',
    href: '/course/search',
    icon: <IoSearchOutline />,
    role: ['student', 'teacher'],
  },
  {
    title: 'Створені курси',
    href: '/course/created',
    icon: <GiGraduateCap />,
    role: ['teacher'],
  },
  {
    title: 'Створити курс',
    href: '/course/create',
    icon: <IoIosAddCircleOutline />,
    role: ['teacher'],
  },
];

const authors = [
  'Добровольський Євгеній',
  'Мартинець Артем',
  'Брюханов Олександр',
];

export const Header: FC<PropsWithChildren<TProps>> = ({ title, children }) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const backgroundColor = useColorModeValue(...themeColors);

  const user = useTypedSelector((state) => state.user);

  return (
    <>
      <Modal
        blockScrollOnMount
        isOpen={isModalOpen}
        onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Платформу створили студенти ППФК 4 курсу, 45 групи, 121
            спеціальності &quot;Інженерія програмного забезпечення&quot;
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <List spacing={3}>
              {authors.map((author) => (
                <ListItem key={author}>
                  <ListIcon
                    as={MdCheckCircle}
                    color='green.500'
                  />
                  {author}
                </ListItem>
              ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
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
                      cursor='pointer'
                      src={
                        user?.image ??
                        'https://avatars.dicebear.com/api/male/username.svg'
                      }
                      onClick={() => router.push(Routes.ProfileView)}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Heading
                      size='md'
                      cursor='pointer'
                      onClick={() => router.push(Routes.ProfileView)}>
                      {user?.name}
                    </Heading>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem
                    as={Button}
                    onClick={onModalOpen}
                    _hover={{
                      textDecoration: 'none',
                      bg: backgroundColor,
                    }}>
                    Про авторів
                  </MenuItem>
                  <MenuDivider />
                  {dashboardLinks.map((item, i) => (
                    <MenuItem
                      as={Button}
                      key={item.title}
                      onClick={() =>
                        item?.handler ? item.handler() : router.push(item.link)
                      }
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
          <DrawerHeader>Меню</DrawerHeader>

          <DrawerBody>
            {burgerMenuLinks.map((link) =>
              link.role.includes((user.role as TUserRoles) ?? 'student') ? (
                <DefaultMenuLink
                  key={link.title}
                  href={link.href}
                  leftIcon={link.icon}
                  w={'full'}
                  my={2}>
                  {link.title}
                </DefaultMenuLink>
              ) : null,
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box>{children}</Box>
    </>
  );
};
