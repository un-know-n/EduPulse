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
  Tooltip,
  useConst,
  IconButton,
} from '@chakra-ui/react';
import { themeColors } from '../../../config/UI/theme';
import { signOut } from 'next-auth/react';
import { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
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
import { MdCheckCircle, MdLibraryBooks } from 'react-icons/md';
import { TUserRoles } from '../../course/@types/course';
import { GiGraduateCap } from 'react-icons/gi';
import { useRouter } from 'next/navigation';
import { useHeaderMenuDrawer } from '../../providers/HeaderMenuDrawerProvider';

type TProps = {
  title: string;
  additionalDrawerContent?: ReactNode | undefined;
  additionalDrawerFooterContent?: ReactNode | undefined;
  drawerTitle?: string;
};

const dashboardLinks = [
  { title: 'Профіль', link: Routes.ProfileView },
  // { title: 'Сертифікати', link: Routes.ProfileCertificate },
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
    href: `${Routes.SearchCourse}`,
    icon: <IoSearchOutline />,
    role: ['student', 'teacher'],
  },
  {
    title: 'Мої курси',
    href: `${Routes.Dashboard}`,
    icon: <MdLibraryBooks />,
    role: ['student', 'teacher'],
  },
  {
    title: 'Створити курс',
    href: `${Routes.CreateCourse}`,
    icon: <IoIosAddCircleOutline />,
    role: ['teacher'],
  },
];

const authors = ['Добровольський Євгеній', 'Мартинець Артем'];

export const Header: FC<PropsWithChildren<TProps>> = ({
  title,
  children,
  additionalDrawerContent,
  additionalDrawerFooterContent,
  drawerTitle,
}) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useHeaderMenuDrawer();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const backgroundColor = useColorModeValue(...themeColors);

  const user = useTypedSelector((state) => state.user);
  const headerHeight = useConst(64); //height in px;

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
          h={`${headerHeight}px`}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Flex
            gap={3}
            alignItems='center'>
            <IconButton
              onClick={onOpen}
              aria-label='Open menu'
              icon={<HiMenuAlt1 size={'20px'} />}
            />
            <Heading
              noOfLines={2}
              maxWidth='fit-content'
              fontSize={{ base: 14, md: 24 }}>
              {title}
            </Heading>
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
                      src={user?.image ?? ''}
                      onClick={() => router.push(Routes.ProfileView)}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Tooltip
                      label={user?.name}
                      placement='left-end'>
                      <Heading
                        size='md'
                        cursor='pointer'
                        onClick={() => router.push(Routes.ProfileView)}>
                        {user?.name.length > 15
                          ? `${user?.name.substring(0, 15)}...`
                          : user?.name}
                      </Heading>
                    </Tooltip>
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
          <DrawerHeader>{drawerTitle ?? 'Меню'}</DrawerHeader>

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
            <Box>{additionalDrawerContent}</Box>
          </DrawerBody>

          <DrawerFooter>
            <Box>{additionalDrawerFooterContent}</Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box minH={`calc(100vh - ${headerHeight}px)`}>{children}</Box>
    </>
  );
};
